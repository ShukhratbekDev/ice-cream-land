'use client';

import { Button } from '@/components/ui/button';
import { HeartIcon } from 'lucide-react';
import React from 'react';
import useBasicStore from '@/hooks/useBasicStore';

const LikesButton = () => {
  const { likes } = useBasicStore();

  return (
    <div className="relative inline-block">
      <Button variant="ghost" size="icon">
        <HeartIcon className="size-4" />
      </Button>
      <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full px-2 py-1 text-[.5rem] font-medium flex items-center justify-center">
        {likes.length}
      </div>
    </div>
  );
};

export default LikesButton;
