import { apiService } from "../app/apiService";

const FetchAllOrders = async () => {
  try {
    const dataAllOrders = await apiService.get(`/orders`);
    return dataAllOrders;
  } catch (err) {
    console.log(`Error FetchAllOrders:${err.name}: ${err.message}`);
  }
};

export { FetchAllOrders };
