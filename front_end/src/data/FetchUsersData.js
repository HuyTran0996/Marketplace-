import { apiService } from "../app/apiService";

const FetchAllUsers = async () => {
  try {
    const dataAllUsers = await apiService.get(`/users`);
    return dataAllUsers;
  } catch (err) {
    console.log(`Error FetchAllUsers:${err.name}: ${err.message}`);
  }
};

const FetchAllOrders = async () => {
  try {
    const dataAllOrders = await apiService.get(`/orders`);
    return dataAllOrders;
  } catch (err) {
    console.log(`Error FetchAllOrders:${err.name}: ${err.message}`);
  }
};

const FetchAllStores = async () => {
  try {
    const dataAllStores = await apiService.get(`/stores`);
    return dataAllStores;
  } catch (err) {
    console.log(`Error FetchAllStores:${err.name}: ${err.message}`);
  }
};

export { FetchAllUsers, FetchAllOrders, FetchAllStores };
