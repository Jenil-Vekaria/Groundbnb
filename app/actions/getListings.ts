import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
	userId?: string;
}

export default async function getListings(params: IListingsParams) {
	try {
		const { userId } = params;

		let query: any = {};

		if (userId) {
			query.userId = userId;
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
