"use client";
import DateAndAddress from "@/components/DateAndAddress";
import TicketsContainer from "@/components/TicketsContainer";
import {useScrollTo} from 'framer-motion-scroll-to-hook'

import { formatAmount } from "@/lib/utils";
import Recents from "@/components/Recents";

import { useGetAllData } from "@/hooks/useGetAllData";
import Image from "next/image";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PaymentDialog from "@/components/PaymentDialog";
import { motion } from "framer-motion";

export default function Home() {
	const { data, isLoading } = useGetAllData();
	const scrollTo = useScrollTo()

	return (
		<section className="w-full h-full p-3 flex flex-col items-center gap-5">
			<Image
				src="/event_logo.png"
				priority
				width={200}
				height={155}
				alt="Event Logo PNG"
				style={{ width: "200", height: "auto" }}
			/>
			<div className="mb-10">
				<h2 className="text-2xl text-pretty text-center">Total Funding</h2>
				<div className="text-4xl font-medium">
					{isLoading || !data ? (
						"---,---"
					) : (
						<span>{formatAmount(data?.totalFunding)}</span>
					)}
					<span>MMK</span>
				</div>
			</div>
			<div className="flex flex-col gap-8 w-full">
				<Recents />
				<div className="flex flex-col items-center">
					<h3 className="text-center text-pretty text-xl mb-3">
						You can donate directly here
					</h3>
					<PaymentDialog type="donate">
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
								<Button variant="default" className="w-full">
									Donate Now
								</Button>
							</motion.div>
							<div
								className={`absolute -inset-[1px] bg-gradient-to-r from-[#031b88] to-[#5972fb] rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-700 group-hover:duration-200 z-10 `}
							></div>
						</div>
					</PaymentDialog>
				</div>
				<TicketsContainer />
				<DateAndAddress />
			</div>
			<p className="text-center text-pretty text-sm mt-auto">
				All proceeds will go directly to flood relief efforts. Thank you for
				your support!
			</p>
			<Dialog defaultOpen>
				<DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
					<DialogHeader className="flex flex-col items-center">
						<Image
							src="/event_logo.png"
							priority
							width={100}
							height={77.5}
							alt="Event Logo PNG"
							style={{ width: "100", height: "auto" }}
						/>
						<DialogTitle>Options</DialogTitle>
					</DialogHeader>
					<div className="grid grid-cols-2 gap-4">
						<PaymentDialog type="donate">
							<div className="cursor-pointer active:scale-95 hover:scale-105 transition duration-300 flex flex-col justify-center items-center border-2 border-dashed p-4 rounded-xl">
								<Image
									src={"/donate.svg"}
									alt="donate"
									width={80}
									height={80}
								/>
								<p className="font-medium mt-3">Direct Donate</p>
							</div>
						</PaymentDialog>

						<DialogClose className="col-span-1" onClick={() => scrollTo(document.querySelector('#tickets-container'))}>
							<div className="cursor-pointer active:scale-95 hover:scale-105 transition duration-300 flex flex-col justify-center items-center border-2 border-dashed p-4 rounded-xl">
								<Image
									src={"/ticket.svg"}
									alt="donate"
									width={80}
									height={80}
								/>
								<p className="font-medium mt-3">Buy Ticket</p>
							</div>
						</DialogClose>
					</div>
					<DialogClose asChild className="w-fit mx-auto tracking-wider">
						<Button variant="default" className="w-[180px]">
							Later
						</Button>
					</DialogClose>
				</DialogContent>
			</Dialog>
		</section>
	);
}
