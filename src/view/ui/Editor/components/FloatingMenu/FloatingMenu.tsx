import { Separator } from '@godiet-ui/Separator';

import { FloatingMenu as FloatingMenuComponent } from '@tiptap/react';

import { useFloatingMenuHook } from './FloatingMenu.hook';
import { FloatingMenuButton } from './FloatingMenuButton';

export function FloatingMenu() {
  const {
    editor,
    shouldShowFloatingMenu,
    cutLastCharacter,
    handleToggleTextToHeading,
  } = useFloatingMenuHook();

  return (
    <FloatingMenuComponent
      editor={editor}
      shouldShow={({ state }) => shouldShowFloatingMenu(state)}
      className="flex
       flex-col overflow-hidden rounded-md  border
         border-border bg-background shadow-lg duration-200"
    >
      <FloatingMenuButton
        onAction={cutLastCharacter}
        title="Texto"
        description="Comece a escrever com texto sem formatação"
        imgUrl="https://www.notion.so/images/blocks/text/en-US.png"
      />

      <Separator />

      <FloatingMenuButton
        onAction={() => handleToggleTextToHeading(1)}
        title="Título"
        description="Título de seção grande"
        imgUrl="https://www.notion.so/images/blocks/header.57a7576a.png"
      />

      <Separator />

      <FloatingMenuButton
        onAction={() => handleToggleTextToHeading(2)}
        title="Título"
        description="Título de seção médio"
        imgUrl="https://www.notion.so/images/blocks/subheader.9aab4769.png"
      />
    </FloatingMenuComponent>
  );
}
