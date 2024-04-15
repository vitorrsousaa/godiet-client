import { CreateAnamneseController } from './create-anamnese.controller';
import { withHook } from './create-anamnese.hoc';
import { CreateAnamneseHookOutput } from './create-anamnese.hook';
import { CreateAnamneseLayout } from './create-anamnese.layout';

export type CreateAnamneseProps = CreateAnamneseHookOutput;

function CreateAnamneseWithoutHook(props: CreateAnamneseProps) {
  return (
    <CreateAnamneseLayout>
      <CreateAnamneseController {...props} />
    </CreateAnamneseLayout>
  );
}

const CreateAnamnese = withHook(CreateAnamneseWithoutHook);

export { CreateAnamnese };
