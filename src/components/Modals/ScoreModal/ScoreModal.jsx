import { useModal, useQuiz } from "contexts";
import { bxIcons } from "data/icons";
import { Link } from "react-router-dom";
import { ROUTES } from "utils/routes";
import "./ScoreModal.css";

export const ScoreModal = () => {
	const { setModal } = useModal();
	const { score } = useQuiz();
	return (
		<section className="scores__section">
			<section className="score__header">
				<div className="h3">Score</div>
				<div
					className="btn btn--outline--primary btn--circular btn--dismiss"
					title="Close Modal"
					onClick={() => setModal(false)}
				>
					{bxIcons.cross}
				</div>
			</section>
			<section className="score__text">
				You Scored: <span>{score.current}</span>
			</section>
			<section className="score__text">
				Your Total Score: <span>{score.total}</span>
			</section>
			<section className="scores__btn">
				<Link
					to={ROUTES.category}
					onClick={() => setModal(false)}
					className="btn btn--primary"
				>
					Take New Quiz
				</Link>
				<Link
					to={ROUTES.leaderboard}
					onClick={() => setModal(false)}
					className="btn btn--outline--primary"
				>
					Check Leaderboard
				</Link>
			</section>
		</section>
	);
};
