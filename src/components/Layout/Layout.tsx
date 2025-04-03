import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Layout = () => {
  return (
    <div className="font-roboto flex min-h-screen flex-col bg-yellow-400 pb-10">
      <Header />
      <main className="m-auto flex h-full w-11/12 grow-1 flex-col">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
