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

function page() {
	const { data } = useSession();
	const [cateList, setCateList] = useState([]);
	const [name, setName] = useState();
	const [contact, setContact] = useState();
	const [address, setAddress] = useState();
	const [email, setEmail] = useState();
	const [about, setAbout] = useState();
	const [opt, setOpt] = useState();
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

	const handleSubmit = (e) => {
		e.preventDefault();

		GlobalApi.createNewBussiness(
			data?.user?.name,
			contact,
			address,
			about,
			data?.user?.email,
			data?.user?.image,
			opt
		).then(
			(resp) => {
				// console.log(resp);
				if (resp) {
					toast({
						title: "Alert: Please waiting for admin check profile",
					});
					// Toast Msg
					router.push("/");
				}
			},
			(e) => {
				toast({
					title: "Something Wrong",
				});

			}
		);
	};

	return (
		<div className="flex flex-col w-full h-[500px] justify-center items-center gap-10 my-5">
			<div className="text-3xl gap-5">Sign as</div>
			<div className="flex gap-5 sm:flex-row flex-col">
				<Link
					href={"/"}
					className="w-[200px] h-[200px] p-2 bg-red-300 flex justify-center items-center font-bold hover:bg-red-500 cursor-pointer rounded-xl"
				>
					User
				</Link>

				<AlertDialog>
					<AlertDialogTrigger>
						<div className="w-[200px] h-[200px] p-2 bg-red-300 flex justify-center items-center font-bold hover:bg-red-500 cursor-pointer rounded-xl">
							Employer
						</div>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Please fill all information in the form?</AlertDialogTitle>
							<AlertDialogDescription className="flex flex-col gap-3">
								<Input
									className=""
									placeholder="Name"
									onChange={(e) => setName(e.target.value)}
									value={name}
								/>
								<Input
									className=""
									placeholder="Contact"
									onChange={(e) => setContact(e.target.value)}
								/>
								<Input
									className=""
									placeholder="Address"
									onChange={(e) => setAddress(e.target.value)}
								/>
								<Input
									className=""
									value={email}
									placeholder="Email"
									onChange={(e) => setEmail(e.target.value)}
								/>
								<Input
									className=""
									placeholder="About me"
									onChange={(e) => setAbout(e.target.value)}
								/>
								<select name="" id="" onChange={(e) => setOpt(e.target.value)}>
									{cateList?.map((e, index) => (
										<option key={index} value={e.id}>
											{e.name}
										</option>
									))}
								</select>
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
