import React from "react";
import "./Home.css";
// import { Link } from "react-router-dom";
import { useDocumentTitle } from "customHooks";

export const Home = () => {
	useDocumentTitle("Home | MS");

	return (
		<div className="home_page">
			<main className="main--homepage">
				<section className="homepage__section categories">
					<h3 className="h3 section__heading">Popular Quiz</h3>

					<ul className="video__items"></ul>
				</section>
				<section className="homepage__section items_container">
					<h3 className="h3 section__heading">Top Categories</h3>
					<ul className="categories__items"></ul>
				</section>
			</main>
		</div>	
	);
};
