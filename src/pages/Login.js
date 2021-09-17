const Login = () => {
	return (
		<>
			<div className="mt-4 grid grid-cols-1  justify-center items-center gap-10">
				<div className="col-span-1  justify-center flex">
					<h1 className="text-4xl font-bold">Login</h1>
				</div>
				<div className="col-span-1 justify-center flex">
					<a
						href="http://localhost:8000/google"
						className="text-center hover:bg-red-600 transition ease-in-out duration-300 text-white text-xl font-medium w-80  bg-red-500 py-4 px-4"
					>
						Google
					</a>
				</div>
				<div className="col-span-1 justify-center flex">
					<a
						href="http://localhost:8000/facebook"
						className="text-center hover:bg-blue-800 transition ease-in-out duration-300 text-white text-xl font-medium w-80  bg-blue-600 py-4 px-4"
					>
						Facebook
					</a>
				</div>
			</div>
		</>
	);
};

export default Login;
