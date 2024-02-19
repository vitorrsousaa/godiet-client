import { useContext } from 'react';

import { EditorState } from '@tiptap/pm/state';
import { EditorView } from '@tiptap/pm/view';

import { EditorContext } from '../Editor.context';

export function useEditor() {
  const editor = useContext(EditorContext);

  if (editor === null) {
    throw new Error(
      'editor has not yet been configured, and the value is null'
    );
  }

  if (editor === undefined) {
    throw new Error(
      'Attempt to access editor outside of the AuthContext Provider'
    );
  }

  return editor;
}

export type { EditorState, EditorView };
