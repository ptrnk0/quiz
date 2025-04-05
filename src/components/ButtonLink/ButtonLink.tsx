import { Link } from "react-router-dom";

interface IButtonLinkProps {
  children: string;
  link: string | null | undefined;
}

const ButtonLink = ({ children, link }: IButtonLinkProps) => {
  return (
    <Link
      to={link ? `/${link}` : "/"}
      className={`${link ?? "pointer-events-none cursor-not-allowed text-pink-100"} text-md inline-block cursor-pointer border-2 border-black bg-yellow-400 px-3 py-1 transition-colors duration-300 ease-in hover:bg-yellow-500 md:text-xl`}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
