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

	const transition = { duration: 0.5, ease: "easeInOut" , once: true};

	return (
		<div className="min-w-full h-fit">
			<h3 className="text-center text-pretty text-xl mb-3">Date And Venue</h3>
			<div className="w-full grid grid-cols-1 sm:grid-cols-2 place-items-center">
				<motion.div
					initial="hidden"
					whileInView="visible"
					variants={calendarVariants}
					transition={transition}
					viewport={{ once: true }}

				>
					<Calendar />
				</motion.div>
				<motion.div
					className="pt-2 flex flex-col gap-4"
					initial="hidden"
					whileInView="visible"
					variants={timeVariants}
					transition={transition}
					viewport={{ once: true }}

				>
					<div>
						<h4 className="text-pretty text-lg font-medium">Time</h4>
						<div className="flex items-center gap-1 ">
							<div className="flex flex-col gap-0.5">
								<span className="relative w-10 h-6 bg-gray-300 rounded-t-lg overflow-hidden">
									<span className="absolute left-[50%] -translate-x-[50%] bottom-0 translate-y-[50%] text-5xl">
										1
									</span>
								</span>
								<span className="relative w-10 h-6 bg-gray-300 rounded-b-lg overflow-hidden">
									<span className="absolute left-[50%] -translate-x-[50%] top-0 -translate-y-[50%] text-5xl">
										1
									</span>
								</span>
							</div>
							<div className="flex flex-col gap-0.5">
								<span className="relative w-10 h-6 bg-gray-300 rounded-t-lg overflow-hidden">
									<span className="absolute left-[50%] -translate-x-[50%] bottom-0 translate-y-[50%] text-5xl">
										0
									</span>
								</span>
								<span className="relative w-10 h-6 bg-gray-300 rounded-b-lg overflow-hidden">
									<span className="absolute left-[50%] -translate-x-[50%] top-0 -translate-y-[50%] text-5xl">
										0
									</span>
								</span>
							</div>
							<div className="flex flex-col gap-0.5">
								<span className="relative w-10 h-6 bg-gray-300 rounded-t-lg overflow-hidden">
									<span className="absolute left-[50%] -translate-x-[50%] bottom-0 translate-y-[50%] text-5xl">
										3
									</span>
								</span>
								<span className="relative w-10 h-6 bg-gray-300 rounded-b-lg overflow-hidden">
									<span className="absolute left-[50%] -translate-x-[50%] top-0 -translate-y-[50%] text-5xl">
										3
									</span>
								</span>
							</div>
							<div className="flex flex-col gap-0.5">
								<span className="relative w-10 h-6 bg-gray-300 rounded-t-lg overflow-hidden">
									<span className="absolute left-[50%] -translate-x-[50%] bottom-0 translate-y-[50%] text-5xl">
										0
									</span>
								</span>
								<span className="relative w-10 h-6 bg-gray-300 rounded-b-lg overflow-hidden">
									<span className="absolute left-[50%] -translate-x-[50%] top-0 -translate-y-[50%] text-5xl">
										0
									</span>
								</span>
							</div>
							<div className="flex flex-col gap-0.5">
								<span className="relative w-10 h-6 bg-gray-300 rounded-t-lg overflow-hidden">
									<span className="absolute left-[50%] -translate-x-[50%] bottom-0 translate-y-[50%] text-5xl">
										A
									</span>
								</span>
								<span className="relative w-10 h-6 bg-gray-300 rounded-b-lg overflow-hidden">
									<span className="absolute left-[50%] -translate-x-[50%] top-0 -translate-y-[50%] text-5xl">
										A
									</span>
								</span>
							</div>
							<div className="flex flex-col gap-0.5">
								<span className="relative w-11 h-6 bg-gray-300 rounded-t-lg overflow-hidden">
									<span className="absolute left-[50%] -translate-x-[50%] bottom-0 translate-y-[50%] text-5xl">
										M
									</span>
								</span>
								<span className="relative w-11 h-6 bg-gray-300 rounded-b-lg overflow-hidden">
									<span className="absolute left-[50%] -translate-x-[50%] top-0 -translate-y-[50%] text-5xl">
										M
									</span>
								</span>
							</div>
						</div>
					</div>
					<div>
						<h4 className="text-pretty text-lg font-medium">Venue</h4>
						<div>BreadTalk, Junction City</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default DateAndAddress;
