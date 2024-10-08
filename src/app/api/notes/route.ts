import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new Note
export async function POST(request: Request) {
  const data = await request.json();
  const { title, body } = data;

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const note = await prisma.note.create({
    data: {
      title,
      body: body || "", 
    },
  });

  return NextResponse.json(note);
}


// Get all Notes
export async function GET() {
  const notes = await prisma.note.findMany();
  return NextResponse.json(notes);
}
