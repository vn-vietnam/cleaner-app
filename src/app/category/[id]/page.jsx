"use client";
import CategoryList from "@/app/_components/CategoryList";
import GlobalApi from "@/app/apiService/GlobalApi";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function page() {
	const param = useParams();
	// console.log(param.id);

	const [businessbyCate, setBusinessbyCate] = useState([]);
	useEffect(() => {
		getBusinessByCate();
	}, []);
	const getBusinessByCate = () => {
		GlobalApi.getBusinessByCategory(param.id).then((resp) => {
			setBusinessbyCate(resp.businesses);
			// console.log(resp.businesses);
		});
	};

	return (
		<div>
			<CategoryList paramId={param.id} />
			<div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-10">
				<div className="flex justify-between w-full flex-col">
					<h2 className="font-bold text-[22px]">Workers</h2>
				</div>
				<div
					className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
    lg:grid-cols-4 gap-6 mt-5 "
				>
					{businessbyCate.length > 0
						? businessbyCate.map((business, index) => (
								<Link
									href={"/details/" + business.id}
									key={business.id}
									className="shadow-md 
            rounded-lg hover:shadow-lg cursor-pointer
             hover:shadow-primary
             hover:scale-105 transition-all ease-in-out"
								>
									<Image
										src={business?.image?.url}
										alt={business.name}
										width={500}
										height={200}
										className="h-[150px] md:h-[200px]
                object-cover rounded-lg"
									/>
									<div
										className="flex flex-col 
                items-baseline p-3 gap-1"
									>
										<h2 className="font-bold text-lg">{business?.name}</h2>
										<div className="flex flex-wrap">
											{business?.categories?.map((e, index) => (
												<div className="" key={index}>
													<div
														// href={"/category/" + e.id}
														className="p-1 bg-purple-200
                    text-primary rounded-full px-2
                     text-[12px] hover:bg-purple-300"
													>
														{e?.name}
													</div>
												</div>
											))}
										</div>
										<h2 className="text-primary">{business?.email}</h2>
										<h2 className="text-gray-500 text-sm">
											{business?.address}
										</h2>
										<Button className="rounded-lg mt-3">Book Now</Button>
									</div>
								</Link>
						  ))
						: [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
								<div
									key={index}
									className="w-full h-[300px]
        bg-slate-200 rounded-lg animate-pulse"
								></div>
						  ))}
				</div>
			</div>
		</div>
	);
}

export default page;
