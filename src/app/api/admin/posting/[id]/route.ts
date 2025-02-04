import { NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {

  const {id} = await params;

  const posting = await prisma.posting.findFirstOrThrow({
    where: { id },
  });

  if (!posting) {
    return NextResponse.json({ error: "Posting not found" }, { status: 404 });
  }

  return NextResponse.json(posting);
}


export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }>  }) {
  const {id} = await params;
  if (!id) {
    return NextResponse.json(
      { error: "Bad Request" },
      { status: 400 }
    );
  }

  try {
    const posting = await prisma.posting.delete({
      where: { id },
    });

    if (!posting) {
      return NextResponse.json(
        { error: "Posting not found" },
        { status: 404 }
      );
    }


    return NextResponse.json(
      { message: "Posting deleted successfully" },
      { status: 204 }
    );

  } catch (error) {
  
    return NextResponse.json({ error}, { status: 500 });
  }
}