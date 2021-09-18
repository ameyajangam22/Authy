import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Navbar from "../components/Navbar";

const Main = () => {
	const history = useHistory();
	const [username, setUserName] = useState("");
	useEffect(async () => {
		const response = await fetch("/me");
		const data = await response.json();
		if (!data) {
			history.replace("/");
		}
		console.log("DAATTA", data);
		setUserName(data.displayName);
	}, []);
	return (
		<>
			<Navbar userName={username} />
			<h1 className="font-bold text-2xl">Welcome,{username}</h1>
		</>
	);
};

export default Main;
