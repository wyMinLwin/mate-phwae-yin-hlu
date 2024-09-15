import { NextResponse } from "next/server";

export async function GET() {
	try {
		const response = await fetch(
			"https://mate-phwae-yin-hlu.up.railway.app/api/payment-methods/"
		);
		const data = await response.json();
		if (response.ok) {
			return NextResponse.json(
				{
					data,
				},
				{ status: 200 }
			);
		} else {
			return NextResponse.json(
				{
					data: null,
					error: "Failed To Load Data!",
				},
				{ status: 400 }
			);
		}
	} catch {
		return NextResponse.json(
			{
				data: null,
				error: "Interval Server Error!",
			},
			{ status: 500 }
		);
	}
}
