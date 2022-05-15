import { useAlert, useAuth, useModal, useQuiz } from "contexts";
import { bxIcons } from "data/icons";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { updateDbUserData } from "utils/firebaseServices";
import { ROUTES } from "utils/routes";
import "./ScoreModal.css";

export const ScoreModal = () => {
	const { modal, setModal } = useModal();
	const { score, playedQuizData } = useQuiz();
	const { setAlert } = useAlert();

	const {
		authState: { token, email },
	} = useAuth();

	useEffect(() => {
		if (token) {
			updateDbUserData(email, playedQuizData, setAlert);
		}
	}, [token, modal]);

	const closeModal = () => {
		setModal(false);
	};

	return (
		<section className="scores__section">
			<section className="score__header">
				<div className="h3">Score</div>
				<Link to={ROUTES.home}
					className="btn btn--outline--primary btn--circular btn--dismiss"
					title="Close Modal"
					onClick={closeModal}
				>
					{bxIcons.cross}
				</Link>
			</section>
			<section className="score__text">
				You Scored: <span>{score}</span>
			</section>
			<section className="score__text">
				Highest so far: <span>{playedQuizData.highestScore}</span>
			</section>
			<section className="score__text">
				Your Total Score: <span>{playedQuizData.totalScore}</span>
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
