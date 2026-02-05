import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const jobCollection = await dbConnect("jobs");

    //queary 
    const { searchParams } = new URL(req.url)
    const workFromHome = searchParams.get("workFromHome")
    const partTime = searchParams.get("partTime")
    const jobTitle = searchParams.get("jobTitle")
    const location = searchParams.get("location")
    const keyword = searchParams.get("keyword")
    const queary = {}
    
    if (workFromHome === "true") queary.workFromHome = true
    if (partTime === "true") {
      queary.duration={$regex: "week|part-time",$options:"i"}
    }
    if (location) {
      queary.location = { $regex: location, $options: "i" }
    }
    if (jobTitle) {
      queary.title = { $regex: jobTitle, $options: "i" }
    }
    if (keyword) {
      queary.$or = [
        {title:{ $regex: keyword, $options: "i" } },
        {skills:{ $elemMatch: {$regex:keyword, $options:"i"} } },
      ]
    }

    const result = await jobCollection.find(queary).toArray();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const POST = async (req, { params }) => {
  try {
    const body = await req.json();
    const jobCollection = await dbConnect("jobs");
    const result = await jobCollection.insertOne(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
