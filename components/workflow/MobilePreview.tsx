'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Send as SendIcon, Bookmark, Phone, Video, MoreHorizontal, ChevronLeft, Home, Search, Plus, Film, User, Camera, Mic } from 'lucide-react';
import { WorkflowPost, CommentConfig, DMConfig } from '@/types/workflow';

interface MobilePreviewProps {
  selectedPost: WorkflowPost | null;
  commentConfig: CommentConfig;
  dmConfig: DMConfig;
  previewMode: 'post' | 'comments' | 'dm';
  onPreviewModeChange: (mode: 'post' | 'comments' | 'dm') => void;
  currentStep: number;
}

export function MobilePreview({ 
  selectedPost, 
  commentConfig, 
  dmConfig, 
  previewMode, 
  onPreviewModeChange,
  currentStep 
}: MobilePreviewProps) {
  
  const renderPostView = () => {
    const post = selectedPost?.type === 'specific' ? selectedPost : {
      username: 'botspacehq',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
      caption: 'WhatsApp now connects 3 billion users, a milestone reflecting its influence in messaging. Thanks to Meta\'s strides in AI and business tools, WhatsApp not only enhances personal communication but also empowers businesses with robust AI features. Looking to ride this wave? BotSpace, a Meta Business Partner, helps your business shine on WhatsApp'
    };

    return (
      <div className="bg-black text-white h-full flex flex-col relative">
        {/* Instagram Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-black">
          <div className="flex items-center space-x-3">
            <ChevronLeft className="w-6 h-6 text-white" />
            <span className="text-white font-medium text-base tracking-tight">BOTSPACEHQ</span>
          </div>
          <span className="text-white font-medium text-base tracking-tight">Posts</span>
        </div>
        
        {/* Profile Section */}
        <div className="flex items-center px-4 py-3 bg-black">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
            <span className="text-sm font-bold text-white">B</span>
          </div>
          <span className="text-white font-medium text-sm">{post.username}</span>
        </div>
        
        {/* Post Image */}
        <div className="relative">
          <img 
            src={post.image} 
            alt="Post" 
            className="w-full h-80 object-cover"
          />
        </div>
        
        {/* Post Actions */}
        <div className="px-4 py-3 bg-black">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4">
              <Heart className="w-6 h-6 text-white" />
              <MessageCircle className="w-6 h-6 text-white" />
              <SendIcon className="w-6 h-6 text-white" />
            </div>
            <Bookmark className="w-6 h-6 text-white" />
          </div>
          
          <div className="text-sm text-white mb-2">
            <span className="font-medium">18 likes</span>
          </div>
          
          <div className="text-sm text-white mb-3">
            <span className="font-medium">{post.username}</span>{' '}
            <span className="text-white">{post.caption}</span>
          </div>
          
          <div className="text-sm text-gray-400 mb-4">
            View all 8 comments
          </div>
        </div>
        
        {/* Bottom Navigation - Instagram Style */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around py-4 bg-black border-t border-gray-800 z-10">
          <Home className="w-6 h-6 text-white" />
          <Search className="w-6 h-6 text-gray-400" />
          <div className="w-6 h-6 border-2 border-gray-400 rounded-md flex items-center justify-center">
            <Plus className="w-6 h-6 text-gray-400" />
          </div>
          {/* Reel Icon using image */}
          <img 
            src="https://imgs.search.brave.com/mqwa9QXPCtdRq1JkBlImIdQIHBwQC4YeM8tCgDxRFxY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91eHdp/bmcuY29tL3dwLWNv/bnRlbnQvdGhlbWVz/L3V4d2luZy9kb3du/bG9hZC9icmFuZHMt/YW5kLXNvY2lhbC1t/ZWRpYS9pbnN0YWdy/YW0tcmVlbHMtd2hp/dGUtaWNvbi5wbmc" 
            alt="Reels" 
            className="w-6 h-6"
          />
          <User className="w-6 h-6 text-gray-400" />
        </div>
      </div>
    );
  };

  const renderCommentsView = () => {
    const post = selectedPost?.type === 'specific' ? selectedPost : {
      username: 'botspacehq',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
      caption: 'WhatsApp now connects 3 billion users...'
    };

    return (
      <div className="text-white h-full flex flex-col relative" style={{ backgroundColor: '#1a1a1b' }}>
        {/* Background Post with Gray Overlay */}
        <div className="absolute inset-0">
          {/* Instagram Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-black">
            <div className="flex items-center space-x-3">
              <ChevronLeft className="w-6 h-6 text-white" />
              <span className="text-white font-medium text-base tracking-tight">BOTSPACEHQ</span>
            </div>
            <span className="text-white font-medium text-base tracking-tight">Posts</span>
          </div>
          
          {/* Profile Section */}
          <div className="flex items-center px-4 py-3 bg-black">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-sm font-bold text-white">B</span>
            </div>
            <span className="text-white font-medium text-sm">{post.username}</span>
          </div>
          
          {/* Post Image */}
          <div className="relative">
            <img 
              src={post.image} 
              alt="Post" 
              className="w-full h-80 object-cover"
            />
          </div>
          
          {/* Gray Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        {/* Comments Overlay Widget - Exact Instagram Style */}
        <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl flex flex-col" style={{ height: '65%', backgroundColor: '#1a1a1b' }}>
          {/* Handle Bar */}
          <div className="flex justify-center py-3">
            <div className="w-10 h-1 bg-gray-500 rounded-full"></div>
          </div>
          
          {/* Comments Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: '#333' }}>
            <span className="text-white font-semibold text-lg">Comments</span>
            <SendIcon className="w-5 h-5 text-white" />
          </div>
          
          {/* Comments List */}
          <div className="flex-1 px-4 py-2 overflow-y-auto">
            {/* User Comment */}
            <div className="flex items-start py-3">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-sm font-bold text-white">U</span>
              </div>
              <div className="flex-1">
                <div className="flex items-baseline space-x-2 mb-1">
                  <span className="text-white font-medium text-sm">Username</span>
                  <span className="text-gray-400 text-xs">Now</span>
                </div>
                <div className="text-white text-sm">
                  {commentConfig.keywords[0] || 'Price'}
                </div>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-gray-400 text-xs font-medium">Reply</span>
                  <Heart className="w-3 h-3 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Comment Input - At Bottom */}
          <div className="px-4 py-4 border-t" style={{ borderColor: '#333' }}>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-lg">😊</span>
              </div>
              <div className="flex-1 bg-transparent border border-gray-600 rounded-full px-4 py-2">
                <span className="text-gray-400 text-sm">Add a comment for username...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDMView = () => {
    const post = selectedPost?.type === 'specific' ? selectedPost : {
      username: 'botspacehq'
    };

    return (
      <div className="bg-black text-white h-full flex flex-col">
        {/* DM Header - Exact Instagram Style */}
        <div className="flex items-center justify-between px-4 py-3 bg-black border-b" style={{ borderColor: '#333' }}>
          <div className="flex items-center space-x-3">
            <ChevronLeft className="w-6 h-6 text-white" />
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-white">B</span>
            </div>
            <span className="text-white font-medium text-base">{post.username}</span>
          </div>
          <div className="flex items-center space-x-4">
            <Phone className="w-5 h-5 text-white" />
            <Video className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 px-4 py-4 space-y-3 overflow-y-auto bg-black">
          {dmConfig.hasOpeningDM && dmConfig.openingMessage && (
            <div className="flex justify-end mb-3">
              <div className="text-white px-4 py-3 rounded-3xl rounded-br-lg max-w-xs" style={{ backgroundColor: '#212120' }}>
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                  {dmConfig.openingMessage}
                </div>
              </div>
            </div>
          )}
          
          {dmConfig.hasOpeningDM && dmConfig.linkButtonText && (
            <div className="flex justify-end mb-3">
              <div className="text-white px-6 py-3 rounded-full border" style={{ backgroundColor: '#5b3fd8', borderColor: '#333' }}>
                <div className="text-sm font-medium">
                  {dmConfig.linkButtonText}
                </div>
              </div>
            </div>
          )}
          
          {dmConfig.hasOpeningDM && dmConfig.linkMessage && (
            <div className="flex justify-start mb-3">
              <div className="text-white px-6 py-3 rounded-full" style={{ backgroundColor: '#212120' }}>
                <div className="text-sm font-medium">
                  {dmConfig.linkMessage}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Message Input - At Bottom with Thin Border */}
        <div className="px-4 py-4 bg-black border-t" style={{ borderColor: '#333' }}>
          <div className="flex items-center space-x-3">
            <div className="flex-1 rounded-full px-4 py-3 flex items-center space-x-3 border" style={{ backgroundColor: '#1a1a1b', borderColor: '#333' }}>
              <span className="text-blue-400 text-lg">😊</span>
              <span className="text-gray-400 text-sm flex-1">Message...</span>
              <div className="flex items-center space-x-3">
                <Camera className="w-5 h-5 text-gray-400" />
                <Mic className="w-5 h-5 text-gray-400" />
                <Plus className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMobileContent = () => {
    switch (previewMode) {
      case 'post':
        return renderPostView();
      case 'comments':
        return renderCommentsView();
      case 'dm':
        return renderDMView();
      default:
        return renderPostView();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Mobile Preview</CardTitle>
          <div className="flex space-x-2">
            <Button
              variant={previewMode === 'post' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPreviewModeChange('post')}
              disabled={currentStep < 1}
            >
              Post
            </Button>
            <Button
              variant={previewMode === 'comments' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPreviewModeChange('comments')}
              disabled={currentStep < 2}
            >
              Comments
            </Button>
            <Button
              variant={previewMode === 'dm' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPreviewModeChange('dm')}
              disabled={currentStep < 3}
            >
              DM
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 pb-6">
        {/* iPhone Frame with actual mobile dimensions */}
        <div className="mx-auto" style={{ width: '375px', height: '812px' }}>
          <div className="bg-black rounded-[3rem] p-2 h-full">
            <div className="bg-black rounded-[2.5rem] overflow-hidden h-full flex flex-col">
              {/* Status Bar */}
              <div className="flex items-center justify-between px-6 py-2 text-white text-sm bg-black">
                <span className="font-semibold">1:37</span>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                  <div className="flex items-center">
                    <div className="w-6 h-3 border border-white rounded-sm mr-1">
                      <div className="w-full h-full bg-white rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 overflow-hidden">
                {renderMobileContent()}
              </div>
              
              {/* Home Indicator - Part of Mobile Screen (Not Instagram UI) */}
              <div className="flex items-center justify-center py-2 bg-black">
                <div className="w-32 h-1 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}