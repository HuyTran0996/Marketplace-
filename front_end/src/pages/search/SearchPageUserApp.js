import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import "./home.scss";
import { PageContext } from "../../context/PageContext";
import SidebarUser from "../../components/sidebar/SideBarUser";
import NavbarUserApp from "../../components/navbar/NavbarUserApp";
import ProductCard from "../../components/productCard/ProductCard";
import Widget from "../../components/widget/Widget";

import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";

const SearchPageUserApp = () => {
  const { genre } = useParams();
  const {
    state,
    dispatch,
    getDataAllProducts,
    getMyInfo,
    searchProductByName,
  } = useContext(PageContext);
  const { dataAllProducts, dataSingle } = state;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    console.log("dáhd", genre);
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (
          genre === "Foods" ||
          genre === "Devices" ||
          genre === "Stationery" ||
          genre === "Others"
        ) {
          await getDataAllProducts(genre);
        } else {
          await searchProductByName(genre);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(true);
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [location, genre]);

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
          <div className="products">
            <div className="movieStyle">Result of {genre}</div>

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

export default SearchPageUserApp;
