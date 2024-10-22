import { App } from "app";
import { ROUTE } from "constants";
import {
  HomePage,
  LoginPage,
  NewsPage,
  NotFoundPage,
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
