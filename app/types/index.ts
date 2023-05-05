import { Listing, Reservation, User } from "@prisma/client";

// Omit allows us to create new object type from existing object and omitting certain fields
export type SafeUser = Omit<
	User,
	"createdAt" | "updatedAt" | "emailVerified"
> & {
	createdAt: string;
	updatedAt: string;
	emailVerified: string | null;
};

export type SafeListing = Omit<Listing, "createdAt"> & {
	createdAt: string;
};

export type SafeReservation = Omit<
	Reservation,
	"createdAt" | "startDate" | "endDate" | "listing"
> & {
	createdAt: string;
	startDate: string;
	endDate: string;
	listing: SafeListing;
};
