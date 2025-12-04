import { Link, useLocation } from "react-router-dom";

export type HeaderLink = {
  to: string;
  name: string;
};

type Directions = "row" | "column";

export type HeaderProps = {
  data: HeaderLink[];
  direction: Directions;
  isAdmin: boolean;
  isFixed?: boolean;
};

function HeaderLinks({
  data,
  direction = "row",
  isAdmin,
  isFixed,
}: HeaderProps) {
  const location = useLocation();

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <ul style={{ flexDirection: direction }} className="flex gap-8">
      {isAdmin && (
        <Link
          className={`text-main ${
            isFixed
              ? "text-gray-50 hover:text-gray-400"
              : "text-green-900 hover:text-green-950"
          } text-xl  transition-all duration-300`}
          to={"/admin"}
        >
          Admin
        </Link>
      )}
      {data.map((item) => (
        <Link
          key={item.name}
          onClick={() => {
            if (location.hash === `#${item.to}`) {
              handleClick(item.to);
            }
          }}
          className={`text-main ${
            isFixed
              ? "text-gray-50 hover:text-gray-400"
              : "text-green-900 hover:text-green-950"
          } transition-all duration-300  text-xl`}
          to={`/#${item.to}`}
        >
          {item.name}
        </Link>
      ))}
    </ul>
  );
}

export default HeaderLinks;
