import { useEditor } from '@godiet-ui/Editor/hooks/useEditor';

import {
  FontBoldIcon,
  FontItalicIcon,
  StrikethroughIcon,
} from '@radix-ui/react-icons';
import { BubbleMenu as BubbleMenuComponent } from '@tiptap/react';

import { BubbleMenuButton } from './BubbleMenuButton';

export function BubbleMenu() {
  const { editor } = useEditor();

  return (
    <BubbleMenuComponent
      editor={editor}
      className="flex overflow-hidden truncate rounded-lg border-[1px] border-border bg-background shadow-xl"
    >
      <BubbleMenuButton
        onAction={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
      >
        <FontBoldIcon />
      </BubbleMenuButton>
      <BubbleMenuButton
        onAction={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
      >
        <FontItalicIcon />
      </BubbleMenuButton>
      <BubbleMenuButton
        onAction={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive('strike')}
      >
        <StrikethroughIcon />
      </BubbleMenuButton>
    </BubbleMenuComponent>
  );
}
