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
const FetchStoreByOwnerEmail = async (ownerEmail) => {
  const dataAllStores = await apiService.get(
    `/stores?ownerEmail=${ownerEmail}`
  );
  return dataAllStores;
};

const FetchSingleStore = async (storeId) => {
  const dataSingleStore = await apiService.get(`/stores/${storeId}`);
  return dataSingleStore;
};

const FetchCreateStore = async ({ data }) => {
  const dataUpdateStore = await apiService.post(`/stores`, data, {
    withCredentials: true,
  });

  return dataUpdateStore;
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

export {
  FetchAllStores,
  FetchStoreByOwnerEmail,
  FetchCreateStore,
  FetchSingleStore,
  FetchUpdateStore,
  DeleteStore,
};
