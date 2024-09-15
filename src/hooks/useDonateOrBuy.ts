import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDonateOrBuy = (type: "tickets" | "donate") => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["DonateOrBuy"],
		mutationFn: async (data: FormData) => {
			const response = await fetch(
				`https://mate-phwae-yin-hlu.up.railway.app/api/${type}/`,
				{
					method: "POST",

					body: data,
				}
			);

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["MasterData"],
			});
		},
	});
};
