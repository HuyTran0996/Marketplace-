import { useState, useContext, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { FetchAllOrdersProductOfAOrder } from "../../data/FetchOrdersProductData";
import { PageContext } from "../../context/PageContext";

import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";

const DataTableOrderDetailOfStoreAdminApp = () => {
  const { orderId } = useParams();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [listProducts, setListProducts] = useState([]);

  const { state } = useContext(PageContext);
  const { dataSingle, dataUser } = state;

  let dataOriginal = [];
  let userColumns = [];
  let actionColumn = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(false);
        setIsLoading(true);

        let result1 = await FetchAllOrdersProductOfAOrder(orderId);

        setListProducts(result1.data.orderProducts);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
        setError(true);
      }
    };
    fetchData();
  }, [location]);

  const calculateTotalPrice = () => {
    // Ensure dataCart is always an array to safely use reduce
    const cart = Array.isArray(listProducts) ? listProducts : [];
    // Filter out products with status 'canceledByStore'
    const filteredCart = cart.filter(
      (item) => item.orderProductStatus !== "canceledByStore"
    );
    // Calculate the total price excluding canceled products
    return filteredCart.reduce(
      (total, item) => total + item.quantity * item.productPrice,
      0
    );
  };

  const totalPrice = calculateTotalPrice();

  if (isLoading) {
    userColumns = [{ field: "id", headerName: " Loading...", width: 240 }];
  } else if (error || !listProducts) {
    userColumns = [{ field: "id", headerName: " Error...", width: 240 }];
  } else if (listProducts.length === 0) {
    userColumns = [
      { field: "id", headerName: " Your Store Has No Orders...", width: 240 },
    ];
  } else {
    dataOriginal = listProducts;
    userColumns = [
      // { field: "id", headerName: "ID", width: 70 },
      { field: "orderID", headerName: "Order ID", width: 170 },
      { field: "productID", headerName: "pID", width: 70 },
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
          // Correctly reference the isDeleted field and convert the boolean to a string
          const status =
            params.row.orderProductStatus === "deliveredToApp"
              ? "active"
              : params.row.orderProductStatus === "canceledByStore"
              ? "passive"
              : "pending";
          return (
            <div className={`cellWithStatus ${status.toLowerCase()}`}>
              {params.row.orderProductStatus}
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
      {/* <DataGrid
        rows={data} //userRows
        columns={userColumns.concat(actionColumn)} //userColumns
        className="datagrid"
        // checkboxSelection
        // pageSize={9}
        // rowsPerPageOptions={[9]}
      /> */}

      <DataGrid
        rows={data}
        columns={userColumns.concat(actionColumn)}
        className="datagrid"
        autoHeight
        hideFooterPagination
      />

      <div className="totalPrice">
        <div>Total Price: {totalPrice.toLocaleString()}</div>
      </div>
    </div>
  );
};

export default DataTableOrderDetailOfStoreAdminApp;
