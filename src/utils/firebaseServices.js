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
	// collection,
	doc,
	// addDoc,
	updateDoc,
	// deleteDoc,
	realTimeDBRef,
	firebaseRealtimeDB,
} from "firebase.config";
import { child, get } from "firebase/database";
import { ROUTES } from "./routes";
import { getDoc, setDoc } from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// update userdata after playing quiz
export const updateDbUserData = async (email, playedQuizData, setAlert) => {
	const currentUser = doc(firestore, `users/${email}`);
	try {
		await updateDoc(currentUser, playedQuizData);
	} catch (error) {
		setAlert((a) => ({
			...a,
			visibility: true,
			text: error.message,
			type: "alert--info",
		}));
	}
};

export const googleLoginHandler = async (authDispatch, setAlert) => {
	try {
		const response = await signInWithPopup(firebaseAuth, googleProvider);
		authDispatch({
			type: "AUTHENTICATION",
			payload: {
				token: response.user.accessToken,
				user: response.user.providerData[0],
			},
		});

		setAlert((a) => ({
			...a,
			visibility: true,
			text: "Login Successfull",
			type: "alert--success",
		}));
	} catch (error) {
		setAlert((a) => ({
			...a,
			visibility: true,
			text: error.message,
			type: "alert--info",
		}));
	}
};

export const facebookLoginHandler = async (authDispatch, setAlert) => {
	try {
		const response = await signInWithPopup(firebaseAuth, facebookProvider);
		authDispatch({
			type: "AUTHENTICATION",
			payload: {
				token: response.user.accessToken,
				user: response.user.providerData[0],
			},
		});

		setAlert((a) => ({
			...a,
			visibility: true,
			text: "Login Successfull",
			type: "alert--success",
		}));
	} catch (error) {
		setAlert((a) => ({
			...a,
			visibility: true,
			text: error.message,
			type: "alert--info",
		}));
	}
};

export const emailLoginHandler = async (
	email,
	password,
	authDispatch,
	setAlert
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

		setAlert((a) => ({
			...a,
			visibility: true,
			text: "Login Successfull",
			type: "alert--success",
		}));
	} catch (error) {
		setAlert((a) => ({
			...a,
			visibility: true,
			text: error.message,
			type: "alert--info",
		}));
	}
};

export const emailSignupHandler = async (
	email,
	password,
	authDispatch,
	setAlert
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

		setAlert((a) => ({
			...a,
			visibility: true,
			text: "Account Created Successfully",
			type: "alert--success",
		}));
	} catch (error) {
		setAlert((a) => ({
			...a,
			visibility: true,
			text: error.message,
			type: "alert--info",
		}));
	}
};

export const passwordResetHandler = (email, setAlert) => {
	try {
		sendPasswordResetEmail(firebaseAuth, email);

		setAlert((a) => ({
			...a,
			visibility: true,
			text: "Check your mailbox, to reset password",
			type: "alert--success",
		}));
	} catch (error) {
		setAlert((a) => ({
			...a,
			visibility: true,
			text: error.message,
			type: "alert--info",
		}));
	}
};

export const getAllQuizQuestions = async (
	setAlert,
	allQuizQuestions,
	setAllQuizQuestions
) => {
	const dbRef = realTimeDBRef(firebaseRealtimeDB);
	try {
		const allQuestions = await get(child(dbRef, "quizDb"));
		setAllQuizQuestions(allQuestions.val());

		if (allQuizQuestions.length > 1) {
			localStorage.setItem(ROUTES.quizQuestionData, allQuestions.val());
		}
	} catch (error) {
		setAlert((a) => ({
			...a,
			visibility: true,
			text: error.message,
			type: "alert--info",
		}));
	}
};

export const addUserToDb = async (email, userData, setAlert) => {
	const addUser = doc(firestore, `users/${email}`);
	try {
		await setDoc(addUser, userData, { merge: true });
	} catch (error) {
		setAlert((a) => ({
			...a,
			visibility: true,
			text: error.message,
			type: "alert--info",
		}));
	}
};

export const fetchUserData = async (email, setAlert) => {
	const selectedUser = doc(firestore, `users/${email}`);
	let response;
	try {
		response = await getDoc(selectedUser);
	} catch (error) {
		setAlert((a) => ({
			...a,
			visibility: true,
			text: error.message,
			type: "alert--info",
		}));
	}

	return response;
};
