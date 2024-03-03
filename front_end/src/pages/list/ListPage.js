import "./list.scss";

import Sidebar from "../../components/sidebar/SideBar";
import NavbarProduct from "../../components/navbar/NavbarProduct";
import DataTableUser from "../../components/datatable/DataTableUser";
import DataTableStore from "../../components/datatable/DataTableStore";
import DataTableOrder from "../../components/datatable/DataTableOrder";
import DataTableProduct from "../../components/datatable/DataTableProduct";

const ListPageUser = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <NavbarProduct />
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
        <NavbarProduct />
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
        <NavbarProduct />
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

export { ListPageUser, ListPageStore, ListPageOrder, ListPageProduct };
