import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import ListPage from "./pages/list/ListPage";
import NewPage from "./pages/new/NewPage";
import SinglePage from "./pages/single/SinglePage";
import NotFoundPage from "./pages/notfound/NotFoundPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="users">
            <Route index element={<ListPage />} />
            <Route path=":userId" element={<SinglePage />} />
            <Route path="new" element={<NewPage title="Add New User" />} />
          </Route>
          <Route path="products">
            <Route index element={<ListPage />} />
            <Route path=":productId" element={<SinglePage />} />
            <Route path="new" element={<NewPage title="Add New Product" />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
