import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  target: z.string().nonempty(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, {
      status: 400,
    });
  }

  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API key missing" }, { status: 500 });
  }

  const res = await fetch(
    `https://translation.googleapis.com/language/translate/v2/languages?key=${apiKey}`,
    {
      method: "POST",
      body: JSON.stringify({ target: body.target }),
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to retrieve support languages" },
      { status: res.status }
    );
  }

  return NextResponse.json(await res.json());
}
