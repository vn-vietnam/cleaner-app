import React from "react";
import CategoryList from "../_components/CategoryList";
import { Handshake, Home, Hourglass } from "lucide-react";

function page() {
	return (
		<div className="">
			<CategoryList />
			<div className="flex justify-center items-center min-h-[250px] flex-col gap-5">
				<Home size={100}  />
				<div>Select type of house</div>
			</div>
		</div>
	);
}

export default page;
