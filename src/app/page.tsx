"use client";
import DateAndAddress from "@/components/DateAndAddress";
import TicketsContainer from "@/components/TicketsContainer";

import { formatAmount } from "@/lib/utils";
import Recents from "@/components/Recents";

import { useGetAllData } from "@/hooks/useGetAllData";
import Image from "next/image";

export default function Home() {
	const { data, isLoading } = useGetAllData();
	
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
				<TicketsContainer />
				<DateAndAddress />
			</div>
			<p className="text-center text-pretty text-sm mt-auto">
				All proceeds will go directly to flood relief efforts. Thank you for
				your support!
			</p>
		</section>
	);
}
