import { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { usePage } from "../usePage";
import avatar from "../../images/avatar.png";
import { PageContext } from "../../context/PageContext";
import { DeleteProduct } from "../../data/FetchProductsData";

import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";

const DataTableProduct = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { state, getDataAllProducts } = useContext(PageContext);
  const { dataAllProducts } = state;
  const { isProductPage } = usePage();
  let dataOriginal = [];
  let userColumns = [];
  let actionColumn = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await getDataAllProducts();
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [location]);

  if (isLoading) {
    userColumns = [{ field: "id", headerName: " Loading...", width: 240 }];
  }

  if (isProductPage && !isLoading) {
    if (error) {
      userColumns = [{ field: "id", headerName: " Error...", width: 240 }];
    } else {
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
          field: "description",
          headerName: "Description",
          width: 200,
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
                  to={`/adminPage/products/edit/${params.row.id}`}
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
    </div>
  );
};

export default DataTableProduct;
