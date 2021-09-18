import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import OrganisationCard from "../components/OrganisationCard";

const Main = () => {
	const history = useHistory();
	const [username, setUserName] = useState("");
	const [userId, setUserId] = useState("");
	const [orgName, setOrgName] = useState("");
	const [orgInfo, setOrgInfo] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [organisations, setOrganisations] = useState([]);
	const [orgUpdate, setOrgUpdate] = useState(false);
	const handleOrganisationAdd = async () => {
		const response = await fetch(`/addOrganisation/${userId}`, {
			method: "POST",
			body: JSON.stringify({
				orgInfo: orgInfo,
				orgName: orgName,
			}),
			headers: {
				"content-type": "application/json",
			},
		});
		setOrgUpdate(!orgUpdate);
		setShowModal(false);
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name == "orgInfo") {
			setOrgInfo(value);
		} else if (name == "orgName") {
			setOrgName(value);
		}
	};
	const handleSortByDate = async () => {
		setOrganisations((org) => [
			...org.sort((a, b) => {
				return a.relations[0].createdAt < b.relations[0].createdAt ? 1 : -1;
			}),
		]);
	};
	const handleSortByName = async () => {
		// let data = organisations;
		// data = await data.sort();
		setOrganisations((org) => [
			...org.sort((a, b) => {
				return a.orgName < b.orgName ? -1 : 1;
			}),
		]);
		// setOrgUpdate(!orgUpdate);
	};
	useEffect(async () => {
		const response = await fetch("/me");
		const data = await response.json();
		if (!data) {
			history.replace("/");
		}
		console.log("DAATTA", data);
		setUserName(data.userName);
		setUserId(data.id);
		setOrgUpdate(!orgUpdate);
	}, []);
	useEffect(async () => {
		const response = await fetch(`/getOrganisations/${userId}`);
		const data = await response.json();
		setOrganisations(data);
		console.log("useEffect ran");
	}, [orgUpdate]);
	return (
		<>
			<Navbar userName={username} />
			<h1 className="font-bold text-2xl">Welcome,{username}</h1>
			<div className="grid grid-cols-8  gap-10 items-center">
				<div
					onClick={() => {
						setShowModal(true);
					}}
					className="mt-2 col-span-4 flex justify-center font-medium w-96 p-3 rounded hover:bg-green-600 transition ease-in-out duration-300 cursor-pointer text-xl m-auto text-white bg-green-500"
				>
					Create New Organisation
				</div>
				<div
					onClick={handleSortByDate}
					className="p-2 col-span-2 bg-blue-100 font-medium hover:bg-blue-200 transition ease-in-out duration-300 text-center cursor-pointer"
				>
					Sort By Date
				</div>
				<div
					onClick={handleSortByName}
					className="p-2 col-span-2 bg-blue-100 font-medium hover:bg-blue-200 transition ease-in-out duration-300 text-center cursor-pointer"
				>
					Sort By Name
				</div>
			</div>
			<div id="orgArea" className="mt-10 flex flex-col m-auto w-4/5 gap-10">
				{organisations.length > 0 &&
					organisations.map((org) => {
						return (
							<>
								<OrganisationCard
									userId={userId}
									orgId={org.id}
									orgName={org.orgName}
									orgInfo={org.orgInfo}
									isAdmin={org.relations[0].isAdmin}
									createdAt={org.relations[0].createdAt}
								/>
							</>
						);
					})}
			</div>
			{showModal && (
				<Modal
					showModal={showModal}
					onChange={(val) => {
						setShowModal(val);
					}}
					title="Add organisation"
				>
					<div className="flex flex-col gap-3  relative w-4/5 ">
						<input
							className="border-2 px-2  focus:border-blue-400 h-10 rounded-md outline-none shadow-sm"
							type="text"
							name="orgName"
							placeholder="Organisation Name"
							onChange={handleChange}
						/>
						<input
							className="border-2 px-2  focus:border-blue-400 h-10 rounded-md outline-none shadow-sm"
							type="text"
							name="orgInfo"
							placeholder="Organisation Info"
							onChange={handleChange}
						/>
						<button
							onClick={handleOrganisationAdd}
							className="disabled:opacity-50 flex justify-center items-center  bg-green-500 text-lg px-8 py-2  rounded-sm hover:bg-green-600 transition ease-in-out duration-300 text-white w-auto bottom-0"
						>
							Submit
						</button>
					</div>
				</Modal>
			)}
		</>
	);
};

export default Main;
