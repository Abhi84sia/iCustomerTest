import { Button } from "antd";
import React from "react";
// import { useAuth } from "../contexts/authContext";
import { NaveBar } from "../components/navBar";
import ProductList from "../components/product";

const Dashboard = () => {
  // const { userData, logout } = useAuth();
  // const handleLogout = async () =>{
  //   await logout()
  // }


  return (
    <>
      <NaveBar/>
      <ProductList/>
    </>
  );
};

export default Dashboard;
