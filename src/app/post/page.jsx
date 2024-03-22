"use client";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import GlobalApi from "../apiService/GlobalApi";
import { useToast } from "@/components/ui/use-toast";
import { redirect, useRouter } from "next/navigation";
import { CldUploadButton } from "next-cloudinary";
import axios from "axios";
import { ArrowUpLeft, Pen, PenIcon, PenLine, PenTool } from "lucide-react";
function page() {
	const { data } = useSession();
	const [cateList, setCateList] = useState([]);
	const [contact, setContact] = useState();
	const [address, setAddress] = useState();
	const [info, setInfo] = useState();
	const [opt, setOpt] = useState();
	const [price, setPrice] = useState();
	const [facility, setFacility] = useState();
	const { toast } = useToast();
	const router = useRouter();
	useEffect((e) => {
		getBussinessList();
	}, []);
	const getBussinessList = () => {
		GlobalApi.getCategory().then((resp) => {
			setCateList(resp.categories);
		});
	};

	const [file, setFile] = useState(null);
	const [filename, setFilename] = useState("");

	const handleFileChange = (event) => {
		setFile(event.target.files[0]);
		setFilename(event.target.files[0].name);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", "testforproject");

		try {
			const response = await axios.post(
				`https://api.cloudinary.com/v1_1/ddjctqh9z/image/upload`,
				formData
			);

			GlobalApi.createNewBussiness(
				data?.user?.name,
				contact,
				address,
				// info,
				data?.user?.email,
				response?.data?.url,
				opt,
				price
			).then(
				(resp) => {
					if (resp) {
						// console.log(resp);
						toast({
							title: "Success: Please waiting for admin check profile",
						});
						router.push("/");
					}
				},
				(e) => {
					// console.log(e);
					toast({
						title: "Something Wrong",
					});
				}
			);
		} catch (error) {
			toast({
				title: "Something Wrong",
			});
			// console.error(error);
		}
	};

	return (
		<div className="flex flex-col w-full h-[500px] justify-center items-center gap-10 my-5">
			<div className="text-3xl gap-5">Post new</div>
			<div className="flex gap-5 sm:flex-row flex-col">
				<Link
					href={"/"}
					className="w-[200px] h-[200px] p-2 bg-red-300 flex justify-center items-center font-bold hover:bg-red-500 cursor-pointer rounded-xl"
				>
					<ArrowUpLeft />
					Back
				</Link>
				<AlertDialog>
					<AlertDialogTrigger>
						<div className="w-[200px] h-[200px] p-2 bg-red-300 flex justify-center items-center font-bold hover:bg-red-500 cursor-pointer rounded-xl">
							<PenTool />
							Post
						</div>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								Please fill all information in the form?
							</AlertDialogTitle>
							<AlertDialogDescription className="flex flex-col gap-3">
								<Input
									className=""
									placeholder="Price"
									onChange={(e) => setPrice(e.target.value)}
								/>
								<Input
									className=""
									placeholder="Address"
									onChange={(e) => setAddress(e.target.value)}
								/>
								<Input
									className=""
									placeholder="Contact"
									onChange={(e) => setContact(e.target.value)}
								/>
								<select
									name=""
									id=""
									className="border-[1px] rounded-md p-2"
									onChange={(e) => setOpt(e.target.value)}
								>
									{cateList?.map((e, index) => (
										<option key={index} value={e.id}>
											{e.name}
										</option>
									))}
								</select>
								<input onChange={handleFileChange} type="file" />
								{/* <textarea
									className="border-[1px] rounded-md p-2 h-[200px]"
									placeholder="Info house"
									onChange={(e) => setInfo(e.target.value)}
								/> */}
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction onClick={handleSubmit}>
								Continue
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</div>
	);
}

export default page;
