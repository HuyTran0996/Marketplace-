import { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { usePage } from "../usePage";
import avatar from "../../images/avatar.png";
import { PageContext } from "../../context/PageContext";
import { DeleteProduct } from "../../data/FetchProductsData";

import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";

const DataTableProduct = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { state, getDataAllProducts } = useContext(PageContext);
  const { dataAllProducts } = state;
  const { isProductPage } = usePage();
  let dataOriginal = [];
  let userColumns = [];
  let actionColumn = [];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await getDataAllProducts();
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isProductPage]);

  if (isLoading) {
    userColumns = [
      { field: "id", headerName: " Loading...", width: 240 },
      {
        field: "user",
        headerName: " Loading...",
        width: 120,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              <img className="cellImg" src={avatar} alt="avatar" />
              Loading...
            </div>
          );
        },
      },

      {
        field: "email",
        headerName: " Loading...",
        width: 150,
      },

      {
        field: "phone",
        headerName: " Loading...",
        width: 100,
      },

      {
        field: "role",
        headerName: " Loading...",
        width: 100,
      },

      {
        field: "isDeleted",
        headerName: " Loading...",
        width: 90,
        renderCell: (params) => {
          const status = params.row.isDeleted ? "Deleted" : "Active";
          return (
            <div className={`cellWithStatus ${status.toLowerCase()}`}>
              Loading...
            </div>
          );
        },
      },
    ];
    actionColumn = [
      {
        field: "action",
        headerName: "ACTION",
        width: 200,
        renderCell: () => {
          return (
            <div className="cellAction">
              <Link style={{ textDecoration: "none" }}>
                <div className="editButton"> Loading...</div>
              </Link>
              <div className="deleteButton">Loading...</div>
            </div>
          );
        },
      },
    ];
  }

  if (isProductPage && !isLoading) {
    dataOriginal = dataAllProducts.data.products;
    userColumns = [
      { field: "id", headerName: "ID", width: 240 },
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
        width: 100,
      },
      {
        field: "description",
        headerName: "Description",
        width: 350,
      },
      {
        field: "price",
        headerName: "Price",
        width: 110,
      },
      {
        field: "unit",
        headerName: "Unit",
        width: 110,
      },
    ];
    actionColumn = [
      {
        field: "action",
        headerName: "ACTION",
        width: 350,
        renderCell: (params) => {
          return (
            <div className="cellAction">
              <Link
                to={`/products/edit/${params.row.id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="editButton">View & Edit</div>
              </Link>

              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row.id)}
              >
                Delete
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

  const handleDelete = async (id) => {
    if (isProductPage) {
      await DeleteProduct(id);
      await getDataAllProducts();
    }
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

export default DataTableProduct;
