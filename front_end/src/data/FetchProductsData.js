import { apiService } from "../app/apiService";

const FetchAllProducts = async (genre) => {
  if (genre) {
    const dataAllProducts = await apiService.get(`/products?genre=${genre}`);
    return dataAllProducts;
  } else {
    const dataAllProducts = await apiService.get(`/products`);
    return dataAllProducts;
  }
};

const FetchProductsUsePageAndLimit = async (page, limit) => {
  const dataAllProducts = await apiService.get(
    `/products?page=${page || 1}&limit=${limit || 8}`
  );
  return dataAllProducts;
};

const FetchAllProductsOfAStore = async (storeID) => {
  const dataAllProducts = await apiService.get(`/products?storeID=${storeID}`);
  return dataAllProducts;
};
const FetchSearchProductByName = async (productName) => {
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
  const dataUpdateProduct = await apiService.patch(
    `/products/${productId}`,
    formData,
    {
      withCredentials: true,
    }
  );

  return dataUpdateProduct;
};
const FetchCreateProduct = async ({ data }) => {
  const dataCreateProduct = await apiService.post(`/products`, data, {
    withCredentials: true,
  });

  return dataCreateProduct;
};

const DeleteProduct = async (productId) => {
  const deleteProduct = await apiService.delete(`/products/${productId}`);
  return deleteProduct;
};

export {
  FetchAllProducts,
  FetchProductsUsePageAndLimit,
  FetchAllProductsOfAStore,
  FetchSearchProductByName,
  FetchSingleProduct,
  FetchUpdateProduct,
  FetchCreateProduct,
  DeleteProduct,
};
