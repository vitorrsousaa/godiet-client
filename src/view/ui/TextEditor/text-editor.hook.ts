import Heading from '@tiptap/extension-heading';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { TextEditorProps } from './text-editor';

export function useTextEditorHook(props: TextEditorProps) {
  const { value, onChange } = props;

  const editor = useEditor({
    extensions: [StarterKit.configure(), Heading.configure()],
    content: value,
    editorProps: {
      attributes: {
        class:
          'rounded-md border min-h-[200px] p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-input prose dark:prose-invert',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      console.log(editor.getHTML());
    },
  });

  return {
    editor,
  };
}
