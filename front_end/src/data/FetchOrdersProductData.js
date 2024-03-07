import { apiService } from "../app/apiService";

const FetchAllOrdersProduct = async (orderId) => {
  if (orderId) {
    const encodedOrderId = encodeURIComponent(orderId);
    const dataAllOrdersProduct = await apiService.get(
      `/orderProducts?orderID=${encodedOrderId}`
    );
    return dataAllOrdersProduct;
  } else {
    const dataAllOrdersProduct = await apiService.get(`/orderProducts`);
    return dataAllOrdersProduct;
  }
};
const FetchCreateOrderProduct = async (data) => {
  const Order = await apiService.post(`/orderProducts`, data, {
    withCredentials: true,
  });
  return Order;
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

export { FetchAllOrdersProduct, FetchCreateOrderProduct };
