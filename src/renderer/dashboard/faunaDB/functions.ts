import faunadb from 'faunadb';

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
