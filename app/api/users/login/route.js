import User from "@/models/userModels";
import { NextResponse } from "next/server";
import { connect } from "@/database/DB";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export async function POST(req) {
    try {
        // Ensure database connection
        await connect();

        // Parse the JSON body of the request
        const body = await req.json();
        const { email, password } = body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User doesn't exist" }, { status: 400 });
        }

        // Compare passwords
        const isPasswordMatch = await bcryptjs.compare(password, user.password);
        if (!isPasswordMatch) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 400 });
        }

        // Create JWT token
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });

        // Set token in cookie
        const res = NextResponse.json(
            {
                message: `Welcome back ${user.username}`,
                success: true,
            },
            { status: 200 }
        );
        res.cookies.set("token", token, { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production' });

        return res;
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
