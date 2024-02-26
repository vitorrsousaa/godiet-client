import { useEditor } from '@godiet-ui/Editor/hooks/useEditor';

import { EditorContent as EditorContentComponent } from '@tiptap/react';

export function EditorContent() {
  const { editor } = useEditor();

  return (
    <EditorContentComponent
      className="focus:border-primary-500 max-h-full rounded-md border-[1px] border-input p-4 outline-none transition-colors duration-200 ease-in-out"
      editor={editor}
    />
  );
}
