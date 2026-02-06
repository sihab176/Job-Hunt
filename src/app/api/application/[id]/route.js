import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  try {
    const { id } = await params;
    // console.log("id------------>", id);
    const applicationCollection = await dbConnect("applications");
    const result = await applicationCollection.deleteOne({
      _id: new ObjectId(id),
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
