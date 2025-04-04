import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Layout = () => {
  return (
    <div className="font-roboto flex min-h-screen flex-col bg-yellow-400 pb-10">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
