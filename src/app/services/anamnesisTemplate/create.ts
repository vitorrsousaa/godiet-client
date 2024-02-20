import { httpClient } from '@godiet-services/httpClient';

interface CreateAnamnesisTemplateInput {
  title: string;
  text: string;
}

export async function create(
  createAnamnesisTemplateInput: CreateAnamnesisTemplateInput
) {
  const { data } = await httpClient.post('/anamnesisTemplate', {
    title: createAnamnesisTemplateInput.title,
    text: createAnamnesisTemplateInput.text,
  });

  return data;
}
