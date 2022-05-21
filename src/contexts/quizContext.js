import { createContext, useContext, useEffect, useState } from "react";
import {
	getAllQuizQuestions,
	fetchUserData,
	addUserToDb,
} from "utils/firebaseServices";
import { ROUTES } from "utils/routes";
import { useAlert } from "./alertContext";
import { useAuth } from "./authContext";

const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);
const initialPlayedQuizData = {
	gameWins: 0,
	totalScore: 0,
	highestScore: 0,
	gamePlayed: 0,
};

export const QuizProvider = ({ children }) => {
	const { setAlert } = useAlert();

	const {
		authState: { token, name, email, profilePhoto, id },
	} = useAuth();
	const initialQuizQuestionData = JSON.parse(
		localStorage.getItem(ROUTES.quizQuestionData)
	);

	const [allQuizQuestions, setAllQuizQuestions] = useState(
		initialQuizQuestionData ?? []
	);

	const [quizSummary, setQuizSummary] = useState({
		questions: [],
		categoryName: "",
	});

	const [playedQuizData, setPlayedQuizData] = useState(initialPlayedQuizData);
	const [flag, setFlag] = useState(false);

	const [score, setScore] = useState(0);

	useEffect(() => {
		if (allQuizQuestions.length < 1) {
			getAllQuizQuestions(setAlert, allQuizQuestions, setAllQuizQuestions);
		}
	}, [allQuizQuestions, setAlert]);

	const userData = { ...playedQuizData, name, email, profilePhoto, id };

	useEffect(() => {
		(async () => {
			setPlayedQuizData(initialPlayedQuizData);
			try {
				if (token) {
					const response = await fetchUserData(email, setAlert);
					if (response.exists()) {
						setPlayedQuizData(response.data());
					} else {
						// add if user is not in database
						addUserToDb(email, userData, setAlert);
						setPlayedQuizData(response.data());
						setFlag(true);
					}
				}
			} catch (error) {
				setAlert((a) => ({
					...a,
					visibility: true,
					text: error.message,
					type: "alert--info",
				}));
			}
		})();
		const flagTimer = setTimeout(() => {
			setFlag(false);
		}, 100);
		return () => {
			clearTimeout(flagTimer);
		};
	}, [email, token, flag]);

	const value = {
		allQuizQuestions,
		setAllQuizQuestions,
		score,
		setScore,
		playedQuizData,
		setPlayedQuizData,
		quizSummary,
		setQuizSummary,
	};

	return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
