import { useQuery } from "@tanstack/react-query";

export const useGetPaymentMethods = () => useQuery({
    queryKey: ["PaymentMethods"],
    queryFn: async () => {
        const res = await fetch("/api/payment-methods");
        if (!res.ok) {
            throw new Error("Failed to load data");
        }
        const {data} = await res.json()
        return data;
    }
})