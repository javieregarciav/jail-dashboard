import prisma from "@/lib/prisma";

export async function GET() {
  const cells = await prisma.cells.findMany();
  return new Response(JSON.stringify(cells), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}