'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, HelpCircle } from 'lucide-react';
import { DMConfig } from '@/types/workflow';

interface DMResponseProps {
  config: DMConfig;
  onConfigChange: (config: DMConfig) => void;
  isActive: boolean;
  onComplete: () => void;
}

export function DMResponse({ config, onConfigChange, isActive, onComplete }: DMResponseProps) {
  const handleOpeningDMToggle = (hasOpeningDM: boolean) => {
    const newConfig = { ...config, hasOpeningDM };
    onConfigChange(newConfig);
  };

  const handleOpeningMessageChange = (openingMessage: string) => {
    const newConfig = { ...config, openingMessage };
    onConfigChange(newConfig);
  };

  const handleLinkButtonTextChange = (linkButtonText: string) => {
    const newConfig = { ...config, linkButtonText };
    onConfigChange(newConfig);
  };

  const handleLinkMessageChange = (linkMessage: string) => {
    const newConfig = { ...config, linkMessage };
    onConfigChange(newConfig);
  };

  useEffect(() => {
    const isValid = config.hasOpeningDM 
      ? config.openingMessage.trim().length > 0 && config.linkButtonText.trim().length > 0
      : config.linkMessage.trim().length > 0;
    
    if (isValid !== config.isValid) {
      onConfigChange({ ...config, isValid });
      if (isValid) {
        onComplete();
      }
    }
  }, [config.hasOpeningDM, config.openingMessage, config.linkButtonText, config.linkMessage]);

  return (
    <Card className={`${isActive ? 'ring-2 ring-blue-500' : ''}`}>
      <CardHeader>
        <CardTitle>They will get</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-2">
          <Switch
            id="opening-dm"
            checked={config.hasOpeningDM}
            onCheckedChange={handleOpeningDMToggle}
          />
          <Label htmlFor="opening-dm">an opening DM</Label>
        </div>

        {config.hasOpeningDM && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Textarea
                placeholder="Write your opening message..."
                value={config.openingMessage}
                onChange={(e) => handleOpeningMessageChange(e.target.value)}
                className="min-h-[100px]"
              />
              <p className="text-sm text-gray-500">
                Create the DM you'd like to send
              </p>
            </div>

            <div className="space-y-2">
              <Input
                placeholder="Button text"
                value={config.linkButtonText}
                onChange={(e) => handleLinkButtonTextChange(e.target.value)}
                className="max-w-sm"
              />
            </div>

            <div className="flex items-center space-x-2 text-sm text-blue-600">
              <HelpCircle className="w-4 h-4" />
              <span>Why does an Opening DM matter?</span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <Label>a DM with the link</Label>
          <div className="space-y-2">
            <Textarea
              placeholder="Write a message"
              value={config.linkMessage}
              onChange={(e) => handleLinkMessageChange(e.target.value)}
              className="min-h-[80px]"
            />
            <p className="text-sm text-red-500">
              Create the DM you'd like to send
            </p>
          </div>

          <Button variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add A Link
          </Button>
        </div>

        {config.isValid && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Response:</span>
              <span className="font-medium">
                {config.hasOpeningDM ? 'Opening DM + Link Message' : 'Link Message only'}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}