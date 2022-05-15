import { useModal, useQuiz } from "contexts";
import { bxIcons } from "data/icons";
import { useEffect, useState } from "react";
import "./QuestionCard.css";

export const QuestionCard = ({
	category,
	setShowScoreModal,
	startQuiz,
	setStartQuiz,
}) => {
	const timerValue = 5;
	const totalQuestions = category?.questions?.length;
	const [questionIndex, setQuestionIndex] = useState(0);
	const [timer, setTimer] = useState(timerValue);
	const questionNumber = questionIndex + 1;
	const [answer, setAnswer] = useState({
		selected: "",
		isCorrect: false,
		correctClass: "correct_answer",
		wrongClass: "wrong_answer",
		correct: 0,
		wrong: 0,
	});

	const { setModal } = useModal();

	const { score, setScore, playedQuizData, setPlayedQuizData } = useQuiz();

	const selectedQuestion = category?.questions[questionIndex];
  
	const quizBoard = [
		{
			icon: bxIcons.timeLeft,
			label: "time left",
			value: `${timer === "stop" ? 0 : timer} sec`,
		},
		{ icon: bxIcons.checkCircle, label: "Score", value: `${score}` },
		{
			icon: bxIcons.book,
			label: "Question",
			value: `${questionNumber} / ${totalQuestions}`,
		},
	];

	const answerChoiceHandler = (selectedAnswer) => {
		setAnswer((a) => ({ ...a, selected: selectedAnswer }));

		if (selectedAnswer === selectedQuestion.answer) {
			setAnswer((a) => ({
				...a,
				isCorrect: true,
				correct: answer.correct + 1,
			}));
			setScore((score) => score + 5);
		} else {
			setAnswer((a) => ({
				...a,
				wrong: answer.wrong + 1,
			}));
		}
	};

	const selectOptionsClass = (option) => {
		if (
			option === answer.selected &&
			answer.selected === selectedQuestion.answer
		) {
			return answer.correctClass;
		} else if (option === answer.selected) {
			return answer.wrongClass;
		} else if (!!answer.selected && option === selectedQuestion.answer) {
			return answer.correctClass;
		} else if (timer === "stop") {
			return "button_disabled";
		}
	};

	useEffect(() => {
		let timeoutId = setTimeout(() => {
			if (startQuiz) {
				if (timer < 1 || !!answer.selected) {
					if (questionIndex < totalQuestions - 1) {
						setQuestionIndex((prevIndex) => prevIndex + 1);
						setAnswer((a) => ({ ...a, selected: "" }));
					} else {
						setShowScoreModal(true);

						if (answer.wrong < 1) {
							setPlayedQuizData((prevData) => ({
								...prevData,
								gameWins: playedQuizData.gameWins + 1,
							}));
						}
						setPlayedQuizData((prevData) => ({
							...prevData,
							gamePlayed: playedQuizData.gamePlayed + 1,
							highestScore:
								playedQuizData.highestScore > score
									? playedQuizData.highestScore
									: score,
							totalScore: playedQuizData.totalScore + score,
						}));

						setModal(true);
						setTimer(timerValue);
						setStartQuiz(false);
					}
					setTimer(timerValue);
				} else {
					setTimer((prevTimer) => prevTimer - 1);
				}
			}
		}, 1000);
		return () => clearTimeout(timeoutId);
	}, [timer, startQuiz]);

	return (
		<article className="question__card">
			<section className="question__section">
				<img
					className="image--responsive question__image"
					src={selectedQuestion?.img}
					alt={category?.name}
				/>
				<div className="question__container">
					<div className="question__number">Question No: {questionNumber}</div>
					<div className="question">{selectedQuestion?.question}</div>
					<div className="quiz__board">
						{quizBoard.map((boardItem, index) => (
							<div key={index} className="quiz__board__item">
								<div className="board__icon">{boardItem.icon}</div>
								<div className="board__text">
									<div className="board__value">{boardItem.value}</div>
									<div className="board__label">{boardItem.label}</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
			<section className="answer__section bottom__buffer">
				{selectedQuestion?.options.map((option, index) => (
					<div key={index}>
						<button
							className={`option__container ${selectOptionsClass(option)} ${
								!!answer.selected ? "button_disabled" : ""
							}`}
							onClick={() => answerChoiceHandler(option)}
							disabled={!!answer.selected || timer === "stop"}
							type="button"
						>
							{option}
						</button>
					</div>
				))}
			</section>
		</article>
	);
};
