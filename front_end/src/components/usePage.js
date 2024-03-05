import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const usePage = () => {
  const location = useLocation();
  const [pageType, setPageType] = useState({
    isUserPage: false,
    isUserPageMe: false,
    isStorePage: false,
    isOrderPage: false,
    isProductPage: false,
  });

  //url
  const myInfo = "myInfo";
  const user = "user";
  const userPage = "userPage";
  const stores = "stores";
  const orders = "orders";
  const products = "products";
  const edit = "edit";
  // const myInfo = "myInfo";
  // const myInfo = "myInfo";
  // const myInfo = "myInfo";
  // const myInfo = "myInfo";
  // const myInfo = "myInfo";
  // const myInfo = "myInfo";

  useEffect(() => {
    const currentUrl = location.pathname;
    //user//
    const isUserApp = currentUrl.includes(userPage);

    //admin///
    const isUserPage = currentUrl.includes(user);
    const isUserPageMe =
      currentUrl.includes(myInfo) && currentUrl.includes(user);

    const isStorePage = currentUrl.includes(stores);
    const isOrderPage = currentUrl.includes(orders);
    const isProductPage = currentUrl.includes(products);

    const isUserEditPage =
      currentUrl.includes(user) && currentUrl.includes(edit);
    const isMyInfoEditPage =
      currentUrl.includes(myInfo) && currentUrl.includes(edit);

    const isStoreEditPage =
      currentUrl.includes(stores) && currentUrl.includes(edit);
    const isOrderEditPage =
      currentUrl.includes(orders) && currentUrl.includes(edit);
    const isProductEditPage =
      currentUrl.includes(products) && currentUrl.includes(edit);

    setPageType({
      isUserApp,
      isUserPage,
      isUserPageMe,
      isStorePage,
      isOrderPage,
      isProductPage,
      isUserEditPage,
      isMyInfoEditPage,
      isStoreEditPage,
      isOrderEditPage,
      isProductEditPage,
    });
  }, [location]);

  return pageType;
};
