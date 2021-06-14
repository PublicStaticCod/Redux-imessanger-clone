import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBeuuTIICXVjYcZp2qakM1B_2QNq4k1PAo',
	authDomain: 'fb-mern-7e551.firebaseapp.com',
	databaseURL: 'https://fb-mern-7e551.firebaseio.com',
	projectId: 'fb-mern-7e551',
	storageBucket: 'fb-mern-7e551.appspot.com',
	messagingSenderId: '926432272439',
	appId: '1:926432272439:web:e2272b9f631cf48b6a1fb2',
	measurementId: 'G-ZJ7HV6DHTR',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
