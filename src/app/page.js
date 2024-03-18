"use client";
import Banner from "./_components/Banner";
import Section from "./_components/Section";
import Testimonial from "./_components/Testimonial";
import Newspaper from "./_components/Newspaper";
import { useEffect, useState } from "react";
import GlobalApi from "./apiService/GlobalApi";

export default function Home() {
	const [categoryList, setCategoryList] = useState([]);
	useEffect(() => {
		getCategoryList();
	}, []);
	const getCategoryList = () => {
		GlobalApi.getCategory().then((resp) => {
			setCategoryList(resp.categories);
		});
	};
	return (
		<>
			<Banner />
			<Section />
			<Testimonial />
			<Newspaper categoryList={categoryList} />
		</>
	);
}
