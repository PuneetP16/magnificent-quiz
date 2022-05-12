import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getDatabase, get, ref as realTimeDBRef } from "firebase/database";
import {
	getFirestore,
	collection,
	addDoc,
	setDoc,
	getDoc,
	getDocs,
	updateDoc,
	doc,
	deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);
const firebaseAuth = getAuth(app);
const firebaseRealtimeDB = getDatabase(app);

export {
	app,
	firestore,
	collection,
	doc,
	addDoc,
	updateDoc,
	setDoc,
	getDoc,
	getDocs,
	firebaseRealtimeDB,
	realTimeDBRef,
	ref,
	getDownloadURL,
	firebaseAuth,
	deleteDoc,
	storage,
	get,
};
