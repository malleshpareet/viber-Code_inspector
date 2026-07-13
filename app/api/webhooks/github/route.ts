import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const event = req.headers.get("x-github-event");
        console.log("Recived Github event", event);

        if (event === "ping") {
            return NextResponse.json(
                { message: "Pong" },
                { status: 200 }
            );
        }

        // TODO: HANDLE LATER


        return NextResponse.json({ message: "Event Processes" }, { status: 200 })
    } catch (error) {
        console.error("Github Webhook Error", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })

    }
}