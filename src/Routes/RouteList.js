//PATH
import { URL_HOME_PAGE } from "Helpers/Paths";

//COMPONENT
import { HomePage } from "Components/pages/HomePage";

const RoutesList = [
  {
    path: "/",
    exact: true,
    Component: <HomePage />,
  },
  {
    path: URL_HOME_PAGE,
    exact: true,
    Component: <HomePage />,
  },
];

export default RoutesList;
