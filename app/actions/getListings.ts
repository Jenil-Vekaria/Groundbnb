import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
	userId?: string;
	guestCount?: number;
	roomCount?: number;
	bathroomCount?: number;
	startDate?: string;
	endDate?: string;
	locationValue?: string;
	category?: string;
}

export default async function getListings(params: IListingsParams) {
	try {
		const {
			userId,
			guestCount,
			roomCount,
			bathroomCount,
			startDate,
			endDate,
			locationValue,
			category,
		} = params;

		let query: any = {};

		if (userId) {
			query.userId = userId;
		}

		if (category) {
			query.category = category;
		}

		if (roomCount) {
			query.roomCount = {
				gte: +roomCount,
			};
		}

		if (guestCount) {
			query.guestCount = {
				gte: +guestCount,
			};
		}

		if (bathroomCount) {
			query.bathroomCount = {
				gte: +bathroomCount,
			};
		}

		if (locationValue) {
			query.locationValue = locationValue;
		}

		/*
		 Doing REVERSE FILTERING: get all the reservations that overlap the filter startDate and endDate
		*/
		if (startDate && endDate) {
			query.NOT = {
				reservations: {
					some: {
						OR: [
							{ endDate: { gte: startDate }, startDate: { lte: startDate } },
							{ startDate: { lte: endDate }, endDate: { gte: endDate } },
						],
					},
				},
			};
		}

		const listings = await prisma.listing.findMany({
			where: query,
			include: {
				user: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		const safeListings = listings.map((listing) => ({
			...listing,
			createdAt: listing.createdAt.toISOString(),
			user: {
				...listing.user,
				createdAt: listing.user.createdAt.toISOString(),
				updatedAt: listing.user.updatedAt.toISOString(),
				emailVerified: listing.user.emailVerified?.toISOString() || null,
			},
		}));
		return safeListings;
	} catch (error: any) {
		throw new Error(error);
	}
}
