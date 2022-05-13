import { createContext, useContext, useEffect, useState } from "react";
import { getAllQuizQuestions } from "utils/firebaseServices";
import { ROUTES } from "utils/routes";
import { useAlert } from "./alertContext";

const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
	const { setAlert } = useAlert();
	const initialQuizQuestionData = JSON.parse(
		localStorage.getItem(ROUTES.quizQuestionData)
	);

	const [allQuizQuestions, setAllQuizQuestions] = useState(
		initialQuizQuestionData ?? []
	);

	useEffect(() => {
		console.log(allQuizQuestions);
		if (allQuizQuestions.length < 1) {
			getAllQuizQuestions(setAlert, allQuizQuestions, setAllQuizQuestions);
		}
	}, [allQuizQuestions, setAlert]);

	const value = { allQuizQuestions, setAllQuizQuestions };

	return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
