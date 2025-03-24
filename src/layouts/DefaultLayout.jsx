// rafce
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container } from "react-bootstrap";

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <Container style={{minHeight: 600}}>{children}</Container>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
