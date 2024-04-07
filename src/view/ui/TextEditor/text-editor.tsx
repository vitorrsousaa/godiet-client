import { CrossCircledIcon } from '@radix-ui/react-icons';
import { EditorContent } from '@tiptap/react';

import { Toolbar } from './components/Toolbar';
import { useTextEditorHook } from './text-editor.hook';

export interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export function TextEditor(props: TextEditorProps) {
  const { error, disabled } = props;

  const { editor } = useTextEditorHook(props);
  return (
    <div className="flex min-h-[250px] flex-col justify-stretch gap-2">
      <Toolbar editor={editor} disabled={disabled} />
      <EditorContent editor={editor} />
      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-700 ">
          <CrossCircledIcon />
          <span className="text-sx">{error}</span>
        </div>
      )}
    </div>
  );
}
