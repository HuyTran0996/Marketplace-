import React from "react";
import Skeleton from "@mui/material/Skeleton";

const Loading = () => {
  const skeletons = [];

  for (let i = 0; i < 4; i++) {
    skeletons.push(
      <Skeleton
        key={i}
        className="widgets"
        variant="rectangular"
        width={100}
        height={40}
      />
    );
  }

  return <div>{skeletons}</div>;
};

export default Loading;
