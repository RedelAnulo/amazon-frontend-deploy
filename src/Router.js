import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./Pages/Auth/Auth";
import Landing from "./Pages/Landing/Landing";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
	"pk_test_51PJslkL3nyCVHmrQEh0okxGb1oHPRGksPWbcLgdxjxCNwO56ilQscW9uvjNL0RBdP43wq9L2ay2M8nMUXuLe0KxE00B0rPwyuW"
);
function Routing() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Landing />}></Route>
				<Route path="/auth" element={<Auth />}></Route>
				<Route
					path="/payments"
					element={
						<ProtectedRoute
							msg={"You must log-in to pay"}
							redirect={"/payments"}
						>
							<Elements stripe={stripePromise}>
								<Payment />
							</Elements>
						</ProtectedRoute>
					}
				></Route>
				<Route
					path="/orders"
					element={
						<ProtectedRoute
							msg={"You must log-in to access your  Order"}
							redirect={"/orders"}
						>
							<Orders />
						</ProtectedRoute>
					}
				></Route>
				<Route path="/category/:categoryName" element={<Results />}></Route>
				<Route path="/products/:productId" element={<ProductDetail />}></Route>
				<Route path="/cart" element={<Cart />}></Route>
			</Routes>
		</Router>
	);
}

export default Routing;
