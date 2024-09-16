"use client";
import React from "react";
import { motion } from "framer-motion";
import { tickets } from "@/static/tickets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { formatAmount } from "@/lib/utils";
import PaymentDialog from "./PaymentDialog";

const svgs = [
	"programmer_pass",
	"tech_explorer",
	"digital_architect",
	"it_elite",
];

const gradientsClass: { [key: string]: string } = {
	"1": "",
	"2": "",
	"3": "from-[#2d388a] to-[#00aeef]",
	"4": "from-[#00e5ff] to-[#1200ff]",
};

const TicketsContainer = () => {
	return (
		<div>
			<h3 className="text-center text-pretty text-xl mb-3">
				Tickets you can buy
			</h3>
			<div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-3">
				{tickets.map((ticket, index) => (
					<motion.div
						key={ticket.value}
						initial={{ y: 100, scale: 0 }}
						animate={{ y: 0, scale: 1 }}
						transition={{
							delay: index * 0.1,
							duration: 0.5,
							ease: "easeInOut",
							type: "tween",
						}}
					>
						<Card>
							<CardHeader>
								<Image
									priority
									src={`/${svgs[index]}.svg`}
									alt={svgs[index] + "svg"}
									width={80}
									height={80}
								/>
							</CardHeader>
							<CardContent>
								<div className="flex flex-col gap-2.5">
									<CardTitle className="tracking-wide">{ticket.name}</CardTitle>

									<span>{formatAmount(Number(ticket.price))} MMK</span>
									<div className="relative group">
										<motion.div
											className="relative w-full z-20"
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											initial={{ y: 20, opacity: 0 }}
											animate={{ y: 0, opacity: 1 }}
											transition={{
												type: "spring",
												stiffness: 300,
												damping: 20,
											}}
										>
											<PaymentDialog type="tickets" option={ticket.value}>
												<Button variant="default" className="w-full">
													Buy
												</Button>
											</PaymentDialog>
										</motion.div>
										<div
											className={`absolute -inset-[1px] bg-gradient-to-r rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-700 group-hover:duration-200 z-10 ${
												gradientsClass[ticket.value as string]
											}`}
										></div>
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				))}
			</div>
		</div>
	);
};

export default TicketsContainer;
