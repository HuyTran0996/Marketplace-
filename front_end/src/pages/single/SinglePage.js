import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./single.scss";

import { FetchSingleUser } from "../../data/FetchUsersData";
import avatar from "../../images/avatar.png";

import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/NavBar";
import Chart from "../../components/chart/Chart";

const Loading = () => (
  <div className="single">
    <Sidebar />
    <div className="singleContainer">
      <Navbar />
      <div className="top">
        <div className="left">
          <div className="editButton">Edit</div>
          <h1 className="title">Information</h1>
          <div className="item">
            <img src={avatar} alt="avatar" className="itemImg" />
            <div className="details">
              <h1 className="itemTitle">loading...</h1>
              <div className="detailItem">
                <span className="itemKey">Email:</span>
                <span className="itemValue">loading...</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Phone:</span>
                <span className="itemValue">loading...</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">ID:</span>
                <span className="itemValue">loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const UserDetails = ({ userData }) => (
  <div className="single">
    <Sidebar />
    <div className="singleContainer">
      <Navbar />
      <div className="top">
        <div className="left">
          <div className="editButton">Edit</div>
          <h1 className="title">Information</h1>
          <div className="item">
            <img
              src={userData.data.user.photo || avatar}
              alt="avatar"
              className="itemImg"
            />
            <div className="details">
              <h1 className="itemTitle">{userData.data.user.name}</h1>
              <div className="detailItem">
                <span className="itemKey">Email:</span>
                <span className="itemValue">{userData.data.user.email}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Phone:</span>
                <span className="itemValue">{userData.data.user.phone}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">ID:</span>
                <span className="itemValue">{userData.data.user._id}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
        </div>
      </div>
      <div className="bottom">
        <h1 className="title">Last Transactions</h1>
        {/* <List /> */}
      </div>
    </div>
  </div>
);

const SinglePage = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await FetchSingleUser(userId);
      setUserData(data);
    };

    fetchData();
  }, [userId]);

  return userData ? <UserDetails userData={userData} /> : <Loading />;
};

export default SinglePage;
