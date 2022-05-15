import { useModal } from "contexts";
import { bxIcons } from "data/icons";
import { Link } from "react-router-dom";
import { ROUTES } from "utils/routes";
import "./RulesModal.css";

export const RulesModal = () => {
	const { setModal } = useModal();

	return (
		<section className="rules__section">
			<section className="rules__header">
				<div className="h3">Rules Page</div>
				<Link
					to={ROUTES.home}
					className="btn btn--outline--primary btn--circular btn--dismiss"
					title="Close Modal"
					onClick={() => setModal(false)}
				>
					{bxIcons.cross}
				</Link>
			</section>
			<ol className="rules__list">
				<li>
					Each question has the timer of 20 sec, which will be visible on the
					page.
				</li>
				<li>You can choose only 1 answer amongs the given choices.</li>
				<li>For each correct answer you will be awarded with 5 points.</li>
				<li>There is a negative marking of 3 points for each wrong answer.</li>
				<li>You cannot skip the question.</li>
				<li>After finishing the quiz total score will be shown.</li>
			</ol>
			<section className="rules__btn">
				<button
					className="btn btn--outline--primary"
					onClick={() => setModal(false)}
				>
					Start Quiz
				</button>
			</section>
		</section>
	);
};
