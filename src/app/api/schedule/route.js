import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";




export const GET = async (req, { params }) => {
  try {
    const schedulesCollection = await dbConnect("schedules");
    const result = await schedulesCollection.find().toArray();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
export const POST = async (req, { params }) => {
  try {
    const body = await req.json();
    const schedulesCollection = await dbConnect("schedules");
    const result = await schedulesCollection.insertOne(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};