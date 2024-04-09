import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import loading from "../image/loadingImage.gif";

const Loading = () => {
  const skeletons = [];

  for (let i = 0; i < 1; i++) {
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
          width={200}
          height={170}
        />

        <Skeleton
          className="widgets"
          animation="wave"
          variant="rectangular"
          width="50%"
          height={100}
        />
        <Skeleton
          className="widgets"
          animation="wave"
          variant="rectangular"
          width="10%"
          height={50}
        />
      </Box>
    );
  }

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(1, 1fr)"
      gap={2} // Adjust the gap between grid items as needed
    >
      {skeletons}
    </Box>
  );
};

export default Loading;

// import React from "react";
// import loading from "../image/loadingImage.gif";

// function Loading() {
//   return <img className="loadingIcon" src={loading} alt="Loading" />;
// }

// export default Loading;
