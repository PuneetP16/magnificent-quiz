import { useQuiz } from "contexts";
import "./SummaryCard.css";

export const SummaryCard = () => {
	const { quizSummary } = useQuiz();

	const getOptionStyle = (ques, answer, option) => {
		if (option === answer && answer === ques.answer) {
			return "correct_answer";
		} else if (option === answer) {
			return "wrong_answer";
		} else if (!!answer && option === ques.answer) {
			return "correct_answer";
		}
	};

	return (
		<section className="summary__card">
			{quizSummary?.questions.map((ques, index) => (
				<section key={index} className="summary__question_wrapper">
					<div className="summary__question">
						Question: {ques.selectedQuestion.question}
					</div>
					<section className="summary__answer_section">
						{ques.selectedQuestion.options.map((option, index) => (
							<button
								className={`option__container ${getOptionStyle(
									ques.selectedQuestion,
									ques.selectedAnswer,
									option
								)}`}
								type="text"
								key={index}
							>
								{option}
							</button>
						))}
					</section>
				</section>
			))}
		</section>
	);
};
