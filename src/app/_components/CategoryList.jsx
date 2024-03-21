"use client";
import React, { useEffect, useState } from "react";
import GlobalApi from "../apiService/GlobalApi";
import Image from "next/image";
import Link from "next/link";

function CategoryList({ paramId }) {
	const [categoryList, setCategoryList] = useState([]);
	useEffect(() => {
		getCategory();
	
	}, []);
	const getCategory = () => {
		GlobalApi.getCategory().then((resp) => {
			setCategoryList(resp.categories);
			// console.log(resp.categories);
		});
	};
	return (
		<div className="flex w-full justify-start xl:justify-center gap-3 overflow-x-auto p-5">
			{categoryList.map((e, index) => (
				<Link
					href={"/category/" + e.id}
					className={`flex flex-col min-w-[100px]  min-h-[100px]  items-center gap-2 rounded-lg hover:font-bold cursor-pointer `}
					key={index}
				>
					<div>
						<img
							src={e?.icon?.url}
							alt="icon"
							className="w-full xl:w-[100px] h-[100px] rounded-lg object-cover"
						/>
					</div>
					<div
						className={`text-xs text-center text-slate-400 w-[100px] ${
							e.id === paramId ? "text-red-500 font-bold" : ""
						} `}
					>
						{e?.name}
					</div>
				</Link>
			))}
		</div>
	);
}

export default CategoryList;
