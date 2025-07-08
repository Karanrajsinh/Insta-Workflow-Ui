export interface WorkflowPost {
  id: string;
  type: 'specific' | 'any' | 'next';
  image?: string;
  caption?: string;
  username?: string;
  isPro?: boolean;
}

export interface CommentConfig {
  type: 'specific' | 'any';
  keywords: string[];
  keywordInput: string;
  isValid: boolean;
}

export interface DMConfig {
  hasOpeningDM: boolean;
  openingMessage: string;
  linkButtonText: string;
  linkMessage: string;
  isValid: boolean;
}

export interface WorkflowState {
  currentStep: number;
  selectedPost: WorkflowPost | null;
  commentConfig: CommentConfig;
  dmConfig: DMConfig;
  isWorkflowActive: boolean;
}