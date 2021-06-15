import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MyTesting from "./Components/Other/MyTesting";
import Home from "./Components/Other/Home";
import Error404 from "./Components/Other/Error404";

import UserContribution from "./Components/Feature/UserContribution";

export default class App extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>

					<Route exact path="/user-contribution">
						<UserContribution />
					</Route>

					<Route exact path="/testing">
						<MyTesting />
					</Route>

					<Route exact path="/404">
						<Error404 />
					</Route>

					<Route path="*">
						<Error404 />
					</Route>
				</Switch>
			</Router>
		);
	}
}
