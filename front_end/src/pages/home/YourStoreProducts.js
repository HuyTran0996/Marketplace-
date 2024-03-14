import React, { useContext, useEffect, useState } from "react";
import {
  useLocation,
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import "./yourStoreProducts.scss";
import { DarkModeContext } from "../../context/darkModeContext";
import { PageContext } from "../../context/PageContext";
import SidebarUser from "../../components/sidebar/SideBarUser";
import NavbarUserApp from "../../components/navbar/NavbarUserApp";
import ProductCardOfStoreOwner from "../../components/productCard/ProductCardOfStoreOwner";
import Widget from "../../components/widget/Widget";

import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import { red } from "@mui/material/colors";

const YourStoreProducts = () => {
  const { darkMode } = useContext(DarkModeContext);
  const location = useLocation();
  // const { genre } = useParams();
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  let page = parseInt(searchParams.get("page")) || 1;
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

  ///////////STYLES//////////////

  const stackStyle = {
    marginTop: "15px",
    marginBottom: "25px",
    display: "flex",
    alignItems: "center",
  };

  ///////////////////

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        let result;
        if (!dataUser) {
          const user = await getMyInfo();
          result = await getDataAllStoreByOwnerEmail(user.data.user.email);
        } else {
          result = await getDataAllStoreByOwnerEmail(dataUser.data.user.email);
        }

        if (result?.data?.totalStores === 0) {
          setFoundNoStore(true);
          setIsLoading(false);
          navigate("/userPage/stores");
          return;
        }

        await getDataAllProductsOfAStore(
          `${result.data.stores._id}&page=${page}&limit=8`
        );

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
        setError(true);
      }
    };
    fetchData();
  }, [location]);

  const handleAddProduct = (e) => {
    e.preventDefault();
    navigate("/userPage/stores/yourStoreProducts/createProduct");
  };

  const handleChangeFilter = (e, p) => {
    navigate(`/userPage/stores/yourStoreProducts?page=${p}`);
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
        <div className="sideBar">
          <SidebarUser />
        </div>
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

export default YourStoreProducts;
