import { App } from "app";
import { ROUTE } from "constants";
import {
  BoardingHousePage,
  HomePage,
  LoginPage,
  NewsPage,
  NotFoundPage,
  ProfilePage,
  SettingsPage,
  SignupPage,
} from "pages";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: ROUTE.ROOT,
    element: <App />,
    children: [
      {
        element: <HomePage />,
        index: true,
      },
      {
        path: ROUTE.NEWS,
        element: <NewsPage />,
      },
      {
        path: ROUTE.SETTINGS,
        element: <SettingsPage />,
      },
      {
        path: ROUTE.BOARDING_HOUSE,
        element: <BoardingHousePage />,
        children: [
          {
            path: ROUTE.REGISTER_TO_BECOME,
            element: <BoardingHousePage />,
          },
          {
            path: ROUTE.UNDER_REVIEW,
            element: <BoardingHousePage />,
          },
        ],
      },
      {
        path: ROUTE.PROFILE,
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: ROUTE.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTE.FORGOT_PASSWORD,
    element: <LoginPage />,
    children: [
      {
        path: ROUTE.VERIFY_CODE,
        element: <LoginPage />,
      },
      {
        path: ROUTE.SET_PASSWORD,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: ROUTE.SIGNUP,
    element: <SignupPage />,
  },
  {
    path: ROUTE.NOT_FOUND,
    element: <NotFoundPage />,
  },
]);
