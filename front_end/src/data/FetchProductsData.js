import { apiService } from "../app/apiService";

const FetchAllProducts = async () => {
  try {
    const dataAllProducts = await apiService.get(`/products`);
    return dataAllProducts;
  } catch (err) {
    console.log(`Error FetchAllProducts:${err.name}: ${err.message}`);
  }
};

const FetchSingleProduct = async (productId) => {
  try {
    const dataSingleProduct = await apiService.get(`/products/${productId}`);
    return dataSingleProduct;
  } catch (err) {
    console.log(`Error FetchSingleProduct:${err.name}: ${err.message}`);
  }
};

const FetchUpdateProduct = async ({ productId, formData }) => {
  try {
    const dataUpdateStore = await apiService.patch(
      `/products/${productId}`,
      formData,
      {
        withCredentials: true,
      }
    );

    return dataUpdateStore;
  } catch (err) {
    console.log(`Error FetchUpdateProduct:${err.name}: ${err.message}`);
  }
};

const DeleteProduct = async (productId) => {
  try {
    const deleteProduct = await apiService.delete(`/products/${productId}`);
    return deleteProduct;
  } catch (err) {
    console.log(`Error DeleteProduct :${err.name}: ${err.message}`);
  }
};

export {
  FetchAllProducts,
  FetchSingleProduct,
  FetchUpdateProduct,
  DeleteProduct,
};
