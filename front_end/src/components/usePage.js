import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const usePage = () => {
  const location = useLocation();
  const [pageType, setPageType] = useState({
    isUserPage: false,
    isOrderPage: false,
    isProductPage: false,
  });

  useEffect(() => {
    const currentUrl = location.pathname;

    const isUserPage = currentUrl.includes("user");
    const isUserPageMe =
      currentUrl.includes("myInfo") && currentUrl.includes("users");

    const isStorePage = currentUrl.includes("stores");
    const isOrderPage = currentUrl.includes("orders");
    const isProductPage = currentUrl.includes("products");

    setPageType({
      isUserPage,
      isUserPageMe,
      isStorePage,
      isOrderPage,
      isProductPage,
    });
  }, [location]);

  return pageType;
};
