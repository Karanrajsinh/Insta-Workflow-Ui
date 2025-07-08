'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Settings, Zap } from 'lucide-react';

interface WorkflowHeaderProps {
  onGoLive: () => void;
  canGoLive: boolean;
  isActive: boolean;
  currentStep: number;
  totalSteps: number;
}

export function WorkflowHeader({ onGoLive, canGoLive, isActive, currentStep, totalSteps }: WorkflowHeaderProps) {
  const stepNames = ['Post Selection', 'Comment Setup', 'DM Response'];

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Workflow Builder</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              {stepNames[currentStep - 1]} ({currentStep}/{totalSteps})
            </span>
            {isActive && (
              <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                <Zap className="w-3 h-3 mr-1" />
                Live
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          
          <Button 
            onClick={onGoLive}
            disabled={!canGoLive || isActive}
            className="bg-black hover:bg-gray-800"
          >
            {isActive ? 'Live' : 'Go Live'}
          </Button>
        </div>
      </div>
    </header>
  );
}