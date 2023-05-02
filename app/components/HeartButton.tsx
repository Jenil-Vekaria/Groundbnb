"use client";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";

interface HeartButtonProps {
	listingId: string;
	currentUser?: SafeUser | null;
}
const HeartButton: React.FC<HeartButtonProps> = ({
	listingId,
	currentUser,
}) => {
	const hasFavourited = false;
	const toggleFavourite = () => {};

	return (
		<div
			onClick={toggleFavourite}
			className="relative hover:opacity-80 transition cursor-pointer"
		>
			<AiOutlineHeart
				size={28}
				className="
          fill-white
          absolute
          top-[6px]
          right-[6px]
        "
			/>
			<AiFillHeart
				size={24}
				className={`${
					hasFavourited ? "fill-emerald-500" : "fill-neutral-500/70"
				} absolute top-[8px] right-[8px]`}
			/>
		</div>
	);
};

export default HeartButton;
