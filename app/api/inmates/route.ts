import prisma from "@/lib/prisma";

export async function GET() {
  const inmates = await prisma.inmates.findMany();
  return new Response(JSON.stringify(inmates), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const updated = await prisma.inmates.update({
    where: { id_inmate: body.id_inmate },
    data: { alias: body.alias !== undefined ? body.alias : undefined, release_date: body.release_date !== undefined ? new Date(body.release_date) : undefined, id_cell: body.id_cell, id_block: body.id_block },
  });
  return new Response(JSON.stringify(updated), { status: 200 });
}

export async function POST(req: Request) {
  const body = await req.json(); // { name: 'Item 1', desc: 'Desc opcional' }
  const newItem = await prisma.inmates.create({ data: body });
  return new Response(JSON.stringify(newItem), { status: 201 });
}

export async function DELETE(req: Request) {
  const body = await req.json();
  const deleted = await prisma.inmates.delete({ where: { id_inmate: body.id_inmate } });
  return new Response(JSON.stringify(deleted), { status: 200 });
}