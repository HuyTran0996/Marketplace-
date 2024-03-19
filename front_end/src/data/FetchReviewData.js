import { apiService } from "../app/apiService";

const FetchReviewOfProduct = async (productId) => {
  const ReviewOfProduct = await apiService.get(
    `/reviews?productID=${productId}`
  );
  return ReviewOfProduct;
};

const FetchReviewOfProductForAdmin = async (productId, page, limit) => {
  const ReviewOfProduct = await apiService.get(
    `/reviews/getAllReviewsForAdmin?productID=${productId}&page=${
      page || 1
    }&limit=${limit || 8}`
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
const FetchAdminDeleteReview = async (reviewID) => {
  const deleteReview = await apiService.delete(`/reviews/${reviewID}`, {
    withCredentials: true,
  });
  return deleteReview;
};
const FetchAdminActivateReview = async (reviewID) => {
  const activateReview = await apiService.get(
    `/reviews/adminActivateReview/${reviewID}`,
    {
      withCredentials: true,
    }
  );
  return activateReview;
};

// const FetchUpdateOrder = async ({ orderId, data }) => {
//   const dataUpdateOrder = await apiService.patch(`/orders/${orderId}`, data, {
//     withCredentials: true,
//   });

// return dataUpdateOrder;
// };

export {
  FetchReviewOfProduct,
  FetchCreateReviewOfProduct,
  FetchReviewOfProductForAdmin,
  FetchAdminDeleteReview,
  FetchAdminActivateReview,
};
