"use client";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import moment from "moment";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import GlobalApi from "@/app/apiService/GlobalApi";
import { useToast } from "@/components/ui/use-toast";

function FormBooking({ children, InfoUser }) {
	const [date, setDate] = useState(new Date());
	const [timeSlot, setTimeSlot] = useState([]);
	const [selectedTime, setSelectedTime] = useState();
	const [bookedSlot, setBookedSlot] = useState([]);
	const { data } = useSession();
	const { toast } = useToast();
	// console.log(data);
	const getTime = () => {
		const timeList = [];
		for (let i = 10; i <= 12; i++) {
			timeList.push({
				time: i + ":00 AM",
			});
			timeList.push({
				time: i + ":30 AM",
			});
		}
		for (let i = 1; i <= 6; i++) {
			timeList.push({
				time: i + ":00 PM",
			});
			timeList.push({
				time: i + ":30 PM",
			});
		}

		setTimeSlot(timeList);
	};

	useEffect(() => {
		getTime();
	}, []);

	// console.log(InfoUser)

	useEffect(() => {
		date && BusinessBookedSlot();
	}, [date]);

	/**
	 * Get Selected Date Business Booked Slot
	 */
	const BusinessBookedSlot = () => {
		GlobalApi.BusinessBookedSlot(
			InfoUser.id,
			moment(date).format("DD-MMM-yyyy")
		).then((resp) => {
			// console.log(resp.bookings)
			setBookedSlot(resp.bookings);
		});
	};

	const saveBooking = () => {
		GlobalApi.createNewBooking(
			InfoUser.id,
			moment(date).format("DD-MMM-yyyy"),
			selectedTime,
			data.user.email,
			data.user.name
		).then(
			(resp) => {
				// console.log(resp);
				if (resp) {
					setDate();
					setSelectedTime("");
					toast({
						title: "Scheduled: setup",
					});
					// Toast Msg
				}
			},
			(e) => {
				toast({
					title: "Something Wrong",
				});
				//Error Toast Msg
			}
		);
	};

	const isSlotBooked = (time) => {
		return bookedSlot.find((item) => item.time == time);
	};

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className="overflow-auto">
				<SheetHeader>
					<SheetTitle>Booking Form</SheetTitle>
					<SheetDescription>
						Select Date and Time slot to book an service
					</SheetDescription>
				</SheetHeader>
				<div className="flex flex-col gap-5 items-baseline">
					<h2 className="mt-5 font-bold">Select Date</h2>

					<Calendar
						mode="single"
						selected={date}
						onSelect={setDate}
						className="rounded-md border "
						disabled={(date) => date < new Date()}
					/>
				</div>
				{/* Time Slot Picker  */}
				<h2 className="my-5 font-bold">Select Time Slot</h2>
				<div className="grid grid-cols-3 gap-3">
					{timeSlot.map((item, index) => (
						<Button
							key={index}
							disabled={isSlotBooked(item.time)}
							variant="outiline"
							className={`border rounded-full 
                p-2 px-3 hover:bg-primary
                 hover:text-white
                 ${selectedTime == item.time && "bg-primary text-white"}`}
							onClick={() => setSelectedTime(item.time)}
						>
							{item.time}
						</Button>
					))}
				</div>
				<SheetFooter className="mt-5">
					<SheetClose asChild>
						<div className="flex gap-5">
							<Button variant="destructive" className="">
								Cancel
							</Button>

							<Button
								disabled={!(selectedTime && date)}
								onClick={() => saveBooking()}
							>
								Book
							</Button>
						</div>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}

export default FormBooking;
