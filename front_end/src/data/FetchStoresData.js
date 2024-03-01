import { apiService } from "../app/apiService";

const FetchAllStores = async () => {
  try {
    const dataAllStores = await apiService.get(`/stores`);
    return dataAllStores;
  } catch (err) {
    console.log(`Error FetchAllStores:${err.name}: ${err.message}`);
  }
};

const FetchSingleStore = async (storeId) => {
  try {
    const dataSingleStore = await apiService.get(`/stores/${storeId}`);
    return dataSingleStore;
  } catch (err) {
    console.log(`Error FetchAllStores:${err.name}: ${err.message}`);
  }
};

const DeleteStore = async (storeId) => {
  try {
    const deleteStore = await apiService.delete(`/stores/${storeId}`);
    return deleteStore;
  } catch (err) {
    console.log(`Error FetchAllStores:${err.name}: ${err.message}`);
  }
};

export { FetchAllStores, FetchSingleStore, DeleteStore };
