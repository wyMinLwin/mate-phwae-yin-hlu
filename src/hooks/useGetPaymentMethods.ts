import { useQuery } from "@tanstack/react-query";

export const useGetPaymentMethods = () =>
	useQuery({
		queryKey: ["PaymentMethods"],
		queryFn: async () => {
			try {
				const response = await fetch(
					"https://mate-phwae-yin-hlu.up.railway.app/api/payment-methods/"
				);
				const data = await response.json();
				if (response.ok) {
					return data;
				} else {
					throw new Error("Failed To Load Data!");
				}
			} catch {
				throw new Error("Interval Server Error!");
			}
		},
	});
