import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
	reservationId?: string;
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: IParams },
) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { reservationId } = params;

	if (!reservationId || typeof reservationId !== "string") {
		throw new Error("Invalid ID");
	}

	const reservation = await prisma.reservation.deleteMany({
		where: {
			id: reservationId,
			// Allowing reservation user or listing owner to cancel the reservation
			OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
		},
	});

	return NextResponse.json(reservation);
}
