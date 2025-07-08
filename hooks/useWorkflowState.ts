'use client';

import { useState } from 'react';
import { WorkflowPost, CommentConfig, DMConfig } from '@/types/workflow';

export function useWorkflowState() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPost, setSelectedPost] = useState<WorkflowPost | null>(null);
  const [commentConfig, setCommentConfig] = useState<CommentConfig>({
    type: 'specific',
    keywords: [],
    keywordInput: '',
    isValid: false
  });
  const [dmConfig, setDmConfig] = useState<DMConfig>({
    hasOpeningDM: true,
    openingMessage: "Hey there! I'm so happy you're here, thanks so much for your interest 😊\n\nClick below and I'll send you the link in just a sec ✨",
    linkButtonText: 'Send Me Link',
    linkMessage: 'Hey',
    isValid: false
  });
  const [isWorkflowActive, setIsWorkflowActive] = useState(false);

  return {
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
  };
}