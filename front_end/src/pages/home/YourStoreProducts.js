import React, { useContext, useEffect, useState } from "react";

import "./home.scss";
import { PageContext } from "../../context/PageContext";
import SidebarUser from "../../components/sidebar/SideBarUser";
import NavbarUserApp from "../../components/navbar/NavbarUserApp";
import ProductCardOfStoreOwner from "../../components/productCard/ProductCardOfStoreOwner";
import Widget from "../../components/widget/Widget";

import Grid from "@mui/material/Grid";

import { useNavigate } from "react-router-dom";

const YourStoreProducts = () => {
  const navigate = useNavigate();
  const {
    state,
    dispatch,
    getDataAllProducts,
    getMyInfo,
    getDataAllStoreByOwnerEmail,
    getDataAllProductsOfAStore,
  } = useContext(PageContext);
  const { dataAllProducts, dataSingle, dataUser } = state;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [foundNoStore, setFoundNoStore] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const result = await getDataAllStoreByOwnerEmail(
          dataUser.data.user.email
        );
        if (result?.data?.totalStores === 0) {
          setFoundNoStore(true);
          setIsLoading(false);
          navigate("/userPage/stores");
          return;
        }

        await getDataAllProductsOfAStore(result.data.stores._id);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
        setError(true);
      }
    };
    fetchData();
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();
    navigate("/userPage/stores/yourStoreProducts/createProduct");
  };

  if (isLoading) {
    return (
      <div className="home">
        <SidebarUser />
        <div className="homeContainer">
          {/* <NavbarUserApp /> */}
          <div className="widgets">loading....</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home">
        <SidebarUser />
        <div className="homeContainer">
          <div className="widgets">ERROR....</div>
        </div>
      </div>
    );
  }
  if (!isLoading && !error && dataAllProducts) {
    return (
      <div className="home">
        <SidebarUser />
        <div className="homeContainer">
          <button className="addProduct" onClick={handleAddProduct}>
            Add Product
          </button>

          <div className="products">
            <Grid container spacing={3}>
              {dataAllProducts.data.products.length === 0 ? (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <div>Your store has no products</div>
                </Grid>
              ) : (
                dataAllProducts.data.products?.map((product) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                    <ProductCardOfStoreOwner product={product} />
                  </Grid>
                ))
              )}
            </Grid>
          </div>
        </div>
      </div>
    );
  }
};

export default YourStoreProducts;
