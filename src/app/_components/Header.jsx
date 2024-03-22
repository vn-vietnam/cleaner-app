"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Home } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlobalApi from "../apiService/GlobalApi";

function Header() {
	const { data } = useSession();

	const [cate, setCate] = useState();

	const getCate = () => {
		GlobalApi.getCategory().then((e)=>{
			// console.log(e.categories)
			setCate(e.categories)
		});
	};
	useEffect(() => {
		getCate();
	}, []);

	return (
		<header className="bg-white">
			<div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<div className="md:flex md:items-center md:gap-12">
						<a className="block text-teal-600" href="/">
							<span className="sr-only">Home</span>
							<Image src="./logo.svg" alt="logo" width={30} height={30} />
						</a>
					</div>
					<div className="hidden md:block">
						<nav aria-label="Global">
							<NavigationMenu>
								<NavigationMenuList>
									<NavigationMenuItem>
										<NavigationMenuTrigger>Menu</NavigationMenuTrigger>
										<NavigationMenuContent>
											<ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
												<li className="row-span-3">
													<NavigationMenuLink asChild>
														<Link
															className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md hover:bg-slate-400 hover:bg-gradient-to-t transition-all ease-linear"
															href="/"
														>
															<Home width={50} height={50} />
															<div className="mb-2 mt-4 text-lg font-medium">
																Home Page
															</div>
															<p className="text-sm leading-tight text-muted-foreground">
																Your Gateway to the Perfect Hom
															</p>
														</Link>
													</NavigationMenuLink>
												</li>
												<Link
													href="/blog"
													title="Blog"
													className="rounded-md bg-gradient-to-b hover:bg-slate-400 hover:bg-gradient-to-t transition-all ease-linear from-muted/50 to-muted p-3 no-underline outline-none focus:shadow-md text-sm"
												>
													<div className="text-md font-bold">Blog</div>
													<div className="leading-tight text-muted-foreground">
														The Art of Finding Home: Stories and Strategies from
														HomeFinder
													</div>
												</Link>
												<Link
													href="/contact"
													title="Contact"
													className="rounded-md bg-gradient-to-b hover:bg-slate-400 hover:bg-gradient-to-t transition-all ease-linear from-muted/50 to-muted p-3 no-underline outline-none focus:shadow-md text-sm"
												>
													<div className="text-md font-bold">Contact</div>
													<div className="leading-tight text-muted-foreground">
														Get in Touch with HomeFinder
													</div>
												</Link>
												<Link
													href="/policy"
													title="Privacy and Terms"
													className="rounded-md bg-gradient-to-b hover:bg-slate-400 hover:bg-gradient-to-t transition-all ease-linear from-muted/50 to-muted p-3 no-underline outline-none focus:shadow-md text-sm"
												>
													<div className="text-md font-bold">
														Privacy and Terms
													</div>
													<div className="leading-tight text-muted-foreground">
														Guide to Privacy and Terms
													</div>
												</Link>
												{/* <Link
													href="/workers/signup"
													title="Sign as worker"
													className="rounded-md bg-gradient-to-b hover:bg-slate-400 hover:bg-gradient-to-t transition-all ease-linear from-muted/50 to-muted p-3 no-underline outline-none focus:shadow-md text-sm"
												>
													<div className="text-md font-bold">Sign as worker</div>
													<div className="leading-tight text-muted-foreground">
														Lorem ipsum dolor sit amet consectetur.
													</div>
												</Link> */}
												{/* <Link
													href="/workers"
													title="Workers"
													className="rounded-md bg-gradient-to-b hover:bg-slate-400 hover:bg-gradient-to-t transition-all ease-linear from-muted/50 to-muted p-3 no-underline outline-none focus:shadow-md text-sm"
												>
													<div className="text-md font-bold">Workers</div>
													<div className="leading-tight text-muted-foreground">
														Find the best workers
													</div>
												</Link> */}
											</ul>
										</NavigationMenuContent>
									</NavigationMenuItem>
									<NavigationMenuItem>
										<NavigationMenuTrigger>Category</NavigationMenuTrigger>
										<NavigationMenuContent>
											<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
												{cate?.map((e, index) => (
													<Link
														key={index}
														href={'/category/'+e?.id}
														title="Blog"
														className="rounded-md bg-gradient-to-b hover:bg-slate-400 hover:bg-gradient-to-t transition-all ease-linear from-muted/50 to-muted p-3 no-underline outline-none focus:shadow-md text-sm"
													>
														<div className="text-md font-bold">{e?.name}</div>
														<div className="leading-tight text-muted-foreground line-clamp-2">
															{e?.description}
														</div>
													</Link>
												))}
											</ul>
										</NavigationMenuContent>
									</NavigationMenuItem>
								</NavigationMenuList>
							</NavigationMenu>
						</nav>
					</div>
					<div className="flex items-center gap-4">
						{data ? (
							<>
								<div className="flex sm:gap-4">
									<Image
										src={data?.user?.image}
										alt={data?.user?.name}
										width={20}
										height={20}
										className="rounded-full w-[40px] h-[40px]"
									/>
									<Link
										href={"/booking"}
										className="hidden sm:block rounded-md bg-slate-400 px-5 py-2.5 text-sm font-medium text-white shadow cursor-pointer"
									>
										My Booking
									</Link>
									<div
										className="hidden sm:block rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white shadow cursor-pointer"
										onClick={() => signOut("descope", { callbackUrl: "/" })}
									>
										Logout
									</div>
								</div>
							</>
						) : (
							<>
								<div className="sm:flex sm:gap-4">
									<div
										className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow cursor-pointer"
										onClick={() =>
											signIn("descope", { callbackUrl: "/" })
										}
									>
										Login
									</div>
								</div>
							</>
						)}

						<div className="block md:hidden">
							<DropdownMenu>
								<DropdownMenuTrigger>
									<div className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth="2"
										>
											<path
												strokeinecap="round"
												strokeLinejoin="round"
												d="M4 6h16M4 12h16M4 18h16"
											/>
										</svg>
									</div>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									{data ? (
										<>
											<DropdownMenuLabel>Hello {data?.user?.name}</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<DropdownMenuItem>
												<Link href={"/booking"} alt="my booking">
													My Booking
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Link href={"/category"} alt="category">
													Category
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Link href={"/post"} alt="post">
													Post new
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Link href={"/contact"} alt="Contact">
													Contact
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Link href={"/policy"} alt="Privacy and Terms">
												Privacy and Terms
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Link href={"/blog"} alt="Blog">
													Blog
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem onClick={() => signOut()}>
												Logout
											</DropdownMenuItem>
										</>
									) : (
										<>
											{/* <DropdownMenuLabel>Cleaner App</DropdownMenuLabel> */}
											<DropdownMenuSeparator />
											<DropdownMenuItem>
												<Link href={"/category"} alt="category">
													Category
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Link href={"/contact"} alt="Contact">
													Contact
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Link href={"/policy"} alt="Privacy and Terms">
												Privacy and Terms
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Link href={"/blog"} alt="Blog">
													Blog
												</Link>
											</DropdownMenuItem>
										</>
									)}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
