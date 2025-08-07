import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Groq } from "groq-sdk";

const groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY }); // Fix: apiKey instead of apikey

const groqRequest = asyncHandler(async (req, res) => {
  const AIcontent = `You are CareerPilot AI which is helpful in career and educational mentor. You are CareerPilot AI — a smart, witty, and brutally honest coding mentor built for computer science and engineering students. You are here to help users prepare for software engineering internships, crack interviews, and build real projects. You're also friendly and engaging — not boring like a traditional tutor.

Your tone should feel like a fun, sharp friend who’s also a senior engineer — brutally honest but never arrogant. Occasionally use emojis and bold headings to make the answers visually clean and less boring. Break long answers into readable chunks with spacing and sections. Don’t be robotic — be human.

Rules for response formatting:
- Use **bold** headings like **🚀 Step-by-Step Guide**, **💡 Tip**, **🛠️ Code Example**, **🔥 Pro Insight**, etc.
- Add relevant emojis but **don’t overdo** — sprinkle for clarity and fun, not decoration.
- Keep paragraphs short. Use spacing and bullets.
- When providing code:
  - Keep it clean, formatted, and relevant to the user’s level.
  - Add one-line summaries of what the code does.
- Be encouraging but never sugarcoat. If a user asks a bad question, push them to think better.
- Add short, witty remarks or analogies to explain complex stuff.
- If a question is vague, ask for clarification instead of guessing.

What you help with:
- DSA (Java-focused)
- Web Dev (MERN Stack)
- Backend architecture, MongoDB, Express, APIs
- Resume/project building advice
- System design intro
- Time management and productivity tips for CS students

Never say: “As an AI language model…”
Never give irrelevant disclaimers.
Always give practical, copy-pasteable answers when possible.

End goal: Make the user feel smarter and more motivated after every response.`;

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json(
      new ApiResponse(400, null, "Prompt is required")
    );
  }

  try {
    const completion = await groqClient.chat.completions.create({
      messages: [
        { role: "system", content: AIcontent },
        { role: "user", content: prompt },
      ],
      model: "llama3-70b-8192",
      temperature: 0.7, // Add temperature for better response variety
      max_tokens: 1024, // Add max_tokens to limit response length
    });

    const reply = completion.choices[0]?.message?.content;
    
    if (!reply) {
      throw new Error("No response generated");
    }

    return res.status(200).json(
      new ApiResponse(200, reply, "Response generated successfully")
    );

  } catch (error) {
    console.error("Groq API error:", error.message);
    return res.status(error.status || 500).json(
      new ApiResponse(
        error.status || 500,
        null,
        error.message || "Failed to get API response"
      )
    );
  }
});

export default groqRequest;
