import React from 'react';

import { ToolbarProps } from './toolbar';

export function useToolbarHook(props: ToolbarProps) {
  const { editor } = props;

  const headingIsActive = React.useMemo(
    () => editor?.isActive('heading'),
    [editor]
  );
  const boldIsActive = React.useMemo(() => editor?.isActive('bold'), [editor]);
  const italicIsActive = React.useMemo(
    () => editor?.isActive('italic'),
    [editor]
  );
  const strikeIsActive = React.useMemo(
    () => editor?.isActive('strike'),
    [editor]
  );
  const bulletListIsActive = React.useMemo(
    () => editor?.isActive('bulletList'),
    [editor]
  );

  const toggleHeading = React.useCallback(
    () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
    [editor]
  );

  const toggleBulletList = React.useCallback(
    () => editor?.chain().focus().toggleBulletList().run(),
    [editor]
  );
  const toggleStrike = React.useCallback(
    () => editor?.chain().focus().toggleStrike().run(),
    [editor]
  );
  const toggleItalic = React.useCallback(
    () => editor?.chain().focus().toggleItalic().run(),
    [editor]
  );
  const toggleBold = React.useCallback(
    () => editor?.chain().focus().toggleBold().run(),
    [editor]
  );

  return {
    headingIsActive,
    boldIsActive,
    italicIsActive,
    strikeIsActive,
    bulletListIsActive,
    toggleBulletList,
    toggleStrike,
    toggleHeading,
    toggleItalic,
    toggleBold,
  };
}
