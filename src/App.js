import Login from "./pages/Login";
import Main from "./pages/Main";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import OrganisationPage from "./pages/OrganisationPage";
function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/" component={Login} />
					<Route exact path="/main" component={Main} />
					<Route
						exact
						path="/organisations/:orgId"
						component={OrganisationPage}
					/>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
