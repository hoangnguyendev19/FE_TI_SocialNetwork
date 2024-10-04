import { createBrowserRouter } from "react-router-dom";
import { Home, News } from "pages";
import { MENU } from "constants";

export const router = createBrowserRouter([
  {
    path: MENU.HOME,
    element: <Home />,
    // loader: rootLoader,
    children: [
      {
        path: MENU.NEWS,
        element: <News />,
        // loader: teamLoader,
      },
    ],
  },
]);
