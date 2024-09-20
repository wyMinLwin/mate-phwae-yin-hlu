"use client";
import React from "react";
import { Calendar } from "./ui/calendar";
import { motion } from "framer-motion";

const DateAndAddress = () => {
	const calendarVariants = {
		hidden: { scale: 0, x: "-100px" },
		visible: { scale: 1, x: "0%" },
	};

	const timeVariants = {
		hidden: { scale: 0, x: "100px" },
		visible: { scale: 1, x: "0%" },
	};

	const transition = { duration: 0.5, ease: "easeInOut", once: true };

	return (
		<div className="min-w-full h-fit">
			<h3 className="text-center text-pretty text-xl mb-3">Date And Place</h3>
			<div className="w-full grid grid-cols-1 sm:grid-cols-2">
				<motion.div
					initial="hidden"
					whileInView="visible"
					className="flex flex-col items-center"
					variants={calendarVariants}
					transition={transition}
					viewport={{ once: true }}
				>
					<Calendar selected={[new Date("2024-09-29")]} />
					<div className="mt-2 w-3/5  flex justify-start items-center gap-2">
						<div className="w-3 h-3 rounded-full border-[1px] border-primary"></div>
						<div>Today</div>
					</div>
					<div className="w-3/5 flex justify-start items-center gap-2">
						<div className="w-3 h-3 rounded-full bg-primary border-[1px] border-primary"></div>
						<div>Event Date</div>
					</div>
				</motion.div>
				<motion.div
					className="pt-3 flex flex-col gap-4 items-center "
					initial="hidden"
					whileInView="visible"
					variants={timeVariants}
					transition={transition}
					viewport={{ once: true }}
				>
					<div className="w-3/5">
						<h4 className="text-pretty text-lg font-medium">Time</h4>
						<div className="flex flex-col items-start gap-1 ">
							<h5>From 9:00 AM</h5>
							<h5>To 5:00 PM</h5>
						</div>
					</div>
					<div className="w-3/5">
						<h4 className="text-pretty text-lg font-medium">Place</h4>
						<div className="flex flex-col items-start gap-1 ">
							<h5>Central International School (Parami Campus)</h5>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default DateAndAddress;
