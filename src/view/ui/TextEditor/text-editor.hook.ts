import React from 'react';

import { cn } from '@godiet-utils/cn';

import Heading from '@tiptap/extension-heading';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { TextEditorProps } from './text-editor';

const originalCss =
  'rounded-md border min-h-[200px] p-2 w-full focus:outline-none  border-input prose dark:prose-invert';

export function useTextEditorHook(props: TextEditorProps) {
  const { value, disabled, onChange } = props;

  const editor = useEditor(
    {
      extensions: [StarterKit.configure(), Heading.configure()],
      content: value,
      editorProps: {
        attributes: {
          class: cn(originalCss, disabled && 'cursor-not-allowed opacity-50'),
        },
        editable: () => !disabled,
      },
      onUpdate({ editor }) {
        onChange(editor.getHTML());
      },
      editable: !disabled,
    },
    [disabled]
  );

  React.useEffect(() => {
    if (editor) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  return {
    editor,
  };
}
