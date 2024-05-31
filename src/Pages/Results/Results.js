import React, { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ProductUrl } from "../../Api/EndPoints";
import ProductCard from "../../Components/Product/ProductCard";
import classes from "./Results.module.css";
import Loader from "../../Components/Loader/Loader";
function Results() {
	const [results, setResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const { categoryName } = useParams();

	useEffect(() => {
		axios
			.get(`${ProductUrl}/products/category/${categoryName}`)
			.then((res) => {
				setResults(res.data);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
			});
	}, []);

	return (
		<LayOut>
			<section>
				<h1 style={{ padding: "30px" }}>Results</h1>
				<p style={{ padding: "30px" }}>Category/{categoryName}</p>
				<hr />

				{isLoading ? (
					<Loader />
				) : (
					<div className={classes.products_container}>
						{results?.map((product) => (
							<ProductCard key={product.id} product={product} renderDesc={false} renderAdd={true} />
						))}
					</div>
				)}
			</section>
		</LayOut>
	);
}

export default Results;
