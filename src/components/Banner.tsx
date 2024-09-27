"use client";
import React, { useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";

const Banner = () => {
	const [showBanner, setShowBanner] = useState(true);
	return (
		showBanner && (
			<div className="fixed top-0 right-0 bottom-0 left-0 h-fit z-50">
				<div className="relative text-pretty text-lg text-center rounded-none text-primary bg-blue-200/60 bg-opacity-10 border-[1px] border-primary p-3 backdrop-blur-sm">
					<button
						onClick={() => setShowBanner(false)}
						className="border-none absolute top-1/2 -translate-y-1/2 right-2"
					>
						<Cross2Icon className="w-5 h-5" />
					</button>
					<p className="px-3">
						Event ကို September 29 မှ October 6 ရက်နေ့သို့ ပြောင်းရွှေ့ထားပါတယ်
						ခင်ဗျ။
					</p>
				</div>
			</div>
		)
	);
};

export default Banner;
