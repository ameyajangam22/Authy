import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Navbar from "../components/Navbar";

const Main = () => {
	const history = useHistory();
	const [username, setUserName] = useState("");

	const handleOrganisationAdd = () => {
		alert("Organisation will be added ");
	};

	useEffect(async () => {
		const response = await fetch("/me");
		const data = await response.json();
		if (!data) {
			history.replace("/");
		}
		console.log("DAATTA", data);
		setUserName(data.userName);
	}, []);
	return (
		<>
			<Navbar userName={username} />
			<h1 className="font-bold text-2xl">Welcome,{username}</h1>
			<div
				onClick={handleOrganisationAdd}
				className="mt-2 flex justify-center font-medium w-96 p-3 rounded hover:bg-green-600 transition ease-in-out duration-300 cursor-pointer text-xl m-auto text-white bg-green-500"
			>
				Create New Organisation
			</div>
			<div id="orgArea"></div>
		</>
	);
};

export default Main;
