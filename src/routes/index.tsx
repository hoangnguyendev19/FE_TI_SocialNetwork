import { createBrowserRouter } from "react-router-dom";
import {
  Home,
  Login,
  News,
  Signup,
  ForgotPassword,
  VerifyCode,
  SetPassword,
} from "pages";
import { MENU } from "constants";

export const router = createBrowserRouter([
  {
    path: MENU.ROOT,
    element: <Home />,
  },
  {
    path: MENU.LOGIN,
    element: <Login />,
  },
  {
    path: MENU.SIGNUP,
    element: <Signup />,
  },
  {
    path: MENU.FORGOT_PASSWORD,
    element: <ForgotPassword />,
  },
  {
    path: MENU.VERIFY_CODE,
    element: <VerifyCode />,
  },
  {
    path: MENU.SET_PASSWORD,
    element: <SetPassword />,
  },
  {
    path: MENU.NEWS,
    element: <News />,
  },
]);
