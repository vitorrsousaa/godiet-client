import { Button } from '@godiet-ui/Button';

import { BubbleMenu } from './components/BubbleMenu';
import { EditorContent } from './components/EditorContent';
import { FloatingMenu } from './components/FloatingMenu';
import { withEditorContext } from './Editor.hoc.tsx';
import { useEditorHook } from './Editor.hook';

export interface EditorProps {
  initialContent?: string;
  isValid?: boolean;
  isLoading?: boolean;
  isEditable?: boolean;
  hasFooter?: boolean;
  onBackButton?: () => void;
  onSave?: (text: string) => void;
}

function EditorComponent(props: EditorProps) {
  const { isValid, isLoading, hasFooter = false, onBackButton, onSave } = props;

  const { editor } = useEditorHook();

  return (
    <div className="max-h-full w-full">
      <EditorContent />

      {editor && (
        <>
          <FloatingMenu />

          <BubbleMenu />
        </>
      )}

      {hasFooter && (
        <footer className="mt-6 flex w-full justify-end gap-4">
          <Button
            variant="destructive"
            onClick={onBackButton}
            disabled={isLoading}
          >
            Cancelar
          </Button>

          <Button
            disabled={!isValid}
            isLoading={isLoading}
            onClick={() => {
              const text = editor?.getHTML();

              onSave?.(text);
            }}
          >
            Salvar
          </Button>
        </footer>
      )}
    </div>
  );
}

export const Editor = withEditorContext(EditorComponent);
