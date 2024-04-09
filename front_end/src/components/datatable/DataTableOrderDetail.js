import { useState, useContext, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { FetchAllOrdersProduct } from "../../data/FetchOrdersProductData";

import "./dataTableOrderDetail.scss";
import { DataGrid } from "@mui/x-data-grid";

const DataTableOrderDetail = () => {
  const { orderID } = useParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [listProducts, setListProducts] = useState([]);

  let dataOriginal = [];
  let userColumns = [];
  let actionColumn = [];

  useEffect(() => {
    const createOrder = async () => {
      try {
        setError(false);
        setIsLoading(true);
        let result = await FetchAllOrdersProduct(orderID);

        setListProducts(result.data.orderProducts);

        setIsLoading(false);
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
    };

    createOrder();
  }, [location]);

  const calculateTotalPrice = () => {
    // Ensure dataCart is always an array to safely use reduce
    const cart = Array.isArray(listProducts) ? listProducts : [];
    return cart.reduce(
      (total, item) => total + item.quantity * item.productPrice,
      0
    );
  };

  const totalPrice = calculateTotalPrice();
  const STATUS = {
    DELIVERED_TO_APP: "deliveredToApp",
    CANCELED_BY_STORE: "canceledByStore",
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case STATUS.DELIVERED_TO_APP:
        return "Delivered To App";
      case STATUS.CANCELED_BY_STORE:
        return "Canceled By Store";
      default:
        return "Sent Order To Store";
    }
  };

  if (isLoading) {
    userColumns = [{ field: "id", headerName: "Loading Data...", width: 240 }];
  } else if (error || !listProducts || listProducts.length === 0) {
    userColumns = [{ field: "id", headerName: " Error...", width: 240 }];
  } else {
    dataOriginal = listProducts;
    userColumns = [
      { field: "orderID", headerName: "ORDER ID", width: 250 },
      {
        field: "storeName",
        headerName: "Store",
        width: 150,

        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.storeName}</div>;
        },
      },
      {
        field: "productName",
        headerName: "Product",
        width: 190,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.productName}</div>;
        },
      },
      {
        field: "productPrice",
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
            <div>{params.row.quantity.toLocaleString()}</div>
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
              {(params.row.quantity * params.row.productPrice).toLocaleString()}
            </div>
          );
        },
      },

      {
        field: "orderProductStatus",
        headerName: "Order Status",
        width: 190,

        renderCell: (params) => {
          const { orderProductStatus } = params.row;
          const statusClass =
            orderProductStatus === STATUS.DELIVERED_TO_APP
              ? "active"
              : orderProductStatus === STATUS.CANCELED_BY_STORE
              ? "passive"
              : "pending";
          const statusLabel = getStatusLabel(orderProductStatus);
          return (
            <div className={`cellWithStatus ${statusClass}`}>{statusLabel}</div>
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
          disableRowSelectionOnClick
        />
      </div>
      <div className="totalPrice">
        <div>Total Price: {totalPrice.toLocaleString()} </div>
      </div>
    </div>
  );
};

export default DataTableOrderDetail;
