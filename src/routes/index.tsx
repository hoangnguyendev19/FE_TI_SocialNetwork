import { createBrowserRouter } from "react-router-dom";
import { Home, Login, News, Signup } from "pages";
import { MENU } from "constants";

export const router = createBrowserRouter([
  {
    path: MENU.HOME,
    element: <Home />,
    // loader: rootLoader,
  },
  {
    path: MENU.LOGIN,
    element: <Login />,
    // loader: teamLoader,
  },
  {
    path: MENU.SIGNUP,
    element: <Signup />,
    // loader: teamLoader,
  },
  {
    path: MENU.NEWS,
    element: <News />,
    // loader: teamLoader,
  },
]);
