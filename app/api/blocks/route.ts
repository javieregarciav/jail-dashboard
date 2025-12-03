import prisma from "@/lib/prisma";

export async function GET() {
    const blocks = await prisma.blocks.findMany();
    return new Response(JSON.stringify(blocks), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    })
}