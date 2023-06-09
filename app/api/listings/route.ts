import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const body = await req.json();
	const {
		category,
		location,
		guestCount,
		roomCount,
		bathroomCount,
		imageSrc,
		price,
		title,
		description,
	} = body;

	//Validating if any field is empty
	Object.keys(body).forEach((value: any) => {
		if (!body[value]) {
			return NextResponse.error();
		}
	});

	const listing = await prisma.listing.create({
		data: {
			title,
			description,
			imageSrc,
			category,
			roomCount,
			bathroomCount,
			guestCount,
			locationValue: location.value,
			price: parseInt(price, 10),
			userId: currentUser.id,
		},
	});

	return NextResponse.json(listing);
}
