import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const Loading = () => {
  const skeletons = [];

  for (let i = 0; i < 4; i++) {
    skeletons.push(
      <Box
        key={i}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
      >
        <Skeleton
          className="widgets"
          animation="wave"
          variant="rectangular"
          width="60%"
          height={70}
        />

        <Skeleton
          className="widgets"
          animation="wave"
          variant="rectangular"
          width="40%"
          height={1}
        />
        <Skeleton
          className="widgets"
          animation="wave"
          variant="rectangular"
          width="10%"
          height={1}
        />
      </Box>
    );
  }

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(2, 1fr)"
      gap={2} // Adjust the gap between grid items as needed
    >
      {skeletons}
    </Box>
  );
};

export default Loading;
