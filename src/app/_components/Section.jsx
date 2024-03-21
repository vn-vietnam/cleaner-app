import React from "react";

function Section() {
	return (
		<section>
			<div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
					<div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
						<img
							alt=""
							src="/house.jpg"
							className="absolute inset-0 h-full w-full object-cover"
						/>
					</div>

					<div className="lg:py-24">
						<h2 className="text-3xl font-bold sm:text-4xl">
							Discover Your Ideal Home with{" "}
							<span className="text-red-700">HomeFinder</span>
						</h2>

						<p className="mt-4 text-gray-600">
							Our user-friendly platform empowers you to explore various options,
							compare features, and connect with trusted real estate
							professionals to make informed decisions. At HomeFinder, we're
							dedicated to helping you discover a space that suits your
							lifestyle, preferences, and budget. Start your journey to finding
							the ideal home today with HomeFinder
						</p>

						<a
							href="/category"
							className="mt-8 inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
						>
							Get Started Today
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Section;
