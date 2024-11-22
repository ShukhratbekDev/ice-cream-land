import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import * as React from 'react';

type FlagIconProps = {
  flagUrl?: string;
};

const FlagIcon = ({ flagUrl }: FlagIconProps) => {
  return (
    <Avatar className="size-4">
      <AvatarImage src={flagUrl} />
      <AvatarFallback>?</AvatarFallback>
    </Avatar>
  );
};

export default FlagIcon;
