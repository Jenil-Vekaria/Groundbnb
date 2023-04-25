import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const body = await req.json();

	const { email, name, password } = body;

	const hashedPassword = await bcrypt.hash(password, 12);

	const user = await prisma.user.create({
		data: { email, name, hashedPassword },
	});

	return NextResponse.json(user);
}
