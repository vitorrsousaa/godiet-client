import { useCallback, useState } from 'react';

import { useGetAllAnamnesisTemplate } from '@godiet-hooks/anamnesisTemplate';

export function useSettingsAnamnesisHook() {
  const {
    anamnesisTemplate,
    isErrorAnamnesisTemplate,
    isFetchingAnamnesisTemplate,
  } = useGetAllAnamnesisTemplate();

  const [
    modalCreateAnamnesisTemplateIsOpen,
    setModalCreateAnamnesisTemplateIsOpen,
  ] = useState(false);

  const [
    modalDeleteAnamnesisTemplateIsOpen,
    setModalDeleteAnamnesisTemplateIsOpen,
  ] = useState(false);

  const toggleModalCreateAnamnesisTemplate = useCallback(
    () => setModalCreateAnamnesisTemplateIsOpen((prev) => !prev),
    []
  );

  const toggleModaDeleteAnamnesisTemplate = useCallback(
    () => setModalDeleteAnamnesisTemplateIsOpen((prev) => !prev),
    []
  );

  return {
    modalCreateAnamnesisTemplateIsOpen,
    anamnesisTemplate,
    isErrorAnamnesisTemplate,
    isFetchingAnamnesisTemplate,
    modalDeleteAnamnesisTemplateIsOpen,

    toggleModaDeleteAnamnesisTemplate,
    toggleModalCreateAnamnesisTemplate,
  };
}
