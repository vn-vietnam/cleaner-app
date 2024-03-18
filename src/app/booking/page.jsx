"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GlobalApi from "../apiService/GlobalApi";
import { useSession } from "next-auth/react";
import BookingSection from "./_components/BookingSection";

function page() {
	const { data } = useSession();
	const [bookingHistory, setBookingHistory] = useState([]);
	useEffect(() => {
		data && GetUserBookingHistory();
	}, [data]);

	/**
	 * Used to Get User Booking History
	 */
	const GetUserBookingHistory = () => {
		GlobalApi.GetUserBookingHistory(data.user.email).then((resp) => {
			console.log(resp);
			setBookingHistory(resp.bookings);
		});
	};

	return (
		<div className="my-10 mx-5 md:mx-36">
			<h2 className="font-bold text-[20px] my-2">My Bookings</h2>
			<BookingSection bookingHistory={bookingHistory} getUserBookingHistory = {GetUserBookingHistory} />
		</div>
	);
}

export default page;
