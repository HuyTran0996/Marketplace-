import { apiService } from "../app/apiService";

const FetchAllStores = async () => {
  try {
    const dataAllStores = await apiService.get(`/stores`);
    return dataAllStores;
  } catch (err) {
    console.log(`Error FetchAllStores:${err.name}: ${err.message}`);
  }
};

export { FetchAllStores };
