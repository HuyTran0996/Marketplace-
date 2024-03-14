import { apiService } from "../app/apiService";

const FetchCreateOrder = async () => {
  const Order = await apiService.post(`/orders/createOrder`);
  return Order;
};

const FetchAllOrders = async (orderId, page, limit) => {
  if (orderId) {
    const encodedOrderId = encodeURIComponent(orderId);
    const dataAllOrders = await apiService.get(`/orders?_id=${encodedOrderId}`);
    return dataAllOrders;
  } else {
    const dataAllOrders = await apiService.get(
      `/orders?page=${page || 1}&limit=${limit || 8}`
    );
    return dataAllOrders;
  }
};
const FetchAllOrdersOfAUser = async (userID, page, limit) => {
  const encodedOrderId = encodeURIComponent(userID);
  const dataAllOrders = await apiService.get(
    `/orders?customerID=${encodedOrderId}&page=${page || 1}&limit=${limit || 8}`
  );
  return dataAllOrders;
};

const FetchSingleOrder = async (orderId) => {
  const dataSingleOrder = await apiService.get(`/orders/${orderId}`);
  return dataSingleOrder;
};

const FetchUpdateOrder = async ({ orderId, data }) => {
  const dataUpdateOrder = await apiService.patch(`/orders/${orderId}`, data, {
    withCredentials: true,
  });

  return dataUpdateOrder;
};

const FetchCancelOrder = async (orderId) => {
  const dataCancelOrder = await apiService.patch(
    `/orders/cancelOrder/${orderId}`
  );

  return dataCancelOrder;
};

const DeleteOrder = async (id) => {
  const deleteOrder = await apiService.delete(`/orders/${id}`);
  return deleteOrder;
};

export {
  FetchCreateOrder,
  FetchAllOrders,
  FetchAllOrdersOfAUser,
  FetchSingleOrder,
  FetchUpdateOrder,
  FetchCancelOrder,
  DeleteOrder,
};
