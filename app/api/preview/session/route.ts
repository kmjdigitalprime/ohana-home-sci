import { NextResponse } from "next/server";
export function POST(){return NextResponse.json({message:"Le site est accessible directement."},{status:410});}
