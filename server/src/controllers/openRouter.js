import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const openRouterSuggestion = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  console.log("Prompt:", prompt);

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-exp:free",
        messages: [
          {
            role: "user",
            content: prompt, 
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text(); 
    console.error("OpenRouter error:", errorText);
    return res
      .status(response.status)
      .json(
        new ApiResponse(response.status, null, "OpenRouter request failed")
      );
  }

  const data = await response.json();
    console.log("AI Response:", data);
    console.log("Now printing message")
    const reply = data.choices[0].message.content
    console.log( reply || "")

  res
    .status(200)
    .json(new ApiResponse(200, reply, "Response generated successfully"));
});

export { openRouterSuggestion };
