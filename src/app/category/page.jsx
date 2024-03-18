import React from "react";
import CategoryList from "../_components/CategoryList";
import { Handshake } from "lucide-react";

function page() {
	return (
		<div className="">
			<CategoryList />
			<div className="flex justify-center items-center min-h-[250px]">
				<Handshake size={100} color="#ff00a2" strokeWidth={1.25} />
			</div>
		</div>
	);
}

export default page;
