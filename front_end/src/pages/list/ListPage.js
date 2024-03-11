import "./list.scss";

import Sidebar from "../../components/sidebar/SideBar";
import SideBarUser from "../../components/sidebar/SideBarUser";

import NavbarProduct from "../../components/navbar/NavbarProduct";
import NavbarUser from "../../components/navbar/NavbarUser";
import NavbarOrder from "../../components/navbar/NavbarOrder";
import NavbarStore from "../../components/navbar/NavbarStore";

import DataTableUser from "../../components/datatable/DataTableUser";
import DataTableStore from "../../components/datatable/DataTableStore";
import DataTableOrder from "../../components/datatable/DataTableOrder";
import DataTableProduct from "../../components/datatable/DataTableProduct";
import DataTableCartProduct from "../../components/datatable/DataTableCartProduct";
import DataTableOrderUserApp from "../../components/datatable/DataTableOrderUserApp";
import DataTableOrderDetail from "../../components/datatable/DataTableOrderDetail";
import DataTableOrderDetailOfStoreUserApp from "../../components/datatable/DataTableOrderDetailOfStoreUserApp";
import DataTableOrderDetailOfStoreAdminApp from "../../components/datatable/DataTableOrderDetailOfStoreAdminApp";

const ListPageUser = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <NavbarUser />
        <DataTableUser />
      </div>
    </div>
  );
};
const ListPageStore = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <NavbarStore />
        <DataTableStore />
      </div>
    </div>
  );
};
const ListPageOrder = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <NavbarOrder />
        <DataTableOrder />
      </div>
    </div>
  );
};
const ListPageProduct = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <NavbarProduct />
        <DataTableProduct />
      </div>
    </div>
  );
};
const ListPageCartProduct = () => {
  return (
    <div className="list">
      <SideBarUser />
      <div className="listContainer">
        <DataTableCartProduct />
      </div>
    </div>
  );
};
const ListPageOrderUserApp = () => {
  return (
    <div className="list">
      <SideBarUser />
      <div className="listContainer">
        <DataTableOrderUserApp />
      </div>
    </div>
  );
};

const ListPageOrderDetail = () => {
  return (
    <div className="list">
      <SideBarUser />
      <div className="listContainer">
        <DataTableOrderDetail />
      </div>
    </div>
  );
};
const ListPageOrderDetailOfStore = () => {
  return (
    <div className="list">
      <SideBarUser />
      <div className="listContainer">
        <DataTableOrderDetailOfStoreUserApp />
      </div>
    </div>
  );
};
const ListPageOrderDetailOfStoreAdminApp = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <DataTableOrderDetailOfStoreAdminApp />
      </div>
    </div>
  );
};

export {
  ListPageUser,
  ListPageStore,
  ListPageOrder,
  ListPageProduct,
  ListPageCartProduct,
  ListPageOrderUserApp,
  ListPageOrderDetail,
  ListPageOrderDetailOfStore,
  ListPageOrderDetailOfStoreAdminApp,
};
