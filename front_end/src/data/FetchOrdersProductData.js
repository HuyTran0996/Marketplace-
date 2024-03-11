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
const FetchAllOrdersProductOfStore = async (storeID) => {
  const encodedOrderId = encodeURIComponent(storeID);
  const dataAllOrdersProduct = await apiService.get(
    `/orderProducts?storeID=${storeID}`
  );
  return dataAllOrdersProduct;
};
const FetchAllOrdersProductOfAOrder = async (orderId) => {
  const encodedOrderId = encodeURIComponent(orderId);
  const dataAllOrdersProduct = await apiService.get(
    `/orderProducts?orderID=${orderId}`
  );
  return dataAllOrdersProduct;
};

const FetchCreateOrderProduct = async (data) => {
  const Order = await apiService.post(`/orderProducts`, data, {
    withCredentials: true,
  });
  return Order;
};

const FetchUpdateOrderProduct = async ({ orderProductId, data }) => {
  const dataUpdateOrder = await apiService.patch(
    `/orderProducts/${orderProductId}`,
    data,
    {
      withCredentials: true,
    }
  );

  return dataUpdateOrder;
};
const FetchSingleOrder = async (orderId) => {
  const dataSingleOrder = await apiService.get(`/orders/${orderId}`);
  return dataSingleOrder;
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
  FetchAllOrdersProduct,
  FetchCreateOrderProduct,
  FetchAllOrdersProductOfStore,
  FetchAllOrdersProductOfAOrder,
  FetchUpdateOrderProduct,
};
