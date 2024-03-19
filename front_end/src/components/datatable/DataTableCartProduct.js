import { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { usePage } from "../usePage";
import avatar from "../../images/avatar.png";
import { PageContext } from "../../context/PageContext";
import { FetchCreateOrder, FetchUpdateOrder } from "../../data/FetchOrdersData";
import { FetchCreateOrderProduct } from "../../data/FetchOrdersProductData";
import { DeleteProduct } from "../../data/FetchProductsData";

import "./dataTableCartProduct.scss";
import { DataGrid } from "@mui/x-data-grid";

const DataTableCartProduct = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState("");
  const [orderId, setOrderID] = useState(null);
  const [error, setError] = useState(false);
  const { state, dispatch } = useContext(PageContext);
  const { dataCart } = state;
  const { isProductPage } = usePage();
  let dataOriginal = [];
  let userColumns = [];
  let actionColumn = [];

  useEffect(() => {
    const createOrder = async () => {
      try {
        setError(false);
        setIsLoading(true);
        let result = await FetchCreateOrder();
        let orderID1 = result.data.order[0]._id;
        setOrderID(orderID1);

        setIsLoading(false);
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
    };

    createOrder();
  }, [location]);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleRemoveFromCart = async (id) => {
    let remove = dataCart.filter((cart) => cart._id !== id);

    dispatch({
      type: "SET_DATA_CART",
      payload: remove,
    });
    localStorage.setItem("favorite", JSON.stringify(remove));
  };

  const handleIncreaseQuantity = (itemId) => {
    const updatedCart = dataCart.map((item) =>
      item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    dispatch({
      type: "SET_DATA_CART",
      payload: updatedCart,
    });
    localStorage.setItem("favorite", JSON.stringify(updatedCart));
  };

  const handleDecreaseQuantity = (itemId) => {
    const updatedCart = dataCart.map((item) =>
      item._id === itemId
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    );
    dispatch({
      type: "SET_DATA_CART",
      payload: updatedCart,
    });
    localStorage.setItem("favorite", JSON.stringify(updatedCart));
  };

  const calculateTotalPrice = () => {
    // Ensure dataCart is always an array to safely use reduce
    const cart = Array.isArray(dataCart) ? dataCart : [];
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const handleSendOrder = async (e, orderId) => {
    e.preventDefault();
    if (!address) {
      toast.error("Please fill in the address.");
      return;
    }
    if (!orderId) {
      toast.error("System Error, please contact to admin");
      return;
    }
    if (!dataCart) {
      toast.error("Your Cart Is Empty.");
      return;
    }

    try {
      setError(false);
      setIsLoading(true);

      const promises = dataCart.map(async (item) => {
        const data = { productID: item._id, quantity: item.quantity };
        await FetchCreateOrderProduct(data);
      });

      await Promise.all(promises);

      const data2 = {
        orderStatus: "sentOrderToStore",
        deliverTo: address,
      };

      await FetchUpdateOrder({ orderId, data: data2 });

      let result = await FetchCreateOrder();
      let orderID1 = result.data.order[0]._id;
      setOrderID(orderID1);
      dispatch({
        type: "SET_DATA_CART",
        payload: null,
      });

      localStorage.removeItem("favorite");
      setAddress("");
      setIsLoading(false);
      toast.success("Order has been sent successfully");
    } catch (error) {
      toast.error("System Error...");
      setIsLoading(false);
      setError(true);
    }
  };

  const totalPrice = calculateTotalPrice();

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
        width: 190,
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
        width: 60,
      },
    ];

    actionColumn = [
      {
        field: "quantity",
        headerName: "Quantity",
        width: 75,
        renderCell: (params) => (
          <div className="quantity">
            <button onClick={() => handleDecreaseQuantity(params.row._id)}>
              -
            </button>
            <div>{params.row.quantity}</div>
            <button onClick={() => handleIncreaseQuantity(params.row._id)}>
              +
            </button>
          </div>
        ),
      },

      {
        field: "Total",
        headerName: "Total",
        width: 90,
        renderCell: (params) => {
          return (
            <div>
              {(params.row.quantity * params.row.price).toLocaleString()}
            </div>
          );
        },
      },

      {
        field: "action",
        headerName: "ACTION",
        width: 150,
        renderCell: (params) => {
          return (
            <div className="cellAction">
              <Link
                to={`/userPage/detail/${params.row.id}`}
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

  return (
    <div className="datatable">
      <div className="dataGrid">
        <DataGrid
          rows={data}
          columns={userColumns.concat(actionColumn)}
          className="datagrid"
          autoHeight
          hideFooterPagination
        />
      </div>

      <div className="formInput" key="1">
        <label>Deliver To</label>
        <input
          type="text"
          placeholder="Deliver To:......."
          value={address}
          onChange={handleAddressChange}
        />
      </div>
      <div className="totalPrice">
        <div>Total Price: {totalPrice.toLocaleString()} </div>
      </div>
      <button
        className="sendOrder"
        onClick={(e) => handleSendOrder(e, orderId)}
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Send Order"}
      </button>
    </div>
  );
};

export default DataTableCartProduct;
