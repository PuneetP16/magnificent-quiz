import { Link } from "react-router-dom";
import "./CategoryCard.css";

export const CategoryCard = ({ category, time, isPopular }) => {
	return (
		<article
			className={
				isPopular
					? "quiz_category_card card--quiz_popular"
					: "quiz_category_card card--quiz_trending"
			}
		>
			<Link to={`/category/${category._id}`}>
				<img
					src={category.img}
					alt={category.name}
					className="category__image image--responsive"
				/>
			</Link>
			{isPopular && (
				<span className="quiz_time--section">
					<h3 className="card__title">{category.name}</h3>
					<h3 className="card__title">
						{Math.round(Math.random() * 5) + 1} min
					</h3>
				</span>
			)}
			{!isPopular && (
				<span>
					<h3 className="card__title">{category.name}</h3>
				</span>
			)}
		</article>
	);
};
