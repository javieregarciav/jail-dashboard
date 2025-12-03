import prisma from "@/lib/prisma";

export async function GET() {
    const crimes = await prisma.crimes.findMany();
    return new Response(JSON.stringify(crimes), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    })
}