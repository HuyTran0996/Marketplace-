import React from "react";
import { useNavigate } from "react-router-dom";

import {
  container,
  innerContainer,
  class404,
  classOops,
  button,
} from "./className/classNotFound";

function NotFoundPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/`);
  };
  return (
    <div className={container}>
      <div className={innerContainer}>
        <h1 className={class404}>404</h1>
        <h1 className={classOops}>Ooops! Something went wrong.</h1>
        <p className="text-gray-600">
          The page you're looking for may have been removed, renamed, or is
          temporarily unavailable.
        </p>
        <button className={button} onClick={handleClick}>
          Back To Home Page
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage;
