'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { CommentConfig } from '@/types/workflow';

interface CommentConfigurationProps {
  config: CommentConfig;
  onConfigChange: (config: CommentConfig) => void;
  isActive: boolean;
  onComplete: () => void;
}

export function CommentConfiguration({ config, onConfigChange, isActive, onComplete }: CommentConfigurationProps) {
  const handleTypeChange = (type: 'specific' | 'any') => {
    const newConfig = { ...config, type };
    onConfigChange(newConfig);
    
    if (type === 'any') {
      onComplete();
    }
  };

  const handleKeywordInputChange = (value: string) => {
    onConfigChange({ ...config, keywordInput: value });
  };

  const handleKeywordAdd = (keyword: string) => {
    if (keyword && !config.keywords.includes(keyword)) {
      const newKeywords = [...config.keywords, keyword];
      const newConfig = {
        ...config,
        keywords: newKeywords,
        keywordInput: '',
        isValid: newKeywords.length > 0
      };
      onConfigChange(newConfig);
      
      if (newKeywords.length > 0) {
        onComplete();
      }
    }
  };

  const handleKeywordRemove = (keyword: string) => {
    const newKeywords = config.keywords.filter(k => k !== keyword);
    const newConfig = {
      ...config,
      keywords: newKeywords,
      isValid: newKeywords.length > 0 || config.type === 'any'
    };
    onConfigChange(newConfig);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleKeywordAdd(config.keywordInput.trim());
    }
  };

  useEffect(() => {
    const isValid = config.type === 'any' || config.keywords.length > 0;
    if (isValid !== config.isValid) {
      onConfigChange({ ...config, isValid });
    }
  }, [config.type, config.keywords.length]);

  return (
    <Card className={`${isActive ? 'ring-2 ring-blue-500' : ''}`}>
      <CardHeader>
        <CardTitle>And this comment has</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={config.type} onValueChange={handleTypeChange}>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="specific" id="specific-words" />
              <Label htmlFor="specific-words">a specific word or words</Label>
            </div>
            
            {config.type === 'specific' && (
              <div className="ml-6 space-y-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Enter a word or multiple"
                    value={config.keywordInput}
                    onChange={(e) => handleKeywordInputChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="max-w-sm"
                  />
                  <p className="text-sm text-gray-500">Use commas to separate words</p>
                </div>
                
                {config.keywordInput && (
                  <Button
                    size="sm"
                    onClick={() => handleKeywordAdd(config.keywordInput.trim())}
                    className="ml-0"
                  >
                    Add Keyword
                  </Button>
                )}
                
                {config.keywords.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {config.keywords.map((keyword) => (
                        <Badge key={keyword} variant="secondary" className="flex items-center space-x-1">
                          <span>{keyword}</span>
                          <button
                            onClick={() => handleKeywordRemove(keyword)}
                            className="ml-1 hover:text-red-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">For example:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Price', 'Link', 'Shop'].map((example) => (
                      <Badge 
                        key={example} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleKeywordAdd(example)}
                      >
                        {example}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="any" id="any-word" />
              <Label htmlFor="any-word">any word</Label>
            </div>
          </div>
        </RadioGroup>

        {config.isValid && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Trigger:</span>
              <span className="font-medium">
                {config.type === 'any' 
                  ? 'Any comment' 
                  : config.keywords.length > 0 
                  ? `Comments containing: ${config.keywords.join(', ')}`
                  : 'No keywords set'
                }
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}