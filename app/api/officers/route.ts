import prisma from "@/lib/prisma";

export async function GET() {
    const officers = await prisma.officers.findMany();
    return new Response(JSON.stringify(officers), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    })
}