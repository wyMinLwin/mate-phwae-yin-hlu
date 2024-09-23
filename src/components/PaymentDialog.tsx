"use client";
import React, { useMemo, useRef } from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { tickets } from "@/static/tickets";
import { formatAmount } from "@/lib/utils";
import PaymentMethods from "./PaymentMethods";
import { useDonateOrBuy } from "@/hooks/useDonateOrBuy";
import { useToast } from "@/hooks/use-toast";

import { AlertDialog, AlertDialogContent } from "./ui/alert-dialog";
import { CheckCircledIcon } from "@radix-ui/react-icons";

const donateFormSchema = z.object({
	email: z.string({ required_error: "Email Required" }).email(),
	phone: z
		.string({ required_error: "Phone Required" })
		.regex(/^\+?\d{10,}$/, { message: "Enter a valid phone number" }),
	amount: z
		.string({ required_error: "Amount Required" })
		.regex(/^\d+$/, { message: "Amount must be a number" }),
	screenshot: z.instanceof(File, { message: "Screenshot Required" }).refine(
		(file) => {
			return file;
		},
		{ message: "Screenshot Required" }
	),
});

const buyTicketFormSchema = z
	.object({
		name: z
			.string({ required_error: "Name Required" })
			.min(1, {
				message: "Name Required",
			})
			.regex(/^[a-zA-Z\s]*$/, {
				message: "Name can only contain letters and spaces",
			}),

		email: z.string({ required_error: "Email Required" }).email(),
		phone: z
			.string({ required_error: "Phone Required" })
			.regex(/^\+?\d{10,}$/, { message: "Enter a valid phone number" }),
		ticket_type: z.string(),
		screenshot: z.instanceof(File).optional(),
		cupon_code: z.string().optional(),
	})
	.refine((data) => data.screenshot || data.cupon_code, {
		message: "Either Screenshot or Cupon Code is required",
		path: ["cupon_code"],
	})
	.refine((data) => data.screenshot || data.cupon_code, {
		message: "Either Screenshot or Cupon Code is required",
		path: ["screenshot"],
	});

const PaymentDialog = ({
	children,
	option,
	type,
}: {
	children: React.ReactNode;
	option?: string;
	type: "donate" | "tickets";
}) => {
	const hiddenBtnRef = useRef<HTMLButtonElement>(null!);
	const [isSuccess, setIsSuccess] = React.useState(false);
	const { toast } = useToast();

	const {
		mutateAsync: buyTicketAPI,
		isPending: buyingTicket,
		isSuccess: ticketBought,
	} = useDonateOrBuy("tickets");
	const {
		mutateAsync: donateAPI,
		isPending: donating,
		isSuccess: donated,
	} = useDonateOrBuy("donate");

	const optionNameToRender = useMemo(() => {
		const ticket = tickets.find((t) => t.value === option);
		if (!ticket) return "";
		return `${formatAmount(Number(ticket.price))} - ${ticket.name}`;
	}, [option]);

	const donateForm = useForm<z.infer<typeof donateFormSchema>>({
		resolver: zodResolver(donateFormSchema),
		defaultValues: {
			email: "",
			phone: "",
			amount: "",
		},
	});
	const buyTicketForm = useForm<z.infer<typeof buyTicketFormSchema>>({
		resolver: zodResolver(buyTicketFormSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			ticket_type: option,
		},
	});

	function onDoate(values: z.infer<typeof donateFormSchema>) {
		const formData = new FormData();
		formData.append("email", values.email);
		formData.append("phone", values.phone);
		formData.append("amount", values.amount.toString());
		formData.append("screenshot", values.screenshot);
		donateAPI(formData, {
			onSuccess: () => {
				donateForm.reset();
				setIsSuccess(true);
			},
			onError: () => {
				toast({
					title: "Failed to donate",
					description: "Please try again alter!",
					variant: "destructive",
				});
			},
			onSettled: () => {
				hiddenBtnRef.current.click();
			},
		});
	}

	function onBuyTicket(values: z.infer<typeof buyTicketFormSchema>) {
		const formData = new FormData();
		formData.append("name", values.name);
		formData.append("email", values.email);
		formData.append("phone", values.phone);
		formData.append("ticket_type", values.ticket_type);
		formData.append("cupon_code", values.cupon_code || "");
		if (values.screenshot) {
			formData.append("screenshot", values.screenshot);
		}
		buyTicketAPI(formData, {
			onSuccess: () => {
				buyTicketForm.reset();
				setIsSuccess(true);
			},
			onError: () => {
				toast({
					title: "Failed to buy ticket",
					description: "Please try again alter!",
					variant: "destructive",
				});
			},
			onSettled: () => {
				hiddenBtnRef.current.click();
			},
		});
	}

	return (
		<>
			<Dialog>
				<DialogTrigger asChild>{children}</DialogTrigger>
				<DialogContent
					aria-describedby="payment dialog "
					className="max-h-[95svh] overflow-y-auto"
				>
					<DialogClose ref={hiddenBtnRef} className="hidden"></DialogClose>
					<DialogHeader>
						<DialogTitle className="text-pretty text-xl">Payment</DialogTitle>
					</DialogHeader>
					<PaymentMethods />
					{type === "donate" ? (
						<Form {...donateForm}>
							<form onSubmit={donateForm.handleSubmit(onDoate)}>
								<FormField
									control={donateForm.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input placeholder="Enter email..." {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={donateForm.control}
									name="phone"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Phone</FormLabel>
											<FormControl>
												<Input placeholder="Enter phone..." {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={donateForm.control}
									name="amount"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Amount</FormLabel>
											<FormControl>
												<Input placeholder="Enter amount..." {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={donateForm.control}
									name="screenshot"
									render={({ field: { value, onChange, ...fieldProps } }) => (
										<FormItem>
											<span className="hidden">{JSON.stringify(value)}</span>

											<FormLabel>Screenshot</FormLabel>
											<FormControl>
												<Input
													{...fieldProps}
													placeholder="Select screenshot..."
													type="file"
													accept="image/jpg, image/png"
													onChange={(event) =>
														onChange(
															event.target.files && event.target.files[0]
														)
													}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="grid grid-cols-2 gap-2 mt-3">
									<DialogClose className="col-span-1" asChild>
										<Button
											type="button"
											className="w-full"
											variant={"outline"}
										>
											Cancel
										</Button>
									</DialogClose>
									<Button type="submit">Donate</Button>
								</div>
							</form>
						</Form>
					) : (
						<Form {...buyTicketForm}>
							<form onSubmit={buyTicketForm.handleSubmit(onBuyTicket)}>
								<FormField
									control={buyTicketForm.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input placeholder="Enter your name..." {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={buyTicketForm.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input placeholder="Enter email..." {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={buyTicketForm.control}
									name="phone"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Phone</FormLabel>
											<FormControl>
												<Input placeholder="Enter phone..." {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={buyTicketForm.control}
									name="ticket_type"
									render={() => (
										<FormItem>
											<FormLabel>Ticket Type</FormLabel>
											<FormControl>
												<Input
													readOnly
													value={optionNameToRender}
													placeholder="Enter amount..."
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={buyTicketForm.control}
									name="screenshot"
									render={({ field: { value, onChange, ...fieldProps } }) => (
										<FormItem>
											<span className="hidden">{JSON.stringify(value)}</span>
											<FormLabel>Screenshot</FormLabel>
											<FormControl>
												<Input
													{...fieldProps}
													placeholder="Select screenshot..."
													type="file"
													accept="image/jpg, image/png"
													onChange={(event) =>
														onChange(
															event.target.files && event.target.files[0]
														)
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={buyTicketForm.control}
									name="cupon_code"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Cupon Code</FormLabel>
											<FormControl>
												<Input placeholder="Enter cupon..." {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="grid grid-cols-2 gap-2 mt-3">
									<DialogClose className="col-span-1" asChild>
										<Button
											type="button"
											className="w-full"
											variant={"outline"}
										>
											Cancel
										</Button>
									</DialogClose>
									<Button type="submit">Buy</Button>
								</div>
							</form>
						</Form>
					)}
					{/* <Tabs defaultValue="buy_ticket" className="w-full">
						<TabsList className="w-full">
							<TabsTrigger className="w-full" value="direct_donate">
								Direct Donate
							</TabsTrigger>
							<TabsTrigger className="w-full" value="buy_ticket">
								Buy Ticket
							</TabsTrigger>
						</TabsList>
						<TabsContent value="direct_donate">
							<PaymentMethods />
							
						</TabsContent>
						<TabsContent value="buy_ticket">
							<PaymentMethods />
							
						</TabsContent>
					</Tabs> */}
				</DialogContent>
			</Dialog>
			<AlertDialog open={buyingTicket || donating}>
				<AlertDialogContent className="flex justify-center items-center border-none">
					<div className="loader"></div>
				</AlertDialogContent>
			</AlertDialog>

			<AlertDialog open={isSuccess}>
				<AlertDialogContent className="flex  flex-col justify-center items-center bg-light ">
					<CheckCircledIcon className="w-20 h-20 text-primary" />
					<p className="text-center text-pretty">
						{ticketBought
							? "Ticket bought successfully"
							: donated
							? "Donation successful"
							: ""}
					</p>
					<p className="text-center text-pretty">
						We will sent the certificate to your email!
					</p>
					<p className="text-center text-pretty">Thanks for your support!</p>
					<Button
						className="w-[200px] tracking-wider"
						variant={"outline"}
						onClick={() => setIsSuccess(false)}
					>
						Confirm
					</Button>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};

export default PaymentDialog;
