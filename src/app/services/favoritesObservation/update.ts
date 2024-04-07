import { TCreateFavoriteObservationDTO } from '@godiet-pages/FavoritesObservation/components/FavoriteObservationForm';
import { httpClient } from '@godiet-services/httpClient';

interface UpdateInput extends TCreateFavoriteObservationDTO {
  id: string;
}

export async function update(updateInput: UpdateInput) {
  const { id, text, title } = updateInput;

  const { data } = await httpClient.put('/observation-template', {
    id,
    text,
    title,
  });

  return data;
}
