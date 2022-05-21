import { SummaryCard } from "components";
import { useAlert, useAuth, useModal, useQuiz } from "contexts";
import { bxIcons } from "data/icons";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { updateDbUserData } from "utils/firebaseServices";
import { ROUTES } from "utils/routes";
import "./ScoreModal.css";

export const ScoreModal = () => {
	const { modal, setModal } = useModal();
	const { score, playedQuizData, quizSummary, setQuizSummary } = useQuiz();
	const { setAlert } = useAlert();
	const {
		authState: { token, email },
	} = useAuth();

	useEffect(() => {
		if (token) {
			updateDbUserData(email, playedQuizData, setAlert);
		}
	}, [token, modal]);

	const closeSummaryModalHandler = () => {
		setQuizSummary({ questions: [], categoryName: "" });
		setModal(false);
	};

	return (
		<section className="scores__section">
			<section className="score__header">
				<div className="h3">Quiz Summary</div>
				<Link
					to={ROUTES.home}
					className="btn btn--outline--primary btn--circular btn--dismiss"
					title="Close Modal"
					onClick={closeSummaryModalHandler}
				>
					{bxIcons.cross}
				</Link>
			</section>
			<section className="score__wrapper">
				<section className="score__text">
					Scored: <span>{score}</span>
				</section>
				<section className="score__text">
					Total Score: <span>{playedQuizData.totalScore}</span>
				</section>
			</section>
			<div className="quiz__category_name">
				Quiz name: {quizSummary.categoryName}
			</div>
			<SummaryCard />
			<section className="scores__btn">
				<Link
					to={ROUTES.category}
					onClick={closeSummaryModalHandler}
					className="btn btn--primary"
				>
					Take New Quiz
				</Link>
				<Link
					to={ROUTES.leaderboard}
					onClick={closeSummaryModalHandler}
					className="btn btn--outline--primary"
				>
					Check Leaderboard
				</Link>
			</section>
		</section>
	);
};
