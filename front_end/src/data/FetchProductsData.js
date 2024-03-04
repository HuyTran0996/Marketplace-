import { apiService } from "../app/apiService";

const FetchAllProducts = async () => {
  const dataAllProducts = await apiService.get(`/products`);
  return dataAllProducts;
};
const FetchSearchProductByName = async (productName) => {
  // Properly encode the productName to handle special characters and spaces
  // const encodedProductName = encodeURIComponent(productName);

  // Use the encoded productName in the request URL
  const dataAllProducts = await apiService.get(
    `/products?search=${productName}`
  );
  return dataAllProducts;
};

const FetchSingleProduct = async (productId) => {
  const dataSingleProduct = await apiService.get(`/products/${productId}`);
  return dataSingleProduct;
};

const FetchUpdateProduct = async ({ productId, formData }) => {
  const dataUpdateStore = await apiService.patch(
    `/products/${productId}`,
    formData,
    {
      withCredentials: true,
    }
  );

  return dataUpdateStore;
};

const DeleteProduct = async (productId) => {
  const deleteProduct = await apiService.delete(`/products/${productId}`);
  return deleteProduct;
};

export {
  FetchAllProducts,
  FetchSearchProductByName,
  FetchSingleProduct,
  FetchUpdateProduct,
  DeleteProduct,
};
