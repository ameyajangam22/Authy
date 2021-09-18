import { Link } from "react-router-dom";

const OrganisationCard = (props) => {
	console.log(props.isAdmin);
	return (
		<>
			<Link to={`/organisations/${props.orgId}`}>
				<div className="bg-gray-50 flex relative cursor-pointer hover:bg-gray-100 transition ease-in-out duration-300 shadow-md p-4 ">
					<div className="font-medium text-2xl">{props.orgName}</div>
					<div className="relative ml-auto bg-purple-600 p-2 text-white">
						{props.isAdmin ? "Admin" : "Reader"}
					</div>
				</div>
			</Link>
		</>
	);
};

export default OrganisationCard;
