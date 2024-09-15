import { Payment } from "@/app/shared/types";
import { useGetPaymentMethods } from "@/hooks/useGetPaymentMethods";
import React from "react";
import { Skeleton } from "./ui/skeleton";

const PaymentMethods = () => {
	const { data: paymentMethods, isLoading } = useGetPaymentMethods();

	return isLoading ? (
		<div className="border-[1px] p-2 rounded-xl flex flex-col gap-1">
			<Skeleton className="h-5 w-full bg-dark/20" />
			<Skeleton className="h-5 w-full bg-dark/20" />
			<Skeleton className="h-5 w-full bg-dark/20" />
		</div>
	) : (
		<div className="border-[1px] p-2 rounded-xl">
			{paymentMethods?.map((method: Payment, index: number) => (
				<div key={index}>
					<h5>{method.name}</h5>
					<h5>{method.account}</h5>
					<p>{method.description}</p>
				</div>
			))}
		</div>
	);
};

export default PaymentMethods;
