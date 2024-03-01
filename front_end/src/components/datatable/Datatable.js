import { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import "./datatable.scss";
import avatar from "../../images/avatar.png";
import { PageContext } from "../../context/PageContext";
import { AdminDeleteUser } from "../../data/FetchUsersData";
import { DeleteStore } from "../../data/FetchStoresData";
import { DeleteOrder } from "../../data/FetchOrdersData";

import { DataGrid } from "@mui/x-data-grid";

const Datatable = () => {
  const { state, dispatch, getData } = useContext(PageContext);
  const { dataAllUsers, dataAllOrders, dataAllStores } = state;
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };

    fetchData();
  }, [location]);

  let dataOriginal = [];
  let userColumns = [
    { field: "id", headerName: "ID", width: 240 },

    {
      field: "user",
      headerName: "User",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img
              className="cellImg"
              src={params.row.photo ? params.row.photo : avatar}
              alt="avatar"
            />
            {params.row.name}
          </div>
        );
      },
    },

    {
      field: "email",
      headerName: "Email",
      width: 150,
    },

    {
      field: "phone",
      headerName: "Phone",
      width: 100,
    },

    {
      field: "role",
      headerName: "Role",
      width: 100,
    },

    {
      field: "isDeleted",
      headerName: "STATUS",
      width: 90,
      renderCell: (params) => {
        // Correctly reference the isDeleted field and convert the boolean to a string
        const status = params.row.isDeleted ? "Deleted" : "Active";
        return (
          <div className={`cellWithStatus ${status.toLowerCase()}`}>
            {status}
          </div>
        );
      },
    },
  ];
  let actionColumn = [
    {
      field: "action",
      headerName: "ACTION",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link
              to={`/users/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link> */}

            <Link
              to={`/users/edit/${params.row.id}`}
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

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  if (currentUrl.includes("users")) {
    dataOriginal = dataAllUsers ? dataAllUsers.data.users : [];
    userColumns = [
      { field: "id", headerName: "ID", width: 240 },

      {
        field: "user",
        headerName: "User",
        width: 120,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              <img
                className="cellImg"
                src={params.row.photo ? params.row.photo : avatar}
                alt="avatar"
              />
              {params.row.name}
            </div>
          );
        },
      },

      {
        field: "email",
        headerName: "Email",
        width: 150,
      },

      {
        field: "phone",
        headerName: "Phone",
        width: 100,
      },

      {
        field: "role",
        headerName: "Role",
        width: 100,
      },

      {
        field: "isDeleted",
        headerName: "STATUS",
        width: 90,
        renderCell: (params) => {
          // Correctly reference the isDeleted field and convert the boolean to a string
          const status = params.row.isDeleted ? "Deleted" : "Active";
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
              <Link
                to={`/users/edit/${params.row.id}`}
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
  } else if (currentUrl.includes("stores")) {
    dataOriginal = dataAllStores ? dataAllStores.data.stores : [];
    userColumns = [
      { field: "id", headerName: "ID", width: 240 },

      {
        field: "storeName",
        headerName: "Store Name",
        width: 150,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              <img
                className="cellImg"
                src={params.row.photo ? params.row.photo : avatar}
                alt="avatar"
              />
              {params.row.storeName}
            </div>
          );
        },
      },

      {
        field: "ownerEmail",
        headerName: "Owner Email",
        width: 150,
      },

      {
        field: "address",
        headerName: "Address",
        width: 200,
      },

      {
        field: "isDeleted",
        headerName: "STATUS",
        width: 110,
        renderCell: (params) => {
          // Correctly reference the isDeleted field and convert the boolean to a string
          const status = params.row.isDeleted ? "Deleted" : "Active";
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
              <Link
                to={`/stores/edit/${params.row.id}`}
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
  } else if (currentUrl.includes("orders")) {
    dataOriginal = dataAllOrders ? dataAllOrders.data.orders : [];
    userColumns = [
      { field: "id", headerName: "ID", width: 240 },

      {
        field: "customerName",
        headerName: "Buyer",
        width: 100,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.customerName}</div>;
        },
      },
      {
        field: "deliverTo",
        headerName: "Deliver To",
        width: 200,
      },
      {
        field: "orderStatus",
        headerName: "STATUS",
        width: 110,
        renderCell: (params) => {
          // Correctly reference the isDeleted field and convert the boolean to a string
          const status = params.row.orderStatus ? "Active" : "Deleted";
          return (
            <div className={`cellWithStatus ${status.toLowerCase()}`}>
              {params.row.orderStatus}
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
              <Link
                to={`/orders/edit/${params.row.id}`}
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
    if (currentUrl.includes("users")) {
      await AdminDeleteUser(id);
    }
    if (currentUrl.includes("stores")) {
      await DeleteStore(id);
    }
    if (currentUrl.includes("orders")) {
      await DeleteOrder(id);
    }
    await getData();
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

export default Datatable;
