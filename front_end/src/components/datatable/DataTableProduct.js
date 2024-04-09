import { useState, useContext, useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { Paginate } from "../Pagination";

import { usePage } from "../usePage";
import avatar from "../../images/avatar.png";
import { PageContext } from "../../context/PageContext";

import { DeleteProduct } from "../../data/FetchProductsData";

import "./dataTableProduct.scss";
import { DataGrid } from "@mui/x-data-grid";

const DataTableProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { state, getDataAllProducts, getDataProductsUsePageAndLimit } =
    useContext(PageContext);
  const { dataAllProducts } = state;
  const { isProductPage } = usePage();
  let dataOriginal = [];
  let userColumns = [];
  let actionColumn = [];

  let [searchParams] = useSearchParams();
  let page = parseInt(searchParams.get("page")) || 1;
  const limit = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await getDataProductsUsePageAndLimit(page, limit);
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
    userColumns = [{ field: "id", headerName: "Loading Data...", width: 240 }];
  }

  if (isProductPage && !isLoading) {
    if (error || !dataAllProducts) {
      userColumns = [{ field: "id", headerName: " Error...", width: 240 }];
    } else {
      dataOriginal = dataAllProducts.data.products;
      userColumns = [
        { field: "id", headerName: "ID", width: 240 },
        {
          field: "storeName",
          headerName: "Store",
          width: 100,
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
          width: 290,
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

                <Link
                  to={{
                    pathname: `/adminPage/products/reviews/${params.row.id}`,
                    search: `?product=${params.row.productName}&store=${params.row.storeName}`,
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <div className="pending">See reviews</div>
                </Link>
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
      await getDataProductsUsePageAndLimit(page, limit);
    }
  };

  return (
    <div className="datatable">
      <div className="dataGrid">
        <DataGrid
          rows={data}
          columns={userColumns.concat(actionColumn)}
          className="datagrid"
          disableRowSelectionOnClick
          hideFooterPagination
        />
      </div>

      {Paginate(dataAllProducts, "/adminPage/products", limit)}
    </div>
  );
};

export default DataTableProduct;
