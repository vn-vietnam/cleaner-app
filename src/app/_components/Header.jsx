"use client";
import Image from "next/image";
import React from "react";
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

const linksMenu = [
	{
		url: "/category/1",
		name: "Home",
		information: "Lorem ipsum dolor sit amet.",
	},
	{
		url: "/contact",
		name: "Contact",
		information: "Lorem ipsum dolor sit amet.",
	},
	{
		url: "/works",
		name: "Search",
		information: "Lorem ipsum dolor sit amet.",
	},
	{
		url: "/policy",
		name: "Policy",
		information: "Lorem ipsum dolor sit amet.",
	},
	{
		url: "/category",
		name: "Category",
		information: "Lorem ipsum dolor sit amet.",
	},
];

function Header() {
	const { data } = useSession();
	// console.log(data);

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
															<Home />
															<div className="mb-2 mt-4 text-lg font-medium">
																Home Page
															</div>
															<p className="text-sm leading-tight text-muted-foreground">
																Beautifully designed components built with Radix
																UI and Tailwind CSS.
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
														Lorem ipsum dolor sit amet consectetur.
													</div>
												</Link>
												<Link
													href="/contact"
													title="Contact"
													className="rounded-md bg-gradient-to-b hover:bg-slate-400 hover:bg-gradient-to-t transition-all ease-linear from-muted/50 to-muted p-3 no-underline outline-none focus:shadow-md text-sm"
												>
													<div className="text-md font-bold">Contact</div>
													<div className="leading-tight text-muted-foreground">
														Lorem ipsum dolor sit amet consectetur.
													</div>
												</Link>
												<Link
													href="/workers"
													title="Workers"
													className="rounded-md bg-gradient-to-b hover:bg-slate-400 hover:bg-gradient-to-t transition-all ease-linear from-muted/50 to-muted p-3 no-underline outline-none focus:shadow-md text-sm"
												>
													<div className="text-md font-bold">Workers</div>
													<div className="leading-tight text-muted-foreground">
														Find the best workers
													</div>
												</Link>
											</ul>
										</NavigationMenuContent>
									</NavigationMenuItem>
									<NavigationMenuItem>
										<NavigationMenuTrigger>Category</NavigationMenuTrigger>
										<NavigationMenuContent>
											<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
												{linksMenu.map((e, index) => (
													<Link
														key={index}
														href={e.url}
														title="Blog"
														className="rounded-md bg-gradient-to-b hover:bg-slate-400 hover:bg-gradient-to-t transition-all ease-linear from-muted/50 to-muted p-3 no-underline outline-none focus:shadow-md text-sm"
													>
														<div className="text-md font-bold">{e.name}</div>
														<div className="leading-tight text-muted-foreground">
															{e.information}
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
										Booking
									</Link>
									<div
										className="hidden sm:block rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white shadow cursor-pointer"
										onClick={() => signOut()}
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
										onClick={() => signIn("descope", { callbackUrl: "/" })}
									>
										Login
									</div>

									<div className="hidden sm:flex">
										<div
											className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
											onClick={() => signIn("descope", { callbackUrl: "/" })}
										>
											Register
										</div>
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
											<DropdownMenuLabel>My Account</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<DropdownMenuItem>
												<Link href={"/booking"} alt="my booking">
													My Booking
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem onClick={() => signOut()}>
												Logout
											</DropdownMenuItem>
										</>
									) : (
										<>
											<DropdownMenuLabel>Cleaner App</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<DropdownMenuItem>
												<Link href={"/category"} alt="category">
													Category
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Link href={"/workers"} alt="worker">
													Workers
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
