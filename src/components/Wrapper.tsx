"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();
const Wrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</>
	);
};

export default Wrapper;
