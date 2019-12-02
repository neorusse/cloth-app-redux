import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.componenet';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
	// method to close onAuthStateChanged
	unsubscribeFromAuth = null;

	// open subscription -> auth.onAuthStateChanged
	// list to state changes in our auth system, & set current user
	componentDidMount() {
		const { setCurrentUser } = this.props;
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			// if user is signed-in
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				// get the user detail & save it in state
				userRef.onSnapshot(snapshot => {
					setCurrentUser({
						currentUser: {
							id: snapshot.id,
							...snapshot.data()
						}
					});
				});
			}

			// if userAuth is null, i.e user is not signed in, set current user to null
			setCurrentUser(userAuth);
		});
	}

	// closing subscription -> auth.onAuthStateChanged
	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		return (
			<div>
				<Header />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/shop" component={ShopPage} />
					<Route
						path="/signin"
						render={() =>
							this.props.currentUser ? (
								<Redirect to="/" />
							) : (
								<SignInAndSignUpPage />
							)
						}
					/>
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentUser: state.user.currentUser
});

const mapDispatchToProps = dispatch => ({
	setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
