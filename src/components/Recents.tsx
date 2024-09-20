"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatAmount } from "@/lib/utils";
import { tickets } from "@/static/tickets";
import { Donation, Ticket } from "@/app/shared/types";
import { useGetAllData } from "@/hooks/useGetAllData";

const Recents = () => {
	const { data, isLoading } = useGetAllData();

	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (!data) return
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % data?.recents.length);
		}, 3000); // Change slide every 3 seconds

		return () => clearInterval(interval);
	}, [data]);

	return (
		<div>
			<h3 className="text-2xl text-pretty text-center mb-3">
				Recent Massive Donations
			</h3>
			<div className="relative w-full min-h-16 sm:min-h-8 text-clip overflow-x-hidden">
				{!isLoading && data && <AnimatePresence>
					{data.recents.map(
						(recent: Ticket | Donation, index: number) =>
							index === currentIndex && (
								<motion.div
									key={index}
									initial={{ x: "100%", opacity: 0 }}
									animate={{ x: "0%", opacity: 1 }}
									exit={{ x: "-100%", opacity: 0 }}
									transition={{ duration: 0.5 }}
									className="absolute w-full text-center text-transparent bg-gradient-to-r from-[#00BFFF]  via-[#0048BD] to-[#0048BD] bg-clip-text"
								>
									{(recent as Ticket).ticket_type ? (
										<span>
											{(recent as Ticket).name} bought a ticket for{" "}
											{formatAmount(
												parseFloat(
													tickets.find(
														(t) => t.value === (recent as Ticket).ticket_type
													)?.price || "0"
												)
											)}{" "}
											MMK
										</span>
									) : (
										<span>
											{(recent as Donation).email} donated{" "}
											{formatAmount(parseFloat((recent as Donation).amount))}{" "}
											MMK
										</span>
									)}
								</motion.div>
							)
					)}
				</AnimatePresence>}
			</div>
		</div>
	);
};

export default Recents;
