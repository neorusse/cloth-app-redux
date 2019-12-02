import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyA0F_nUSQFsw5Jtz6Hfo78-BUflSV3rBak',
	authDomain: 'learning-react-db.firebaseapp.com',
	databaseURL: 'https://learning-react-db.firebaseio.com',
	projectId: 'learning-react-db',
	storageBucket: 'learning-react-db.appspot.com',
	messagingSenderId: '270843835698',
	appId: '1:270843835698:web:e40d9ed9cb3f9083ecd32b',
	measurementId: 'G-MKDY705BZ1'
};

// store user profile in firestore db
export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	// query our firestore db
	const userRef = firestore.doc(`users/${userAuth.uid}`);

	// retrieve doc snapshot from doc ref
	const snapShot = await userRef.get();

	// check if document (user details) does not exist in firestore DB
	if (!snapShot.exits) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}

	// if user exist already, return the user
	return userRef;
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
