import { Link } from "react-router-dom";
import { IQuestionsItems } from "../../redux/questions/questions.types";

interface IButtonLinkProps {
  children: string;
  link: null | IQuestionsItems;
}

const ButtonLink = ({ children, link }: IButtonLinkProps) => {
  if (!link)
    return (
      <Link
        to="/"
        className="text-md pointer-events-none inline-block cursor-not-allowed border-2 border-black bg-yellow-400 px-3 py-1 text-gray-400 transition-colors duration-300 ease-in hover:bg-yellow-500 md:text-xl"
      >
        {children}
      </Link>
    );

  return (
    <Link
      to={`/${link?.sys.id}`}
      className="text-md inline-block cursor-pointer border-2 border-black bg-yellow-400 px-3 py-1 transition-colors duration-300 ease-in hover:bg-yellow-500 md:text-xl"
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
