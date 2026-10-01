import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const message = body.message || "";
    const context = body.context || {};

    if (!message.trim()) {
      return Response.json(
        {
          success: false,
          error: "Message is required",
        },
        { status: 400 }
      );
    }

    const systemPrompt = `
You are AGRO NEXUS AI Farmer, an agricultural intelligence assistant.

Your job is to help farmers understand crops, diseases, soil, irrigation,
weather/environment conditions, crop recommendations and farming practices.

IMPORTANT:
- Use the agricultural context supplied by the application.
- Do not invent sensor readings, disease diagnoses, weather values, or crop data.
- If information is missing, clearly say that it is unavailable.
- Give practical, simple advice that a farmer can understand.
- Never claim that an image-based disease result is a guaranteed diagnosis.
- For diseases, use phrases such as "possible", "potential", or "may indicate".
- Explain WHY you are making a recommendation.
- Consider crop, state, district, soil, temperature, humidity, rainfall,
  pH, water availability, season, symptoms and previous analysis when provided.
- Keep answers concise but useful.
- Answer in the language requested by the user.

CURRENT AGRICULTURAL CONTEXT:
${JSON.stringify(context, null, 2)}
`;

    const response = await client.responses.create({
      model: "gpt-5.6-luna",
      instructions: systemPrompt,
      input: message,
    });

    return Response.json({
      success: true,
      answer: response.output_text,
    });
  } catch (error) {
    console.error("AI Farmer API error:", error);

    return Response.json(
      {
        success: false,
        error: "AI Farmer could not process the request.",
      },
      { status: 500 }
    );
  }
}