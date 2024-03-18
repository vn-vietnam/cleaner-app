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
		<div className="flex w-full justify-center gap-3">
			{categoryList.map((e, index) => (
				<Link
					href={"/category/" + e.id}
					className={`flex flex-col min-w-[100px] items-center gap-2 border-[1px] p-3 rounded-lg hover:bg-purple-100 cursor-pointer" +
							${e.id === paramId ? "border-[red]" : ""}`}
					key={index}
				>
					<div>
						<Image src={e?.icon?.url} alt="icon" width={50} height={50} />
					</div>
					<div className="text-xs text-center text-slate-400">{e?.name}</div>
				</Link>
			))}
		</div>
	);
}

export default CategoryList;
