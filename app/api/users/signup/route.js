import { NextResponse } from "next/server";
import { connect } from "@/database/DB";
import User from "@/models/userModels";
import bcryptjs from "bcryptjs";

export async function POST(req) {
    try {
        // Ensure database connection
        await connect();

        // Parse the JSON body of the request
        const body = await req.json();
        const { username, email, password } = body;

        // Basic validation
        if (!username || !email || !password) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(password, salt);

        // Create new user
        user = await User.create({
            username,
            email,
            password: hash
        });

        // Return a success response
        return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
