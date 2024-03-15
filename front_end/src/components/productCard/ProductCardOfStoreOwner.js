import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./productCard.scss";
import { PageContext } from "../../context/PageContext";
import { DeleteProduct } from "../../data/FetchProductsData";
import { showToast } from "../ToastMessage";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import HandymanIcon from "@mui/icons-material/Handyman";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function ProductCardOfStoreOwner({ product }) {
  const { state, dispatch, getDataAllProductsOfAStore } =
    useContext(PageContext);
  const { dataCart } = state;
  const navigate = useNavigate();

  const handleSeeDetail = () => {
    navigate(`/userPage/detail/${product._id}`);
  };

  const editProduct = async () => {
    navigate(`/userPage/stores/yourStoreProducts/edit/${product._id}`);
  };

  const deleteProduct = async () => {
    try {
      await DeleteProduct(product._id);
      await getDataAllProductsOfAStore(product.storeID);
      showToast("Your product has been deleted!", "success");
    } catch (error) {
      console.log(error);
    }
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
          Price: {product.price.toLocaleString()}/{product.unit}
        </Typography>
      </CardContent>

      <CardActions className="cardActions">
        <button onClick={handleSeeDetail}>Detail</button>

        <button onClick={editProduct}>
          <HandymanIcon />
        </button>
        <button onClick={deleteProduct}>
          <DeleteForeverIcon />
        </button>
      </CardActions>
    </div>
  );
}
