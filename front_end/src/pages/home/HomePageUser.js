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
  const [error, setError] = useState(false);
  const { state, dispatch, getDataAllProducts, getMyInfo } =
    useContext(PageContext);
  const { dataAllProducts, dataSingle } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getMyInfo();
      } catch (error) {
        setError(true);
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (!dataAllProducts) {
    getDataAllProducts();

    return (
      <div className="home">
        <SidebarUser />
        <div className="homeContainer">
          {/* <Navbar /> */}
          <div className="widgets">loading....</div>

          <div className="listContainer">
            <div className="listTitle">Latest Transactions</div>
            Loading....
          </div>
        </div>
      </div>
    );
  } else {
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
