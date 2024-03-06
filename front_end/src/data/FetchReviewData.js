import { apiService } from "../app/apiService";

const FetchReviewOfProduct = async (productId) => {
  const ReviewOfProduct = await apiService.get(
    `/reviews?productID=${productId}`
  );
  return ReviewOfProduct;
};
const FetchCreateReviewOfProduct = async (productId, comment) => {
  const ReviewOfProduct = await apiService.post(
    `/reviews/${productId}`,
    { userReview: comment },
    {
      withCredentials: true,
    }
  );
  return ReviewOfProduct;
};

// const FetchUpdateOrder = async ({ orderId, data }) => {
//   const dataUpdateOrder = await apiService.patch(`/orders/${orderId}`, data, {
//     withCredentials: true,
//   });

// return dataUpdateOrder;
// };

export { FetchReviewOfProduct, FetchCreateReviewOfProduct };
