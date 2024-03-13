import React from "react";

import { Container } from "@mui/material";

const cardStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "90vw",
  marginTop: "6px",
};

function NotFoundPage() {
  return (
    <Container className="movieStyle1" style={cardStyle}>
      NOT FOUND PAGE
    </Container>
  );
}

export default NotFoundPage;
