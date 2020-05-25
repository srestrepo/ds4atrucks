// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import Truck from "@material-ui/icons/LocalShipping";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import TrucksPage from "views/Trucks/Trucks.js";
import RequestsPage from "views/Requests/Requests.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/trucks",
    name: "Trucks",
    icon: Truck,
    component: TrucksPage,
    layout: "/admin"
  },
  {
    path: "/requests",
    name: "Requests",
    icon: "content_paste",
    component: RequestsPage,
    layout: "/admin"
  }
];

export default dashboardRoutes;
