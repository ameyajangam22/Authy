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
	const [updateUserList, setUpdateUserList] = useState(false);
	const params = useParams();

	const handleMakeAdmin = async (userId) => {
		const response = await fetch(`/makeAdmin/${userId}/${params.orgId}`, {
			method: "PATCH",
		});
		setUpdateUserList(!updateUserList);
	};
	const handleRemoveAdmin = async (userId) => {
		const response = await fetch(`/removeAdmin/${userId}/${params.orgId}`, {
			method: "PATCH",
		});
		setUpdateUserList(!updateUserList);
	};
	const handleDeleteUser = async (userId) => {
		const response = await fetch(`/deleteUser/${userId}/${params.orgId}`, {
			method: "DELETE",
		});
		setUpdateUserList(!updateUserList);
	};
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
	useEffect(async () => {
		// get User List
		const response4 = await fetch(`/getUserList/${params.orgId}`);
		const data4 = await response4.json();
		setOrgUsers(data4);
	}, [updateUserList]);
	return (
		<>
			<Navbar userName={userName} />

			<div className="grid grid-cols-10 ">
				<div className=" top-2 col-span-8 border-r-2">
					{isAdmin && (
						<SearchBar
							updateUserListFunc={() => {
								setUpdateUserList(!updateUserList);
							}}
							orgId={params.orgId}
							userId={userId}
						/>
					)}
					<h2 className="font-medium text-3xl flex justify-center">
						Organisation Info
					</h2>
					<p className="mr-auto">{orgInfo}</p>
					{/* <p>isAdmin {isAdmin == true ? "true" : "false"}</p> */}
				</div>
				<div className="col-span-2 overflow-auto">
					User List
					<div className="flex flex-col divide-y-2">
						{orgUsers.map((user) => {
							return (
								<>
									<div className="p-4  gap-2 grid grid-cols-4  items-center ">
										<h1 className="col-span-1">{user.userName}</h1>
										{user.relations[0].isAdmin ? (
											isAdmin && user.id != userId ? (
												<>
													<div
														onClick={() => {
															handleRemoveAdmin(user.id);
														}}
														className="cursor-pointer transition col-span-2 ease-in-out duration-300 hover:bg-red-700 bg-red-600  ml-auto px-2 py-1 text-white"
													>
														Dismiss
													</div>
													<div className="bg-purple-600 col-span-1 ml-auto px-2 py-1 text-white">
														Admin
													</div>
												</>
											) : (
												<div className="bg-purple-600 col-span-3 ml-auto px-2 py-1 text-white">
													Admin
												</div>
											)
										) : (
											<>
												{isAdmin ? (
													<>
														<div
															onClick={() => {
																handleDeleteUser(user.id);
															}}
															className="cursor-pointer transition col-span-1 ease-in-out duration-300 text-center w-full hover:bg-red-600 bg-red-500  ml-auto px-2 py-1 text-white"
														>
															Kick
														</div>
														<div
															onClick={() => {
																handleMakeAdmin(user.id);
															}}
															className="col-span-1 text-xs text-center w-full bg-yellow-400 text-white px-1 py-1 pb-2 cursor-pointer hover:bg-yellow-500 transition ease-in-out duration-300"
														>
															Make Admin
														</div>
													</>
												) : (
													<div className="col-span-1"></div>
												)}
												<div className="col-span-1 bg-blue-500 ml-auto px-2 py-1 text-white">
													Reader
												</div>
											</>
										)}
									</div>
								</>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default OrganisationPage;
