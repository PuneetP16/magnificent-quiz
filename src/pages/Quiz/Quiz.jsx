import { Modal, QuestionCard, RulesModal, ScoreModal } from "components";
import { useModal, useQuiz } from "contexts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Quiz.css";

export const Quiz = () => {
	const { allQuizQuestions, setScore } = useQuiz();
	const { categoryId } = useParams();
	const { modal, setModal } = useModal();

	const [isQuizComplete, setIsQuizComplete] = useState(false);

	const selectedCategory = allQuizQuestions.find(
		(category) => category._id === categoryId
	);

	useEffect(() => {
		setModal(true);
		setScore((score) => ({ ...score, current: 0 }));
	}, []);

	return (
		<div className="home_page">
			<main className="main--homepage">
				<section className="quiz__header">
					<h3 className="h3 section__heading">{selectedCategory?.name} Quiz</h3>
				</section>
				<QuestionCard
					category={selectedCategory}
					setIsQuizComplete={setIsQuizComplete}
				/>
			</main>
			{!isQuizComplete
				? modal && (
						<Modal>
							<RulesModal />
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
