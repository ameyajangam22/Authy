const Navbar = (props) => {
	return (
		<>
			<div className="bg-gray-800 flex items-center p-4">
				<div className="text-3xl text-white mr-auto">
					<h2 className="font-bold uppercase ">Authy</h2>
				</div>
				{props.userName ? (
					<div>
						<a
							href="http://localhost:8000/logout"
							className="bg-red-600 cursor-pointer hover:bg-red-800 transition ease-in-out duration-300 text-xl p-2 text-white"
						>
							Logout
						</a>
					</div>
				) : (
					<></>
				)}
			</div>
		</>
	);
};

export default Navbar;
