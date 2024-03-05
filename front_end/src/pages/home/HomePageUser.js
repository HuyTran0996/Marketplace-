import React, { useContext, useEffect, useState } from "react";

import "./home.scss";
import { PageContext } from "../../context/PageContext";
import SidebarUser from "../../components/sidebar/SideBarUser";
import NavbarUserApp from "../../components/navbar/NavbarUserApp";
import ProductCard from "../../components/productCard/ProductCard";
import Widget from "../../components/widget/Widget";

import Grid from "@mui/material/Grid";

const gridStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  marginTop: "6px",
};

const HomePageUser = () => {
  const { state, dispatch, getDataAllProducts, getMyInfo } =
    useContext(PageContext);
  const { dataAllProducts, dataSingle, error, isLoading } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({
          type: "SET_LOADING",
          payload: true,
        });
        await getMyInfo();
        await getDataAllProducts();
        dispatch({
          type: "SET_LOADING",
          payload: false,
        });
      } catch (error) {
        dispatch({
          type: "SET_LOADING",
          payload: false,
        });
        dispatch({
          type: "SET_ERROR",
          payload: true,
        });
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="home">
        <SidebarUser />
        <div className="homeContainer">
          <NavbarUserApp />
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
          <NavbarUserApp />
          <div className="widgets">
            {dataAllProducts.data.products?.map((product) => {
              return (
                <Grid style={gridStyle} key={product._id} item xs={12} lg={4}>
                  <ProductCard product={product} />
                </Grid>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default HomePageUser;
