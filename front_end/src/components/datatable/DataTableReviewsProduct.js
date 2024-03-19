import { useState, useContext, useEffect } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

import { Paginate } from "../Pagination";
import { usePage } from "../usePage";
import { PageContext } from "../../context/PageContext";

import {
  FetchAdminDeleteReview,
  FetchAdminActivateReview,
} from "../../data/FetchReviewData";

import "./dataTableProduct.scss";
import { DataGrid } from "@mui/x-data-grid";

const DataTableReviewsProduct = () => {
  const { productId } = useParams();

  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(false);
  const { state, getReviewsOfThisForAdmin } = useContext(PageContext);
  const { reviewsOfThisProduct } = state;

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
        await getReviewsOfThisForAdmin(productId, page, limit);

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
    if (error || !reviewsOfThisProduct) {
      userColumns = [{ field: "id", headerName: " Error...", width: 240 }];
    } else {
      dataOriginal = reviewsOfThisProduct?.data?.reviews;

      userColumns = [
        {
          field: "reviewerID",
          headerName: "Reviewer ID",
          width: 250,
        },
        {
          field: "reviewerName",
          headerName: "Reviewer",
          width: 130,
        },

        {
          field: "userReview",
          headerName: "Review",
          width: 520,
        },

        {
          field: "isDeleted",
          headerName: "Review Status",
          width: 120,
          renderCell: (params) => {
            // Correctly reference the isDeleted field and convert the boolean to a string
            const status = params.row.isDeleted ? "Passive" : "Active";
            return (
              <div className={`cellWithStatus ${status.toLowerCase()}`}>
                {status}
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
          renderCell: (params) => {
            return (
              <div className="cellAction">
                {!params.row.isDeleted ? (
                  <div
                    className="deleteButton"
                    onClick={() => handleDelete(params.row.id)}
                  >
                    Delete
                  </div>
                ) : (
                  <div
                    className="editButton"
                    onClick={() => handleActivate(params.row.id)}
                  >
                    activate
                  </div>
                )}
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
      await FetchAdminDeleteReview(id);
      await getReviewsOfThisForAdmin(productId, page, limit);
    }
  };
  const handleActivate = async (id) => {
    if (isProductPage) {
      await FetchAdminActivateReview(id);
      await getReviewsOfThisForAdmin(productId, page, limit);
    }
  };

  return (
    <div className="datatable">
      {reviewsOfThisProduct?.data?.reviews[0]?.productName ? (
        <div>{`Reviews of product: ${reviewsOfThisProduct?.data?.reviews[0]?.productName}`}</div>
      ) : (
        <div>This product not yet has reviews</div>
      )}
      <div>{`Product ID: ${productId}`}</div>
      <div className="dataGrid">
        <DataGrid
          rows={data}
          columns={userColumns.concat(actionColumn)}
          className="datagrid"
          disableRowSelectionOnClick
          hideFooterPagination
        />
      </div>

      {Paginate(
        reviewsOfThisProduct,
        `/adminPage/products/reviews/${productId}`,
        limit
      )}
    </div>
  );
};

export default DataTableReviewsProduct;
