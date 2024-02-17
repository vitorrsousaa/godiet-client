import { createContext } from 'react';

import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import { Editor, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

type EditorContextValue = {
  editor: Editor;
};

export const EditorContext = createContext<EditorContextValue | null>(null);

interface EditorContextProviderProps {
  children: React.ReactNode;
  initialContent?: string;
  isEditable?: boolean;
}

export function EditorContextProvider(props: EditorContextProviderProps) {
  const { initialContent, isEditable = true } = props;

  const PlaceholderExtension = Placeholder.configure({
    placeholder: (props) => {
      const { node } = props;
      const headingPlaceholders = {
        1: 'Título 1',
        2: 'Título 2',
        paragraph: 'Digite aqui ou "/" para comandos',
      };

      if (node.type.name === 'heading') {
        return 'Título 1';
      }

      return headingPlaceholders['paragraph'];
    },
    emptyNodeClass: 'empty',
    emptyEditorClass: 'outlined-none focus:outlined-none ',
  });

  const HeadingExtension = Heading.configure({
    levels: [1, 2],
  });

  const extensions = [
    StarterKit,
    Highlight,
    Typography,
    PlaceholderExtension,
    HeadingExtension,
  ];

  const editor = useEditor({
    extensions,
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          'outlined-none focus:outlined-none p-2 prose dark:prose-invert [&>p.empty]:before:text-input [&>p.empty]:before:float-left [&>p.empty]:before:content-[attr(data-placeholder)] [&>p.empty]:before:pointer-events-none',
      },
    },

    editable: isEditable,
  });

  if (!editor) {
    return null;
  }

  return (
    <EditorContext.Provider value={{ editor }}>
      {props.children}
    </EditorContext.Provider>
  );
}
