import aiClient from "@/app/AIClient";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  input: z.string().nonempty(),
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

  const chatCompletion = await aiClient.chat.completions.create({
    messages: [
      {
        role: "developer",
        content: `
        You are a medical expert who is fluent in multiple languages.
        Translate user's input to ${body.target}.
        If a question is detected, answer the question in the target language.
        Otherwise, if there is any medical terms in the user's input, explain each term in brief detail in the target language on a separate paragraph.
        Here's an example of what the output should look like:
  
        I have cancer

        Terminology
        Cancer: A tumor in a human body

        Make sure the output is in the target language.
        `,
      },
      {
        role: "user",
        content: body.input,
      },
    ],
    model: "gpt-4o-mini",
    temperature: 0.3,
  });

  return NextResponse.json(chatCompletion.choices[0].message.content);
}
