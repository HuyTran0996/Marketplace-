import "./list.scss";

import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/NavBar";
import DataTableUser from "../../components/datatable/DataTableUser";
import DataTableStore from "../../components/datatable/DataTableStore";
import DataTableOrder from "../../components/datatable/DataTableOrder";
import DataTableProduct from "../../components/datatable/DataTableProduct";

const ListPageUser = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
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
        <Navbar />
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
        <Navbar />
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
        <Navbar />
        <DataTableProduct />
      </div>
    </div>
  );
};

export { ListPageUser, ListPageStore, ListPageOrder, ListPageProduct };
