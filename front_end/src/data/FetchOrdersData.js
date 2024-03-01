import { apiService } from "../app/apiService";

const FetchAllOrders = async () => {
  try {
    const dataAllOrders = await apiService.get(`/orders`);
    return dataAllOrders;
  } catch (err) {
    console.log(`Error FetchAllOrders:${err.name}: ${err.message}`);
  }
};

const DeleteOrder = async (id) => {
  try {
    const deleteOrder = await apiService.delete(`/orders/${id}`);
    return deleteOrder;
  } catch (err) {
    console.log(`Error FetchAllOrders:${err.name}: ${err.message}`);
  }
};

export { FetchAllOrders, DeleteOrder };
