import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get a Note by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  const note = await prisma.note.findUnique({
    where: { id: parseInt(id) },
  });

  if (!note) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  return NextResponse.json(note);
}

// Update a Note by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const data = await request.json();
  const { title, body } = data;

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const note = await prisma.note.update({
    where: { id: parseInt(id) },
    data: {
      title,
      body: body || "", 
    },
  });

  return NextResponse.json(note);
}

// Delete a Note by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  const note = await prisma.note.delete({
    where: { id: parseInt(id) },
  });

  return NextResponse.json(note);
}
