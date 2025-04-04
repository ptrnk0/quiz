import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky m-auto w-11/12">
      <Link
        to="/"
        className="inline-block cursor-pointer py-1 text-4xl font-bold transition-colors duration-300 ease-in-out hover:text-pink-100 md:text-6xl"
      >
        <span className="stroke-text uppercase">q</span>uizzz
      </Link>
    </header>
  );
};

export default Header;
