export interface FeedbackData {
  scores: {
    accuracy?: number;
    clarity: number;
    comprehensiveness?: number;
    empathy?: number;
    technicalAccuracy?: number;
    overall: number;
  };
  strengths: string[];
  improvements: string[];
}

export async function getChatGPTFeedback(
  question: string,
  userAnswer: string,
  correctAnswer: string
): Promise<FeedbackData | null> {
  const messages = [
    {
      role: "system",
      content:
        "You're a teaching assistant grading how well the user answers questions and explains concepts in simple, easy to understand language." +
        "Return only valid JSON in this exact shape:\n\n" +
        `{"scores": { "accuracy": number (0-1), "clarity": number (0-1), "comprehensiveness": number (0-1), "overall": number (0-1)},
        "strengths": [string],
        "improvements": [string]
        }\n\n` +
        "No additional explanation or text. Just return JSON.",
    },
    {
      role: "user",
      content: `Question: ${question}\nCorrect Answer: ${correctAnswer}\nUser Answer: ${userAnswer}\n\nProvide structured feedback.`,
    },
  ];

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(import.meta as any).env.VITE_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages,
      temperature: 0.5,
    }),
  });

  const data = await res.json(); // <-- this is necessary
  const content = data.choices?.[0]?.message?.content || "{}";

  try {
    return JSON.parse(content) as FeedbackData;
  } catch (e) {
    console.error("Failed to parse ChatGPT JSON:", e);
    return null;
  }
}