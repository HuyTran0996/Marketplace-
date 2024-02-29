import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import "./datatable.scss";
import avatar from "../../images/avatar.png";
import { PageContext } from "../../context/PageContext";
import { AdminDeleteUser } from "../../data/FetchUsersData";

import { DataGrid } from "@mui/x-data-grid";

const Datatable = () => {
  const { state, dispatch, getData } = useContext(PageContext);
  const { dataAllUsers, dataAllOrders, dataAllStores } = state;

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };

    if (!dataAllUsers) {
      fetchData();
    }
  }, [dataAllUsers, getData]);

  const dataOriginal = dataAllUsers ? dataAllUsers.data.users : [];
  const data = dataOriginal.map((user) => {
    return {
      ...user,
      id: user._id,
    };
  });

  const handleDelete = async (id) => {
    await AdminDeleteUser(id);
    getData();
  };

  const userColumns = [
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
      headerName: "Status",
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

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/users/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>

            <Link
              to={`/users/edit/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="editButton">Edit</div>
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
