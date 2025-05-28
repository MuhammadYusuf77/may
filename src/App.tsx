import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivatePage from "./components/PrivatePage";
import PrivateRoute from "./components/PrivateRoute";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/private",
    element: (
      <PrivateRoute>
        <PrivatePage />
      </PrivateRoute>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
