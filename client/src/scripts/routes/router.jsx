import {createBrowserRouter, Route, createRoutesFromElements} from "react-router-dom";
import RootLayout from "../views/layouts/RootLayout";
import TourPackage from "../views/pages/TourPackage";
import PackageHistory from "../views/pages/PackageHistory";
import Login from "../views/pages/Login";
import Register from "../views/pages/Register";
import Homepage from "../views/pages/HomePage";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index element={<Homepage />}></Route>
			<Route path="/package" element={<TourPackage />}></Route>
			<Route path="/history" element={<PackageHistory />}></Route>
			<Route path="/login" element={<Login />}></Route>
			<Route path="/register" element={<Register />}></Route>
		</Route>
	)
);

export default router;
