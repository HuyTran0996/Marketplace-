import React, { useContext, useEffect, useState } from "react";
import {
  useLocation,
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { DarkModeContext } from "../../context/darkModeContext";

import "./home.scss";
import { PageContext } from "../../context/PageContext";
import SidebarUser from "../../components/sidebar/SideBarUser";
import NavbarUserApp from "../../components/navbar/NavbarUserApp";
import ProductCard from "../../components/productCard/ProductCard";
import Widget from "../../components/widget/Widget";

import Pagination from "@mui/material/Pagination";
import { red } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";

///////////STYLES//////////////

const stackStyle = {
  marginTop: "15px",
  marginBottom: "25px",
  display: "flex",
  alignItems: "center",
  // backgroundColor: "blue",
};

///////////////////

const SearchPageUserApp = () => {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
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

  let [searchParams] = useSearchParams();
  let page = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (
          genre === "Foods" ||
          genre === "Devices" ||
          genre === "Stationery" ||
          genre === "Others"
        ) {
          await getDataAllProducts(`${genre}&page=${page}&limit=8`);
        } else {
          await searchProductByName(`${genre}&page=${page}&limit=8`);
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

  const handleChangeFilter = (e, p) => {
    navigate(`/userPage/search/${genre}?page=${p}`);
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

            <Grid style={stackStyle}>
              <Pagination
                count={Math.ceil(dataAllProducts.data.total / 8 || 1)}
                color="primary"
                onChange={handleChangeFilter}
                page={page}
                sx={{
                  "& button": {
                    color: darkMode ? "white" : "black",
                  },
                  "& button:hover": {
                    transition: "0.3s",
                    backgroundColor: red[100],
                    color: "green",
                  },
                }}
              />
            </Grid>
          </div>
        </div>
      </div>
    );
  }
};

export default SearchPageUserApp;
