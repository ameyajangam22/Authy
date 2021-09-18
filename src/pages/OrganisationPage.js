import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import SearchBar from "../components/SearchBar";

const OrganisationPage = () => {
	const history = useHistory();
	const [userId, setUserId] = useState("");
	const [userName, setUserName] = useState("");
	const [orgInfo, setOrgInfo] = useState("");
	const [orgUsers, setOrgUsers] = useState([]);
	const [isAdmin, setIsAdmin] = useState(false);
	const params = useParams();
	useEffect(async () => {
		const response = await fetch("/me");
		const data = await response.json();
		if (!data) {
			history.replace("/");
		}
		console.log("DAATTA", data);
		setUserId(data.id);
		setUserName(data.userName);

		// check OrganisationInfo
		const response2 = await fetch(`/getOrganisation/${params.orgId}`);
		const data2 = await response2.json();
		console.log("data2", data2);
		setOrgInfo(data2.orgInfo);

		// check user Role
		const response3 = await fetch(`/checkIsAdmin/${data.id}/${params.orgId}`);
		const data3 = await response3.json();
		setIsAdmin(data3.isAdmin);
	}, []);
	return (
		<>
			<Navbar userName={userName} />

			<div className="grid grid-cols-10 ">
				<div className=" top-2 col-span-8 border-r-2">
					{isAdmin && <SearchBar orgId={params.orgId} userId={userId} />}
					<h2 className="font-medium text-3xl flex justify-center">
						Organisation Info
					</h2>
					<p className="mr-auto">{orgInfo}</p>
					{/* <p>isAdmin {isAdmin == true ? "true" : "false"}</p> */}
				</div>
				<div className="col-span-2 overflow-auto">User List</div>
			</div>
		</>
	);
};

export default OrganisationPage;
