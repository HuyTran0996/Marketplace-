import React, { useContext } from "react";

import "./home.scss";
import { PageContext } from "../../context/PageContext";

import SidebarUser from "../../components/sidebar/SideBarUser";
import NavbarUserApp from "../../components/navbar/NavbarUserApp";
import Widget from "../../components/widget/Widget";

const HomePageUser = () => {
  const { state, dispatch, getData } = useContext(PageContext);
  const { dataAllUsers, dataAllOrders, dataAllStores } = state;
  if (!dataAllUsers) {
    getData();

    return (
      <div className="home">
        <SidebarUser />
        <div className="homeContainer">
          {/* <Navbar /> */}
          <div className="widgets">loading....</div>

          <div className="listContainer">
            <div className="listTitle">Latest Transactions</div>
            Loading....
          </div>
        </div>
      </div>
    );
  } else {
    let totalUsers = dataAllUsers?.data?.totalUsers;
    let totalOrders = dataAllOrders?.data?.totalOrders;
    let totalStores = dataAllStores?.data?.totalStores;

    return (
      <div className="home">
        <SidebarUser />
        <div className="homeContainer">
          <NavbarUserApp />
          <div className="widgets">
            {/* <Widget type="user" totalNumber={totalUsers} /> */}
            {/* <Widget type="order" totalNumber={totalOrders} /> */}
            {/* <Widget type="store" totalNumber={totalStores} /> */}
          </div>
        </div>
      </div>
    );
  }
};

export default HomePageUser;
