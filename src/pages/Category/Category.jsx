import { CategoryCard } from "components";
import { useDocumentTitle } from "customHooks";
import { allQuizCategory } from "data/allQuizCategory";
import "./Category.css";

export const Category = () => {
	useDocumentTitle("Category | MS");

	const allQuizes = allQuizCategory.map((category) => (
		<CategoryCard key={category._id} category={category} />
	));

	return (
		<div className="home_page">
			<main className="main--homepage">
				<section className="homepage__section categories">
					<h3 className="h3 section__heading">All Quizes Category</h3>

					<ul className="quiz__items bottom__buffer">{allQuizes}</ul>
				</section>
			</main>
		</div>
	);
};
