import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./productCard.scss";
import { PageContext } from "../../context/PageContext";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function ProductCard({ product }) {
  const { state, dispatch } = useContext(PageContext);
  const { dataCart } = state;
  const navigate = useNavigate();

  const handleSeeDetail = () => {
    navigate(`/userPage/detail/${product._id}`);
  };

  const addToCart = async () => {
    const productInStorage = JSON.parse(localStorage.getItem("favorite"));
    const favoriteList = productInStorage ? productInStorage : [];
    let newFavorite = [...favoriteList];
    const isProductAlreadyInCart = newFavorite.find(
      (existingProduct) => existingProduct._id === product._id
    );
    if (!isProductAlreadyInCart) {
      newFavorite.push(product);
    }

    dispatch({
      type: "SET_DATA_CART",
      payload: newFavorite,
    });
    localStorage.setItem("favorite", JSON.stringify(newFavorite));
  };

  return (
    <div className="productCard">
      <CardMedia
        className="cardMedia"
        component="img"
        alt="poster"
        image={product.photo}
        onClick={handleSeeDetail}
      />

      <CardContent className="cardContent">
        <Typography gutterBottom variant="h6" component="div">
          {product.productName}
        </Typography>

        <Typography variant="body2">
          Price: {product.price}/{product.unit}
        </Typography>
      </CardContent>

      <CardActions className="cardActions">
        <button onClick={handleSeeDetail}>Detail</button>

        <button onClick={addToCart}>
          <ShoppingCartIcon />
        </button>
      </CardActions>
    </div>
  );
}
