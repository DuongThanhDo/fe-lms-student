// rafce
import React from "react";

import { Container } from "react-bootstrap";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <Container style={{minHeight: 500}}>{children}</Container>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
