import { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { usePage } from "../usePage";
import avatar from "../../images/avatar.png";
import { PageContext } from "../../context/PageContext";
import { DeleteProduct } from "../../data/FetchProductsData";

import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";

const DataTableCartProduct = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(false);
  const { state, dispatch } = useContext(PageContext);
  const { dataCart } = state;
  const { isProductPage } = usePage();
  let dataOriginal = [];
  let userColumns = [];
  let actionColumn = [];

  const handleQuantityChange = (productId, change) => {
    // Find the product in the cart
    const productIndex = dataCart.findIndex((item) => item._id === productId);
    if (productIndex === -1) return; // Product not found, do nothing

    // Update the quantity of the product
    const updatedProduct = {
      ...dataCart[productIndex],
      quantity: dataCart[productIndex].quantity + change,
    };

    // Update the cart state
    const updatedCart = [...dataCart];
    updatedCart[productIndex] = updatedProduct;

    // Dispatch the updated cart to the context
    dispatch({
      type: "SET_DATA_CART",
      payload: updatedCart,
    });

    // Optionally, update localStorage if you're using it to persist cart data
    localStorage.setItem("favorite", JSON.stringify(updatedCart));
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setIsLoading(true);
  //       // await getDataAllProducts();
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setError(true);
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [location]);

  if (!dataCart || dataCart.length === 0) {
    userColumns = [
      { field: "id", headerName: " Your Cart Is Empty...", width: 240 },
    ];
  } else if (error) {
    userColumns = [{ field: "id", headerName: " Error...", width: 240 }];
  } else {
    dataOriginal = dataCart;
    userColumns = [
      { field: "id", headerName: "ID", width: 70 },
      {
        field: "storeName",
        headerName: "Store",
        width: 100,

        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.storeName}</div>;
        },
      },
      {
        field: "productName",
        headerName: "Product",
        width: 150,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              <img
                className="cellImg"
                src={params.row.photo ? params.row.photo : avatar}
                alt="avatar"
              />
              {params.row.productName}
            </div>
          );
        },
      },
      {
        field: "price",
        headerName: "Price",
        width: 80,
      },
      {
        field: "unit",
        headerName: "Unit",
        width: 50,
      },
      {
        field: "description",
        headerName: "Description",
        width: 200,
      },
      {
        field: "quantity",
        headerName: "Quantity",
        width: 150,
        renderCell: (params) => (
          <div>
            <button onClick={() => handleQuantityChange(params.row.id, -1)}>
              -
            </button>
            <span>{params.row.quantity || 0}</span>
            <button onClick={() => handleQuantityChange(params.row.id, 1)}>
              +
            </button>
          </div>
        ),
      },
    ];
    actionColumn = [
      {
        field: "action",
        headerName: "ACTION",
        width: 150,
        renderCell: (params) => {
          return (
            <div className="cellAction">
              <Link
                to={`/products/edit/${params.row.id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="editButton">See Detail</div>
              </Link>

              <div
                className="deleteButton"
                onClick={() => handleRemoveFromCart(params.row.id)}
              >
                X
              </div>
            </div>
          );
        },
      },
    ];
  }

  const data = dataOriginal.map((user) => {
    return {
      ...user,
      id: user._id,
    };
  });

  const handleRemoveFromCart = async (id) => {
    let remove = dataCart.filter((cart) => cart._id !== id);

    dispatch({
      type: "SET_DATA_CART",
      payload: remove,
    });
    localStorage.setItem("favorite", JSON.stringify(remove));
  };

  return (
    <div className="datatable">
      <DataGrid
        rows={data} //userRows
        columns={userColumns.concat(actionColumn)} //userColumns
        className="datagrid"
        // checkboxSelection
        // pageSize={9}
        // rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default DataTableCartProduct;
