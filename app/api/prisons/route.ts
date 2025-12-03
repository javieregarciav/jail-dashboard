import prisma from "@/lib/prisma";

export async function GET() {
  const prisons = await prisma.prisons.findMany();
  return new Response(JSON.stringify(prisons), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}


/* import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// GET: Listar todos los items
export async function GET() {
  const items = await prisma.item.findMany();
  return new Response(JSON.stringify(items), { status: 200 });
}

// POST: Crear un item
export async function POST(req: Request) {
  const body = await req.json(); // { name: 'Item 1', desc: 'Desc opcional' }
  const newItem = await prisma.item.create({ data: body });
  return new Response(JSON.stringify(newItem), { status: 201 });
}

// PUT: Actualizar un item (se envía body con id y campos)
export async function PUT(req: Request) {
  const body = await req.json(); // { id: 1, name: 'Nuevo nombre' }
  const updated = await prisma.item.update({
    where: { id: body.id },
    data: { name: body.name, desc: body.desc },
  });
  return new Response(JSON.stringify(updated), { status: 200 });
}

// DELETE: Eliminar un item (se envía body con id)
export async function DELETE(req: Request) {
  const body = await req.json(); // { id: 1 }
  const deleted = await prisma.item.delete({ where: { id: body.id } });
  return new Response(JSON.stringify(deleted), { status: 200 });
} */