import React from "react";
import "./Home.css";
import { useDocumentTitle } from "customHooks";
import { CategoryCard } from "components";
import { useQuiz } from "contexts";

export const Home = () => {
	useDocumentTitle("Home | MS");
	const { allQuizQuestions } = useQuiz();

	const popularQuizCategory = allQuizQuestions.filter(
		(category) => category.popular
	);
	const trendingQuizCategory = allQuizQuestions.filter(
		(category) => category.trending
	);

	const popularQuiz = popularQuizCategory.map((category) => (
		<CategoryCard key={category._id} category={category} isPopular={true} />
	));
	const trendingQuiz = trendingQuizCategory.map((category) => (
		<CategoryCard key={category._id} category={category} />
	));

	return (
		<div className="home_page">
			<main className="main--homepage">
				<section className="homepage__section categories">
					<h3 className="h3 section__heading">All time Popular Quiz</h3>

					<ul className="quiz__items">{popularQuiz}</ul>
				</section>
				<section className="homepage__section items_container">
					<h3 className="h3 section__heading">Trending Categories</h3>
					<ul className="categories__items">{trendingQuiz}</ul>
				</section>
			</main>
		</div>
	);
};
