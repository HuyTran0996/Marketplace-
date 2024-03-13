import React, { useContext, useState, useEffect } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import SidebarUser from "../../components/sidebar/SideBarUser";
import NavbarUserApp from "../../components/navbar/NavbarUserApp";
import ProductCard from "../../components/productCard/ProductCard";
import { PageContext } from "../../context/PageContext";

import "./genre.scss";

import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
///////////STYLES//////////////

const cardStyle = {
  marginBottom: "20px",
};
const gridStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  marginTop: "15px",
  height: "260px",
};

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 7,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};
///////////////////

function GenrePage() {
  const { state, getDataOfThreeGenres, getDataAllProducts } =
    useContext(PageContext);
  const {
    dataPopularFoods,
    dataPopularDevices,
    dataPopularStationery,
    dataAllProducts,
  } = state;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await getDataOfThreeGenres();
        await getDataAllProducts();
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(true);
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
  if (
    dataPopularFoods &&
    dataPopularDevices &&
    dataPopularStationery &&
    dataAllProducts
  ) {
    let dataPopularFoods1 = dataPopularFoods?.data?.products;
    let dataPopularDevices1 = dataPopularDevices?.data?.products;
    let dataPopularStationery1 = dataPopularStationery?.data?.products;
    let dataAllProducts1 = dataAllProducts?.data?.products;

    return (
      <div className="home">
        <div className="left">
          <SidebarUser />
        </div>

        <div className="right">
          <NavbarUserApp />

          <Container>
            <Container style={cardStyle}>
              <div className="movieStyle">Popular Foods</div>
              <Carousel
                className="carousel"
                responsive={responsive}
                transitionDuration={300}
                infinite={true}
                ssr={true}
              >
                {dataPopularFoods1?.map((product) => {
                  return (
                    <Grid
                      style={gridStyle}
                      key={product._id}
                      item
                      xs={12}
                      lg={4}
                    >
                      <ProductCard product={product} />
                    </Grid>
                  );
                })}
              </Carousel>
            </Container>

            <Container style={cardStyle}>
              <div className="movieStyle">Popular Devices</div>

              <Carousel
                className="carousel"
                responsive={responsive}
                transitionDuration={300}
                infinite={true}
                ssr={true}
              >
                {dataPopularDevices1?.map((product) => {
                  return (
                    <Grid
                      style={gridStyle}
                      key={product._id}
                      item
                      xs={12}
                      lg={4}
                    >
                      <ProductCard product={product} />
                    </Grid>
                  );
                })}
              </Carousel>
            </Container>

            <Container style={cardStyle}>
              <div className="movieStyle">Popular Stationery</div>

              <Carousel
                className="carousel"
                responsive={responsive}
                transitionDuration={300}
                infinite={true}
                ssr={true}
              >
                {dataPopularStationery1?.map((product) => {
                  return (
                    <Grid
                      style={gridStyle}
                      key={product._id}
                      item
                      xs={12}
                      lg={4}
                    >
                      <ProductCard product={product} />
                    </Grid>
                  );
                })}
              </Carousel>
            </Container>

            <Container style={cardStyle}>
              <div className="movieStyle">Products For You</div>
              <Grid container spacing={3}>
                {dataAllProducts1?.map((product) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={12 / 5}
                      key={product._id}
                    >
                      <ProductCard product={product} />
                    </Grid>
                  );
                })}
              </Grid>
            </Container>
          </Container>
        </div>
      </div>
    );
  }
}

export default GenrePage;
