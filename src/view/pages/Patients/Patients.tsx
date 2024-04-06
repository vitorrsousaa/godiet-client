import { PatientsController } from './patients.controller';
import { withHook } from './patients.hoc';
import { PatientsHookOutput } from './patients.hook';
import { PatientsLayout } from './patients.layout';

export type PatientsProps = PatientsHookOutput;

function PatientsWithoutHook(props: PatientsProps) {
  return (
    <PatientsLayout
      isFetchingPatients={props.isFetchingPatients}
      isErrorPatients={props.isErrorPatients}
    >
      <PatientsController {...props} />
    </PatientsLayout>
  );
}

const Patients = withHook(PatientsWithoutHook);

export { Patients };
