import { useContext, useEffect } from "react";
import "./App.css";
import CarouselEffect from "./Components/Carousel/Carousel";
import Category from "./Components/Category/Category";
import { DataContext } from "./Components/DataProvider/DataProvider";
import Header from "./Components/Header/Header";
import Product from "./Components/Product/Product";
import Routing from "./Router";
import { Type } from "./Utility/action.type";
import { auth } from "./Utility/Firebase";
function App() {
	const [{ user }, dipatch] = useContext(DataContext);
	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				console.log(authUser);
				dipatch({
					type: Type.SET_USER,
					user: authUser,
				});
			} else {
				dipatch({
					type: Type.SET_USER,
					user: null,
				});
			}
		});
	}, []);

	return (
		<div className="App">
			<Routing />
		</div>
	);
}

export default App;
