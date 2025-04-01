/*
 * Main React Routing
 *
 * Configures components and their associated routes (endpoints).
 * If a user navigates to an unrecognized route, an error page appears.
 *
 */

import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App.jsx";
import Main from "./pages/Main";

/*
 * createBrowserRouter
 *
 * Sets up the root and child routes for the commponents.
 * Unrecognized routes trigger an error page.
 *
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Main />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
