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
    const dataUpdateOrder = await apiService.patch(
      `/orders/update/${orderId}`,
      formData,
      {
        withCredentials: true,
      }
    );

    return dataUpdateOrder;
  } catch (err) {
    console.log(`Error FetchUpdateOrder:${err.name}: ${err.message}`);
  }
};

const FetchCancelOrder = async (orderId) => {
  try {
    const dataCancelOrder = await apiService.patch(
      `/orders/cancelOrder/${orderId}`
    );

    return dataCancelOrder;
  } catch (err) {
    console.log(`Error FetchCancelOrder:${err.name}: ${err.message}`);
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

export {
  FetchAllOrders,
  FetchSingleOrder,
  FetchUpdateOrder,
  FetchCancelOrder,
  DeleteOrder,
};
