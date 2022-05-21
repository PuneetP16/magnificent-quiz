import {
	signInWithPopup,
	GoogleAuthProvider,
	FacebookAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
} from "firebase/auth";
import {
	firebaseAuth,
	firestore,
	doc,
	updateDoc,
	realTimeDBRef,
	firebaseRealtimeDB,
} from "firebase.config";
import { child, get } from "firebase/database";
import { ROUTES } from "./routes";
import { getDoc, setDoc } from "firebase/firestore";
import { Toast } from "components";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// update the userdata after playing quiz
export const updateDbUserData = async (email, playedQuizData, theme) => {
	const currentUser = doc(firestore, `users/${email}`);
	try {
		await updateDoc(currentUser, playedQuizData);
	} catch (error) {
		Toast("info", error.message, theme);
	}
};

export const googleLoginHandler = async (authDispatch, theme) => {
	try {
		const response = await signInWithPopup(firebaseAuth, googleProvider);
		authDispatch({
			type: "AUTHENTICATION",
			payload: {
				token: response.user.accessToken,
				user: response.user.providerData[0],
			},
		});

		Toast("success", "Successfully Logged In", theme);
	} catch (error) {
		Toast("info", error.message, theme);
	}
};

export const facebookLoginHandler = async (authDispatch, theme) => {
	try {
		const response = await signInWithPopup(firebaseAuth, facebookProvider);
		authDispatch({
			type: "AUTHENTICATION",
			payload: {
				token: response.user.accessToken,
				user: response.user.providerData[0],
			},
		});

		Toast("success", "Successfully Logged In", theme);
	} catch (error) {
		Toast("info", error.message, theme);
	}
};

export const emailLoginHandler = async (
	email,
	password,
	authDispatch,
	theme
) => {
	try {
		const response = await signInWithEmailAndPassword(
			firebaseAuth,
			email,
			password
		);
		authDispatch({
			type: "AUTHENTICATION",
			payload: {
				token: response.user.accessToken,
				user: response.user.providerData[0],
			},
		});

		Toast("success", "Successfully Logged In", theme);
	} catch (error) {
		Toast("info", error.message, theme);
	}
};

export const emailSignupHandler = async (
	email,
	password,
	authDispatch,
	theme
) => {
	try {
		const response = await createUserWithEmailAndPassword(
			firebaseAuth,
			email,
			password
		);
		authDispatch({
			type: "AUTHENTICATION",
			payload: {
				token: response.user.accessToken,
				user: response.user.providerData[0],
			},
		});

		Toast("success", "Account Created Successfully", theme);
	} catch (error) {
		Toast("info", error.message, theme);
	}
};

export const passwordResetHandler = (email, theme) => {
	try {
		sendPasswordResetEmail(firebaseAuth, email);

		Toast("success", "Check your mailbox, to reset password", theme);
	} catch (error) {
		Toast("info", error.message, theme);
	}
};

export const getAllQuizQuestions = async (
	allQuizQuestions,
	setAllQuizQuestions,
	theme
) => {
	const dbRef = realTimeDBRef(firebaseRealtimeDB);
	try {
		const allQuestions = await get(child(dbRef, "quizDb"));
		setAllQuizQuestions(allQuestions.val());

		if (allQuizQuestions.length > 1) {
			localStorage.setItem(ROUTES.quizQuestionData, allQuestions.val());
		}
	} catch (error) {
		Toast("info", error.message, theme);
	}
};

export const addUserToDb = async (email, userData, theme) => {
	const addUser = doc(firestore, `users/${email}`);
	try {
		await setDoc(addUser, userData, { merge: true });
	} catch (error) {
		Toast("info", error.message, theme);
	}
};

export const fetchUserData = async (email, theme) => {
	const selectedUser = doc(firestore, `users/${email}`);
	let response;
	try {
		response = await getDoc(selectedUser);
	} catch (error) {
		Toast("info", error.message, theme);
	}

	return response;
};
