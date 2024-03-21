"use client";
import GlobalApi from "@/app/apiService/GlobalApi";
import { Button } from "@/components/ui/button";
import {
	Contact,
	DollarSign,
	Home,
	HomeIcon,
	LocateIcon,
	Mail,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import FormBooking from "../_components/FormBooking";
import { signIn, useSession } from "next-auth/react";
import parse from "html-react-parser";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
function page() {
	const param = useParams();
	const { data, status } = useSession();
	// console.log(param.id);

	const [businessbyCate, setBusinessbyCate] = useState([]);
	useEffect(() => {
		getBusinessByCate();
		checkUserAuth();
	}, [param]);
	const getBusinessByCate = () => {
		GlobalApi.getSingleBusiness(param.id).then((resp) => {
			setBusinessbyCate(resp.business);
			console.log(resp.business);
		});
	};
	const checkUserAuth = () => {
		if (status == "loading") {
			return <p>Loading...</p>;
		}

		if (status == "unauthenticated") {
			signIn("descope");
		}
	};
	return (
		status == "authenticated" &&
		businessbyCate && (
			<div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-10">
				<div className="flex flex-col gap-5">
					{businessbyCate ? (
						<>
							<Breadcrumb>
								<BreadcrumbList>
									<BreadcrumbItem>
										<BreadcrumbLink href="/">
											<Home />
										</BreadcrumbLink>
									</BreadcrumbItem>
									<BreadcrumbSeparator />
									<BreadcrumbItem>
										{businessbyCate?.categories && (
											<BreadcrumbLink
												href={"/category/" + businessbyCate?.categories[0]?.id}
											>
												{businessbyCate?.categories[0]?.name}
											</BreadcrumbLink>
										)}
									</BreadcrumbItem>
									<BreadcrumbSeparator />
									<BreadcrumbItem>
										<BreadcrumbPage>{businessbyCate.name}</BreadcrumbPage>
									</BreadcrumbItem>
								</BreadcrumbList>
							</Breadcrumb>
							<Image
								src={businessbyCate?.image?.url || "./logo.svg"}
								alt="img"
								width={20}
								height={10}
								className="object-cover md:h-[500px] w-full rounded-lg"
							/>
							<div className="flex flex-col gap-3">
								<div className="text-xl font-bold">{businessbyCate.name}</div>
								<div className="flex gap-3">
									<Contact />
									<div>{businessbyCate.contactPerson}</div>
								</div>
								<div className="flex gap-3">
									<DollarSign />
									<div>${businessbyCate.price}</div>
								</div>
								<div className="flex gap-3">
									<HomeIcon />
									<div>{businessbyCate.address}</div>
								</div>
								<div className="flex gap-3">
									<Mail />
									<div>{businessbyCate.email}</div>
								</div>
								<div className="flex gap-3">
									{businessbyCate?.categories?.map((e, index) => (
										<div
											className="border-[1px] p-2 text-sm rounded-lg bg-blue-200"
											key={index}
										>
											{e.name}
										</div>
									))}
								</div>
								<div className="flex gap-3 flex-wrap">
									{businessbyCate?.facilities?.map((e, index) => (
										<div
											className="border-[1px] p-2 text-sm rounded-lg bg-yellow-200"
											key={index}
										>
											{e}
										</div>
									))}
								</div>
								<FormBooking InfoUser={businessbyCate}>
									<Button className="md:w-[200px]">Appointment</Button>
								</FormBooking>
								<div>{businessbyCate?.info && parse(businessbyCate?.info?.html)}</div>
							</div>
						</>
					) : (
						<></>
					)}
				</div>
			</div>
		)
	);
}

export default page;
