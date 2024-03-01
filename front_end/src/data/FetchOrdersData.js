import { apiService } from "../app/apiService";

const FetchAllOrders = async () => {
  try {
    const dataAllOrders = await apiService.get(`/orders`);
    return dataAllOrders;
  } catch (err) {
    console.log(`Error FetchAllOrders:${err.name}: ${err.message}`);
  }
};

const FetchSingleOrder = async (orderId) => {
  try {
    const dataSingleOrder = await apiService.get(`/orders/${orderId}`);
    return dataSingleOrder;
  } catch (err) {
    console.log(`Error FetchSingleOrder:${err.name}: ${err.message}`);
  }
};

const FetchUpdateOrder = async ({ orderId, formData }) => {
  try {
    const dataUpdateStore = await apiService.patch(
      `/orders/${orderId}`,
      formData,
      {
        withCredentials: true,
      }
    );

    return dataUpdateStore;
  } catch (err) {
    console.log(`Error FetchUpdateOrder:${err.name}: ${err.message}`);
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

export { FetchAllOrders, FetchSingleOrder, FetchUpdateOrder, DeleteOrder };
