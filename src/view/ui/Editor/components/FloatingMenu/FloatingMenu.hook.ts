import { useCallback } from 'react';

import { EditorState, useEditor } from '@godiet-ui/Editor/hooks/useEditor';

type TLevelProps = 1 | 2 | 3 | 4;

export function useFloatingMenuHook() {
  const { editor } = useEditor();

  const shouldShowFloatingMenu = useCallback((state: EditorState) => {
    const { $from } = state.selection;

    const currentLineText = $from.nodeBefore?.textContent;

    return currentLineText === '/';
  }, []);

  const cutLastCharacter = useCallback(() => {
    const { state, dispatch } = editor.view;

    const { to, from } = state.selection;

    if (from === to && from > 0) {
      const newPosition = from - 1;

      const tr = editor.view.state.tr.delete(newPosition, from);

      dispatch(tr);
    }
  }, [editor.view]);

  const toggleTextToHeading = useCallback(
    (level: TLevelProps) => {
      editor.chain().focus().toggleHeading({ level }).run();
    },
    [editor]
  );

  const handleToggleTextToHeading = useCallback(
    (level: TLevelProps = 1) => {
      cutLastCharacter();
      toggleTextToHeading(level);
    },
    [cutLastCharacter, toggleTextToHeading]
  );

  return {
    editor,
    shouldShowFloatingMenu,
    cutLastCharacter,
    handleToggleTextToHeading,
  };
}
