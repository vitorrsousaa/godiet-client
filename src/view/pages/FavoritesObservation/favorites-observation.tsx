import { FavoritesObservationController } from './favorites-observation.controller';
import { withHook } from './favorites-observation.hoc';
import { FavoritesObservationHookOutput } from './favorites-observation.hook';
import { FavoritesObservationLayout } from './favorites-observation.layout';

export type FavoritesObservationProps = FavoritesObservationHookOutput;

function FavoritesObservationWithoutHook(props: FavoritesObservationProps) {
  return (
    <FavoritesObservationLayout
      isFetching={props.isFetchingFavoritesObservation}
    >
      <FavoritesObservationController {...props} />
    </FavoritesObservationLayout>
  );
}

const FavoritesObservation = withHook(FavoritesObservationWithoutHook);

export { FavoritesObservation };
