import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
	listingId?: string;
}
export async function POST(req: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { listingId } = params;

	if (!listingId || typeof listingId !== "string") {
		throw new Error("Invalid listing ID");
	}

	let favoriteIds = [...(currentUser.favoriteIds || [])];

	favoriteIds.push(listingId);

	const user = await prisma.user.update({
		where: {
			id: currentUser.id,
		},
		data: {
			favoriteIds,
		},
	});

	return NextResponse.json(user);
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { listingId } = params;

	if (!listingId || typeof listingId !== "string") {
		throw new Error("Invalid listing ID");
	}

	let favoriteIds = [...(currentUser.favoriteIds || [])];

	//Filter all the favorites ids except the lisitingId
	favoriteIds = favoriteIds.filter((favoriteId) => favoriteId !== listingId);

	const user = await prisma.user.update({
		where: {
			id: currentUser.id,
		},
		data: {
			favoriteIds,
		},
	});

	return NextResponse.json(user);
}
