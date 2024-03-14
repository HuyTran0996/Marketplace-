import React, { useContext, useEffect } from "react";

import "./homeAdmin.scss";

import { PageContext } from "../../context/PageContext";

import Sidebar from "../../components/sidebar/SideBar";
// import Navbar from "../../components/navbar/NavBar";
import Widget from "../../components/widget/Widget";

const HomePage = () => {
  const { state, dispatch, getData } = useContext(PageContext);
  const { dataAllUsers, dataAllOrders, dataAllStores, error, isLoading } =
    state;

  useEffect(() => {
    const fetch = async () => {
      try {
        dispatch({
          type: "SET_LOADING",
          payload: true,
        });
        await getData();
        dispatch({
          type: "SET_LOADING",
          payload: false,
        });
      } catch (error) {
        dispatch({
          type: "SET_LOADING",
          payload: false,
        });
        dispatch({
          type: "SET_ERROR",
          payload: true,
        });
        console.error("Error fetching data:", error);
      }
    };
    if (!dataAllUsers) {
      fetch();
    }
  }, [dataAllUsers, fetch]);

  if (isLoading) {
    return (
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <div className="widgets">loading....</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <div className="widgets">ERROR....</div>
        </div>
      </div>
    );
  } else {
    let totalUsers = dataAllUsers?.data?.totalUsers;
    let totalOrders = dataAllOrders?.data?.totalOrders;
    let totalStores = dataAllStores?.data?.totalStores;

    return (
      <div className="homeAdmin">
        <div className="sideBarAdmin">
          <Sidebar />
        </div>
        <div className="homeContainerAdmin">
          <Widget type="user" totalNumber={totalUsers} />
          <Widget type="order" totalNumber={totalOrders} />
          <Widget type="store" totalNumber={totalStores} />
        </div>
      </div>
    );
  }
};

export default HomePage;
