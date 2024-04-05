import { apiService } from "../app/apiService";

const FetchAllStores = async (storeName, page, limit) => {
  if (storeName) {
    const dataAllStores = await apiService.get(`/stores?search=${storeName}`);
    return dataAllStores;
  } else {
    const dataAllStores = await apiService.get(
      `/stores?page=${page || 1}&limit=${limit || 8}`
    );
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
const AdminActivateStore = async (storeId) => {
  const AdminActivateStore = await apiService.get(
    `/stores/adminActivateStore/${storeId}`
  );
  return AdminActivateStore;
};

export {
  FetchAllStores,
  FetchStoreByOwnerEmail,
  FetchCreateStore,
  FetchSingleStore,
  FetchUpdateStore,
  DeleteStore,
  AdminActivateStore,
};
