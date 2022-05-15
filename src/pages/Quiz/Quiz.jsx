import { Modal, QuestionCard, RulesModal, ScoreModal } from "components";
import { useModal, useQuiz } from "contexts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Quiz.css";

export const Quiz = () => {
	const { allQuizQuestions, setScore } = useQuiz();
	const { categoryId } = useParams();
	const { modal, setModal } = useModal();

	const [showScoreModal, setShowScoreModal] = useState(false);
	const [startQuiz, setStartQuiz] = useState(false);

	const selectedCategory = allQuizQuestions.find(
		(category) => category._id === categoryId
	);

	useEffect(() => {
		setModal(true);
		setScore(0);
	}, []);

	return (
		<div className="home_page">
			<main className="main--homepage">
				<section className="quiz__header">
					<h3 className="h3 section__heading">{selectedCategory?.name} Quiz</h3>
				</section>
				<QuestionCard
					category={selectedCategory}
					setShowScoreModal={setShowScoreModal}
					startQuiz={startQuiz}
					setStartQuiz={setStartQuiz}
				/>
			</main>
			{!showScoreModal
				? modal && (
						<Modal>
							<RulesModal setStartQuiz={setStartQuiz} />
						</Modal>
				  )
				: modal && (
						<Modal>
							<ScoreModal />
						</Modal>
				  )}
		</div>
	);
};
