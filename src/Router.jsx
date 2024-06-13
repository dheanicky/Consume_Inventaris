import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Dashboard from './pages/Dashboard'
import Stuff from "./pages/Stuff";
import TrashStuff from "./components/Stuff/TrashStuff";
import TrashUser from "./components/User/TrashUser";
import Inbound from "./pages/Inbound";
import User from "./pages/User";
import Lending from "./pages/Lending";
import LendingStuff from "./pages/LendingStuff"


export const router = createBrowserRouter([
    {path: '/', element: <App />},
    {path: '/login', element: <Login />},
    {path: '/profile', element: <Profile />},
    {path: '/dashboard', element: <Dashboard/>},
    {path: '/stuff', element: <Stuff/>},
    {path: '/stuffs/trash', element: <TrashStuff/>},
    {path: '/users/trash', element: <TrashUser/>},
    {path: '/inbound-stuff', element: <Inbound/>},
    {path: '/user', element: <User/>},
    {path: '/lending', element: <Lending/>},
    {path: '/lendingStuff', element: <LendingStuff/>}
])