import { useEditor } from './hooks/useEditor';

export function useEditorHook() {
  const { editor } = useEditor();

  return {
    editor,
  };
}
