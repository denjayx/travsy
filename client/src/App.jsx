import {RouterProvider} from "react-router-dom";
import router from "./scripts/routes/router";

function App() {
	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
