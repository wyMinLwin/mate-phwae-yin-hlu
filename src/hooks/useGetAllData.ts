import { Donation, Ticket } from "@/app/shared/types";
import { tickets } from "@/static/tickets";
import { useQuery } from "@tanstack/react-query";
const staticTickets = tickets;
export const useGetAllData = () =>
	useQuery({
		queryKey: ["MasterData"],
		queryFn: async () => {
			try {
				const ticketsResponse = await fetch(
					"http://mate-phwae-yin-hlu.up.railway.app/api/tickets/"
				);
				const donationResponse = await fetch(
					"http://mate-phwae-yin-hlu.up.railway.app/api/donate/"
				);
				if (ticketsResponse.ok && donationResponse.ok) {
					const tickets: Ticket[] = await ticketsResponse.json();
					const donations: Donation[] = await donationResponse.json();
					const totalDonation = donations.reduce((acc, curr) => {
						return acc + parseFloat(curr.amount);
					}, 0);
					const totalTicket = tickets.reduce((acc, curr) => {
						return (
							acc +
							parseFloat(
								staticTickets.find((t) => t.value === curr.ticket_type)
									?.price || "0"
							)
						);
					}, 0);
					const totalFunding = totalDonation + totalTicket;
					const recents = [
						...tickets.filter((ticket) =>
							["3", "4"].includes(ticket.ticket_type)
						),
						...donations.filter(
							(donation) => parseFloat(donation.amount) >= 50000
						),
					];
					return {
						tickets,
						donations,
						totalFunding,
						recents,
					};
				} else {
					throw new Error("Interval Server Error!");
				}
			} catch {
				throw new Error("Interval Server Error!");
			}
		},
	});
