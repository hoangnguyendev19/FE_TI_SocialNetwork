import { useLocation } from "react-router-dom";
import { BoardingHouse, RegisterToBecome, UnderReview } from "./components";

const renderChildren = (children: string) => {
  switch (children) {
    case "/boarding-house":
      return <BoardingHouse />;
    case "/boarding-house/register-to-become":
      return <RegisterToBecome />;
    case "/boarding-house/under-review":
      return <UnderReview />;
    default:
      return <BoardingHouse />;
  }
};

export const BoardingHousePage: React.FC = () => {
  const location = useLocation();
  const children = location.pathname || "/boarding-house";
  return <>{renderChildren(children as string)}</>;
};
