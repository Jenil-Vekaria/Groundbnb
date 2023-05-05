import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

interface HomeProps {
	searchParams: IListingsParams;
}
// searchParams are default empty object in server components

const Home = async ({ searchParams }: HomeProps) => {
	const listings = await getListings(searchParams);
	const currentUser = await getCurrentUser();

	const isEmpty = listings.length === 0;

	if (isEmpty) {
		return (
			<ClientOnly>
				<div>
					<EmptyState showReset />
				</div>
			</ClientOnly>
		);
	}

	return (
		<Container>
			<div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
				{listings.map((listing) => (
					<ListingCard
						key={listing.id}
						data={listing}
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	);
};

export default Home;
