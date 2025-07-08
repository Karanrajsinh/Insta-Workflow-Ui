'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { WorkflowPost } from '@/types/workflow';
import { mockPosts } from '@/lib/mockData';

interface PostSelectionProps {
  selectedPost: WorkflowPost | null;
  onPostSelect: (post: WorkflowPost) => void;
  isActive: boolean;
  onComplete: () => void;
}

export function PostSelection({ selectedPost, onPostSelect, isActive, onComplete }: PostSelectionProps) {
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [postType, setPostType] = useState<'specific' | 'any' | 'next'>('specific');

  const displayedPosts = showAllPosts ? mockPosts : mockPosts.slice(0, 4);

  const handlePostTypeChange = (type: 'specific' | 'any' | 'next') => {
    setPostType(type);
    
    if (type === 'specific') {
      // Keep current selection or clear it
      if (selectedPost?.type !== 'specific') {
        onPostSelect(null as any);
      }
    } else {
      const post: WorkflowPost = {
        id: type,
        type: type,
        isPro: type !== 'specific'
      };
      onPostSelect(post);
      onComplete();
    }
  };

  const handleSpecificPostSelect = (post: any) => {
    const workflowPost: WorkflowPost = {
      id: post.id,
      type: 'specific',
      image: post.image,
      caption: post.caption,
      username: post.username
    };
    onPostSelect(workflowPost);
    onComplete();
  };

  return (
    <Card className={`${isActive ? 'ring-2 ring-blue-500' : ''}`}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>When someone comments on</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={postType} onValueChange={handlePostTypeChange}>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="specific" id="specific" />
              <Label htmlFor="specific">a specific post or reel</Label>
            </div>
            
            {postType === 'specific' && (
              <div className="ml-6 space-y-4">
                <div className="grid grid-cols-4 gap-2">
                  {displayedPosts.map((post) => (
                    <button
                      key={post.id}
                      onClick={() => handleSpecificPostSelect(post)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedPost?.id === post.id
                          ? 'border-blue-500 ring-2 ring-blue-200'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={post.image}
                        alt={post.caption}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
                
                <Button
                  variant="ghost"
                  onClick={() => setShowAllPosts(!showAllPosts)}
                  className="w-full"
                >
                  {showAllPosts ? (
                    <>
                      <ChevronUp className="w-4 h-4 mr-2" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-2" />
                      Show All
                    </>
                  )}
                </Button>
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="any" id="any" />
              <Label htmlFor="any" className="flex items-center space-x-2">
                <span>any post or reel</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">PRO</Badge>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="next" id="next" />
              <Label htmlFor="next" className="flex items-center space-x-2">
                <span>next post or reel</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">PRO</Badge>
              </Label>
            </div>
          </div>
        </RadioGroup>

        {selectedPost && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Selected:</span>
              <span className="font-medium">
                {selectedPost.type === 'specific' 
                  ? `Post by ${selectedPost.username}`
                  : selectedPost.type === 'any' 
                  ? 'Any post or reel' 
                  : 'Next post or reel'
                }
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}