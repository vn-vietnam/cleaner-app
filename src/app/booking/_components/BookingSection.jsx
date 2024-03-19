import React from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import GlobalApi from "@/app/apiService/GlobalApi";
import { toast } from "sonner";
import { useToast } from "@/components/ui/use-toast";

function BookingSection({ bookingHistory, getUserBookingHistory }) {
	const { toast } = useToast();
	const cancelAppointment = (booking) => {
		GlobalApi.deleteBooking(booking).then(
			(resp) => {
				if (resp) {
					toast({
						title: "Deleted",
					});
					getUserBookingHistory();
				}
			},
			(e) => {
				toast({
					title: "Wrong",
				});
			}
		);
	};
	return (
		<>
			<table className=" border-separate border-spacing-2 border border-slate-400 w-full rounded-lg table-auto overflow-x-auto">
				<thead>
					<tr className="text-left">
						{/* <th>ID</th> */}
						<th>Date</th>
						<th>Time</th>
						<th>Worker</th>
						<th>Status</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{bookingHistory.length > 0 &&
						bookingHistory?.map((e, index) => (
							<tr key={index} className="text-sm">
								{/* <td className="">{e?.id}</td> */}
								<td>{e?.date}</td>
								<td>{e?.time}</td>
								<td className="flex items-center gap-1 flex-col sm:flex-row">
									<Image
										src={e?.business?.image?.url}
										alt="img"
										width={30}
										height={30}
										className="rounded-full w-[30px] h-[30px]"
									/>
									<div>{e?.business?.name}</div>
								</td>
								<td>
									<Button>{e?.progressStatus}</Button>
								</td>
								<td>
									<Button
										onClick={() => cancelAppointment(e?.id)}
										className="bg-red-500 cursor-pointer"
									>
										Delete
									</Button>
								</td>
							</tr>
						))}
					{/* <tr>
						<td>Witchy Woman</td>
						<td>The Eagles</td>
						<td>1972</td>
					</tr>
					<tr>
						<td>Shining Star</td>
						<td>Earth, Wind, and Fire</td>
						<td>1975</td>
					</tr> */}
				</tbody>
			</table>
		</>
	);
}

export default BookingSection;
