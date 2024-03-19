import { useState, useContext, useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import { red } from "@mui/material/colors";

import { DarkModeContext } from "../context/darkModeContext";
const stackStyle = {
  marginTop: "15px",
  marginBottom: "25px",
  display: "flex",
  alignItems: "center",
  // backgroundColor: "blue",
};
export const Paginate = (data, link, limit) => {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  let page = parseInt(searchParams.get("page")) || 1;

  const handleChangeFilter = (e, p) => {
    navigate(`${link}?page=${p}`);
  };

  return (
    <Grid style={stackStyle}>
      <Pagination
        count={Math.ceil(data?.data.total / limit || 1)}
        color="primary"
        onChange={handleChangeFilter}
        page={page}
        sx={{
          "& button": {
            color: darkMode ? "white" : "black",
          },
          "& button:hover": {
            transition: "0.3s",
            backgroundColor: red[100],
            color: "green",
          },
        }}
      />
    </Grid>
  );
};
