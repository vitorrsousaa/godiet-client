import { Toggle } from '@godiet-ui/Toggle';
import { cn } from '@godiet-utils/cn';

import {
  FontBoldIcon,
  FontItalicIcon,
  HeadingIcon,
  ListBulletIcon,
  StrikethroughIcon,
} from '@radix-ui/react-icons';
import { type Editor } from '@tiptap/react';

import { useToolbarHook } from './toolbar.hook';

export interface ToolbarProps {
  editor: Editor | null;
  disabled?: boolean;
}

export function Toolbar(props: ToolbarProps) {
  const { editor, disabled } = props;

  const {
    headingIsActive,
    boldIsActive,
    italicIsActive,
    strikeIsActive,
    bulletListIsActive,
    toggleBulletList,
    toggleStrike,
    toggleItalic,
    toggleHeading,
    toggleBold,
  } = useToolbarHook(props);

  if (!editor) return null;

  return (
    <div
      className={cn(
        'rounded-md border border-input bg-transparent',
        disabled && 'cursor-not-allowed opacity-50'
      )}
    >
      <Toggle
        size={'sm'}
        pressed={headingIsActive}
        onPressedChange={toggleHeading}
        disabled={disabled}
      >
        <HeadingIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        size={'sm'}
        pressed={boldIsActive}
        onPressedChange={toggleBold}
        disabled={disabled}
      >
        <FontBoldIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        size={'sm'}
        pressed={italicIsActive}
        onPressedChange={toggleItalic}
        disabled={disabled}
      >
        <FontItalicIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        size={'sm'}
        pressed={strikeIsActive}
        onPressedChange={toggleStrike}
        disabled={disabled}
      >
        <StrikethroughIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        size={'sm'}
        pressed={bulletListIsActive}
        onPressedChange={toggleBulletList}
        disabled={disabled}
      >
        <ListBulletIcon className="h-4 w-4" />
      </Toggle>
    </div>
  );
}
