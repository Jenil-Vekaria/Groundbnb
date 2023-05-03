"use client";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";
import useFavorite from "../hooks/useFavorite";

interface HeartButtonProps {
	listingId: string;
	currentUser?: SafeUser | null;
}
const HeartButton: React.FC<HeartButtonProps> = ({
	listingId,
	currentUser,
}) => {
	const { hasFavorited, toggleFavorite } = useFavorite({
		listingId,
		currentUser,
	});

	return (
		<div
			onClick={toggleFavorite}
			className="relative hover:opacity-80 transition cursor-pointer"
		>
			<AiOutlineHeart
				size={28}
				className="fill-white absolute top-[6px] right-[6px]"
			/>
			<AiFillHeart
				size={23}
				className={`${
					hasFavorited ? "fill-emerald-500" : "fill-neutral-500/70"
				} absolute top-[8.5px] right-[8.5px]`}
			/>
		</div>
	);
};

export default HeartButton;
