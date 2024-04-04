import faunadb from 'faunadb';
import { FaunaCadModel } from 'cad-library';

export async function deleteFaunadbModel(
  faunaClient: faunadb.Client,
  faunaQuery: typeof faunadb.query,
  modelToDelete: string,
) {
  try {
    await faunaClient.query(
      faunaQuery.Delete(
        faunaQuery.Ref(faunaQuery.Collection('CadModels'), modelToDelete),
      ),
    );
  } catch (e) {
    console.log(e);
  }
}

export const updateModelInFauna = async (
  faunaClient: faunadb.Client,
  faunaQuery: typeof faunadb.query,
  modelToUpdate: FaunaCadModel,
) => {
  const response = await faunaClient
    .query(
      faunaQuery.Update(
        faunaQuery.Ref(
          faunaQuery.Collection('CadModels'),
          modelToUpdate.id,
        ),
        {
          data: modelToUpdate,
        },
      ),
    )
    .catch((err) =>
      console.error(
        'Error: [%s] %s: %s',
        err.name,
        err.message,
        err.errors()[0].description,
      ),
    );
  return response;
};
