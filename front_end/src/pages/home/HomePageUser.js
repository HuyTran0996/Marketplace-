import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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
  const { dataAllProducts, dataSingle } = state;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const genre = location.state?.genre;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // dispatch({
        //   type: "SET_LOADING",
        //   payload: true,
        // });
        setIsLoading(true);
        if (genre) {
          await getDataAllProducts(genre); // Fetch data based on genre if passed
        } else {
          await getMyInfo();
          await getDataAllProducts(); // Fetch all products if no genre is passed
        }
        setIsLoading(false);
        // dispatch({
        //   type: "SET_LOADING",
        //   payload: false,
        // });
      } catch (error) {
        // dispatch({
        //   type: "SET_LOADING",
        //   payload: false,
        // });
        // dispatch({
        //   type: "SET_ERROR",
        //   payload: true,
        // });
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
            {dataAllProducts.data.products?.map((product) => {
              return (
                <ProductCard product={product} />
                // <Grid style={gridStyle} key={product._id} item xs={12} lg={4}>
                //   <ProductCard product={product} />
                // </Grid>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default HomePageUser;
