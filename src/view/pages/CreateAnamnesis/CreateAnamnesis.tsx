import { Editor } from '@godiet-ui/Editor';
import { Input } from '@godiet-ui/Input';

import { useCreateAnamnesisHook } from './CreateAnamnesis.hook';

export function CreateAnamnesis() {
  const {
    anamnesisTemplate,
    title,
    formIsValid,
    isCreatingAnamnesis,
    handleChangeTitle,
    handleCreateAnamnesis,
  } = useCreateAnamnesisHook();
  return (
    <div className="mb-8 flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-medium">Criando anamnese</h1>
        <small>Adicione as informações sobre a anamnese do paciente.</small>
      </div>

      <Input
        name="anamnesis-template"
        placeholder="Título da anamnese"
        onChange={handleChangeTitle}
        value={title}
      />

      <Editor
        hasFooter
        initialContent={anamnesisTemplate?.text}
        isValid={formIsValid}
        isLoading={isCreatingAnamnesis}
        onSave={handleCreateAnamnesis}
      />
    </div>
  );
}
