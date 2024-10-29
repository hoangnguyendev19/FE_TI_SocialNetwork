import { Loading } from "components";
import { useBoardingHouse } from "hooks";
import { useLocation } from "react-router-dom";
import { BoardingHouse, RegisterToBecome, Room, UnderReview } from "./components";

const renderChildren = (children: string) => {
  switch (children) {
    case "/boarding-house":
      return <BoardingHouse />;
    case "/boarding-house/register-to-become":
      return <RegisterToBecome />;
    case "/boarding-house/under-review":
      return <UnderReview />;
    case "/boarding-house/room":
      return <Room />;
    default:
      return <BoardingHouse />;
  }
};

export const BoardingHousePage: React.FC = () => {
  const location = useLocation();
  const children = location.pathname || "/boarding-house";
  const { data, isLoading } = useBoardingHouse({
    enabled: true,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  if (isLoading) {
    return <Loading />;
  }

  if (data !== null) {
    location.pathname = "/boarding-house/room";
  }

  return <>{renderChildren(children as string)}</>;
};
