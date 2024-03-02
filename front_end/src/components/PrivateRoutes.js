import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";

import { PageContext } from "../context/PageContext";

const PrivateRoutes = () => {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(PageContext);
  const { roleForLogin } = state;

  //đây là cách làm tạm, phương án chính như sau:
  //1. khi login thì server trả 1 token trên cookie
  //2. lấy cookie này chạy const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); (tất nhiên phải đi xin người làm backend cái chuỗi process.env.JWT_SECRET)
  //3. sau khi decoded thì ta có một Object gồm { id: '65dee16ac3d7d9a0150ed1aa', iat: 1709392401, exp: 1709565201 }
  //4. lấy id này để getSingleUser và từ đó tra được role của user, sử dụng role của user để cấp quyền vào trang của admin hay user thường
  useEffect(() => {
    if (roleForLogin !== "admin") {
      navigate(`/login`);
    }
  }, [roleForLogin, navigate]);

  return roleForLogin ? <Outlet /> : null;
};

export default PrivateRoutes;
