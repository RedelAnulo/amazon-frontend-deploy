import React, { useContext } from "react";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";
import classes from "./Header.module.css";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import Auth from "../../Pages/Auth/Auth";
import { auth } from "../../Utility/Firebase";

function Header() {
	const [{ user, basket }, dispatch] = useContext(DataContext);
	const totalItem = basket?.reduce((amount, item) => {
		return item.amount + amount;
	}, 0);
	return (
		<section className={classes.fixed}>
			<section>
				<div className={classes.header__container}>
					{/* Logo Section*/}
					<div className={classes.logo__container}>
						<Link to="/">
							<img
								src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
								alt="Amazon Logo"
							/>
						</Link>
						<div className={classes.delivery}>
							{/* Delivery */}
							<span>
								{/* Icon */}
								<SlLocationPin />
							</span>
							<div>
								<p>Delivered to</p>
								<span>Ethiopia</span>
							</div>
						</div>
					</div>

					{/* Search Section*/}
					<div className={classes.search}>
						<select name="" id="">
							<option value="">All</option>
						</select>
						<input type="text" name="" id="" placeholder="Search Product" />
						{/* Icon */}
						<BsSearch size={38} />
					</div>
					{/* other section */}
					<div className={classes.order__container}>
						<Link to="#" className={classes.language}>
							<img
								src="https://m.media-amazon.com/images/I/71rGj52D1ZL.__AC_SX300_SY300_QL70_FMwebp_.jpg"
								alt="Flag"
							/>
							<select className="">
								<option value="">EN</option>
							</select>
						</Link>
						<Link to={!user && "/Auth"}>
							<div>
								{user ? (
									<>
										<p>Hello {user?.email?.split("@")[0]}</p>
										<span onClick={()=>auth.signOut()}>Sign Out</span>
									</>
								) : (
									<>
										<p>Sign In</p>
										<span>Accounts & Lists</span>
									</>
								)}
							</div>
						</Link>
						<Link to="/orders">
							<p>returns</p>
							<span> & Orders</span>
						</Link>
						<Link to="/cart" className={classes.cart}>
							{/* icon */}
							<BiCart size={35} />
							<span>{totalItem}</span>
						</Link>
					</div>
				</div>
			</section>
			<LowerHeader />
		</section>
	);
}

export default Header;
