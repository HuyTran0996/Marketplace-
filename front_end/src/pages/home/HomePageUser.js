import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./home.scss";
import { PageContext } from "../../context/PageContext";
import SidebarUser from "../../components/sidebar/SideBarUser";
import NavbarUserApp from "../../components/navbar/NavbarUserApp";
import ProductCard from "../../components/productCard/ProductCard";
import Widget from "../../components/widget/Widget";

import Grid from "@mui/material/Grid";

const HomePageUser = () => {
  const { state, dispatch, getDataAllProducts, getMyInfo } =
    useContext(PageContext);
  const { dataAllProducts, dataSingle } = state;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const genre = location.state?.genre;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (genre) {
          await getDataAllProducts(genre);
        } else {
          await getMyInfo();
          await getDataAllProducts();
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(true);
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [genre]);

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
          <NavbarUserApp />
          <div className="widgets">
            <Grid container spacing={3}>
              {dataAllProducts.data.products?.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    );
  }
};

export default HomePageUser;
