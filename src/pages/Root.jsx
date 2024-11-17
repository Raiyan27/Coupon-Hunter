import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "../components/Header";

const Root = () => {
  return (
    <>
      <Header />
      <Outlet></Outlet>
      <Footer />
    </>
  );
};

export default Root;
