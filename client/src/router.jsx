import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/Layout";
import News from "./pages/News";
import Register from "./pages/Register";
import CreateNews from "./pages/CreateNews";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import NewContainer from "./pages/NewContainer";
import UpdateNews from "./pages/UpdateNews";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <p>Hola a todos como estáis</p>,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/news/create",
        element: <CreateNews />,
      },
      {
        path: "/news/newcontainer/:id",
        element: <NewContainer />,
      },
      {
        path: "/news/updatenews/:id",
        element: <UpdateNews />,
      },
    ],
  },
]);

export default router;
