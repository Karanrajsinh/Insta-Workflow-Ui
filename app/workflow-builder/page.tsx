'use client';

import { useState } from 'react';
import { WorkflowHeader } from '@/components/workflow/WorkflowHeader';
import { PostSelection } from '@/components/workflow/PostSelection';
import { CommentConfiguration } from '@/components/workflow/CommentConfiguration';
import { DMResponse } from '@/components/workflow/DMResponse';
import { MobilePreview } from '@/components/workflow/MobilePreview';
import { useWorkflowState } from '@/hooks/useWorkflowState';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function WorkflowBuilder() {
  const {
    currentStep,
    setCurrentStep,
    selectedPost,
    setSelectedPost,
    commentConfig,
    setCommentConfig,
    dmConfig,
    setDmConfig,
    isWorkflowActive,
    setIsWorkflowActive
  } = useWorkflowState();

  const [previewMode, setPreviewMode] = useState<'post' | 'comments' | 'dm'>('post');

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      // Update preview mode to match current step
      if (currentStep === 1) setPreviewMode('comments');
      if (currentStep === 2) setPreviewMode('dm');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Update preview mode to match current step
      if (currentStep === 2) setPreviewMode('post');
      if (currentStep === 3) setPreviewMode('comments');
    }
  };

  const handlePreviewModeChange = (mode: 'post' | 'comments' | 'dm') => {
    setPreviewMode(mode);
    // Update current step to match preview mode
    if (mode === 'post') setCurrentStep(1);
    if (mode === 'comments') setCurrentStep(2);
    if (mode === 'dm') setCurrentStep(3);
  };

  const handleGoLive = () => {
    setIsWorkflowActive(true);
    console.log('Workflow activated:', {
      selectedPost,
      commentConfig,
      dmConfig
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedPost !== null;
      case 2:
        return commentConfig.isValid;
      case 3:
        return dmConfig.isValid;
      default:
        return false;
    }
  };

  const canGoLive = !!(selectedPost && commentConfig.isValid && dmConfig.isValid);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PostSelection
            selectedPost={selectedPost}
            onPostSelect={setSelectedPost}
            isActive={true}
            onComplete={() => {}}
          />
        );
      case 2:
        return (
          <CommentConfiguration
            config={commentConfig}
            onConfigChange={setCommentConfig}
            isActive={true}
            onComplete={() => {}}
          />
        );
      case 3:
        return (
          <DMResponse
            config={dmConfig}
            onConfigChange={setDmConfig}
            isActive={true}
            onComplete={() => {}}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <WorkflowHeader 
        onGoLive={handleGoLive}
        canGoLive={canGoLive}
        isActive={isWorkflowActive}
        currentStep={currentStep}
        totalSteps={3}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Panel - Current Step Configuration */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Step {currentStep} of 3
              </h2>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`w-3 h-3 rounded-full ${
                        step <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {renderCurrentStep()}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>

              {currentStep < 3 ? (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleGoLive}
                  disabled={!canGoLive || isWorkflowActive}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isWorkflowActive ? 'Live' : 'Go Live'}
                </Button>
              )}
            </div>
          </div>

          {/* Right Panel - Mobile Preview */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <MobilePreview
              selectedPost={selectedPost}
              commentConfig={commentConfig}
              dmConfig={dmConfig}
              previewMode={previewMode}
              onPreviewModeChange={handlePreviewModeChange}
              currentStep={currentStep}
            />
          </div>
        </div>
      </div>
    </div>
  );
}