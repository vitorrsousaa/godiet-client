import { Toggle } from '@godiet-ui/Toggle';

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
}

export function Toolbar(props: ToolbarProps) {
  const { editor } = props;

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
    <div className="rounded-md border border-input bg-transparent">
      <Toggle
        size={'sm'}
        pressed={headingIsActive}
        onPressedChange={toggleHeading}
      >
        <HeadingIcon className="h-4 w-4" />
      </Toggle>
      <Toggle size={'sm'} pressed={boldIsActive} onPressedChange={toggleBold}>
        <FontBoldIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        size={'sm'}
        pressed={italicIsActive}
        onPressedChange={toggleItalic}
      >
        <FontItalicIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        size={'sm'}
        pressed={strikeIsActive}
        onPressedChange={toggleStrike}
      >
        <StrikethroughIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        size={'sm'}
        pressed={bulletListIsActive}
        onPressedChange={toggleBulletList}
      >
        <ListBulletIcon className="h-4 w-4" />
      </Toggle>
    </div>
  );
}
