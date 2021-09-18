import { useEffect, useState } from "react";

const SearchBar = (props) => {
	const [searchInput, setSearchInput] = useState("");
	const [users, setUsers] = useState([]);
	const [searches, setSearches] = useState([]);
	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name == "searchInput") {
			setSearchInput(value);
		}
		console.log(searchInput);
	};
	const handleAddUser = async (e) => {
		// const response=await fetch(`/addUser/${userId}/${props.orgId}`)
		//const data=await response.json();
	};
	useEffect(async () => {
		const response = await fetch("/getUsers");
		const data = await response.json();
		setUsers(data);
	}, []);
	useEffect(() => {
		let matches = users.filter((user) => {
			// const regex = new RegExp(`^${searchInput}`, "gi");
			let stringToCheck = user.userName;
			let inp = searchInput.toLowerCase();
			if (stringToCheck.toLowerCase().includes(inp) && user.id !== props.userId)
				return true;
			return false;
		});
		setSearches(matches);
		if (searchInput == "") setSearches([]);
	}, [searchInput]);
	return (
		<>
			<div
				id="searchBar"
				className="bg-white flex w-4/5 m-auto mt-2 items-center rounded-md border-2 border-gray-200"
			>
				<input
					className="rounded-l-md w-full px-6 py-2 text-gray-700 leading-tight 
                    focus:outline-none"
					id="search for users"
					type="text"
					name="searchInput"
					value={searchInput}
					placeholder="Search for people to add"
					onChange={handleChange}
				></input>
				<button className="bg-green-500 text-white px-6 w-20 py-2">Add</button>
			</div>
			<div className="bg-white flex divide-y-2 flex-col w-4/5 m-auto mb-10 items-center rounded-md border-2 border-gray-200">
				{searches.length > 0 &&
					searches.map((search) => {
						return (
							<>
								<div
									onClick={() => {
										setSearchInput(search.userName);
										setSearches([]);
									}}
									className="p-2 flex cursor-pointer flex-col  gap-1  w-full hover:bg-gray-100 transition ease-in-out duration-300"
								>
									<div className="text-lg">{search.userName}</div>
									<div className="text-sm font-medium text-gray-500">
										{search.email}
									</div>
								</div>
							</>
						);
					})}
			</div>
		</>
	);
};

export default SearchBar;
