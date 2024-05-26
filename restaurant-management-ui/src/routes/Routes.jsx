import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import AuthenticatedRoute from "./AuthenticatedRoute";
const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));
const Sell = lazy(() => import("../pages/Sell/Sell"));
const DailySellReport = lazy(() =>
  import("../pages/Dashboard/SellReport/DailySellReport/DailySellReport")
);

export const router = createBrowserRouter([
  {
    path: "/user",
    element: (
      // <AuthenticatedRoute>
      <Main />
      // </AuthenticatedRoute>
    ),
    errorElement: <h1>Error</h1>,
    children: [
      {
        path: "/user",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/user/sell",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Sell />
          </Suspense>
        ),
      },
      {
        path: "/user/dashboard/sell-report/daily-sell-report",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <DailySellReport />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<h1>Loading...</h1>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<h1>Loading...</h1>}>
        <Register />
      </Suspense>
    ),
  },
]);
