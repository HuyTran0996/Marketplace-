import React, { useContext } from "react";

import "./home.scss";
import { PageContext } from "../../context/PageContext";

import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/NavBar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const HomePage = () => {
  const { state, dispatch, getData } = useContext(PageContext);
  const { dataAllUsers } = state;
  if (!dataAllUsers) {
    getData();
    console.log("chưa có dataAllUsers");
    return (
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="widgets">loading....</div>

          <div className="listContainer">
            <div className="listTitle">Latest Transactions</div>
            Loading....
          </div>
        </div>
      </div>
    );
  } else {
    let totalUsers = dataAllUsers.data.totalUsers;
    let totalOrders = null;
    let totalStores = null;
    return (
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="widgets">
            <Widget type="user" totalNumber={totalUsers} />
            <Widget type="order" totalNumber={totalOrders} />
            <Widget type="store" totalNumber={totalStores} />
          </div>

          {/* <div className="charts">
            <Featured />
            <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
          </div> */}

          <div className="listContainer">
            <div className="listTitle">Latest Transactions</div>
            <Table />
          </div>
        </div>
      </div>
    );
  }
};

export default HomePage;
