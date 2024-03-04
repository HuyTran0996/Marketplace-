import { apiService } from "../app/apiService";

const FetchAllStores = async (storeName) => {
  if (storeName) {
    const dataAllStores = await apiService.get(
      `/stores?storeName=${storeName}`
    );
    return dataAllStores;
  } else {
    const dataAllStores = await apiService.get(`/stores`);
    return dataAllStores;
  }
};

const FetchSingleStore = async (storeId) => {
  const dataSingleStore = await apiService.get(`/stores/${storeId}`);
  return dataSingleStore;
};

const FetchUpdateStore = async ({ storeId, formData }) => {
  const dataUpdateStore = await apiService.patch(
    `/stores/${storeId}`,
    formData,
    {
      withCredentials: true,
    }
  );

  return dataUpdateStore;
};

const DeleteStore = async (storeId) => {
  const deleteStore = await apiService.delete(`/stores/${storeId}`);
  return deleteStore;
};

export { FetchAllStores, FetchSingleStore, FetchUpdateStore, DeleteStore };
