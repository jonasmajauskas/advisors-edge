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
  userAnswer: string
): Promise<FeedbackData | null> {
  const messages = [
    {
      role: "system",
      content:
        "You're a helpful teaching assistant. You will provide JSON feedback only, matching this shape:\n\n" +
        `{
  "scores": {
    "accuracy": number (0-1),
    "clarity": number (0-1),
    "comprehensiveness": number (0-1),
    "empathy": number (0-1),
    "technicalAccuracy": number (0-1),
    "overall": number (0-1)
  },
  "strengths": [string],
  "improvements": [string]
}\n\n` +
        "No explanation. Only return valid JSON.",
    },
    {
      role: "user",
      content: `Question: ${question}\nUser Answer: ${userAnswer}\nGive structured feedback.`,
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
      temperature: 0.7,
    }),
  });

  const data = await res.json();

  try {
    const parsed = JSON.parse(data.choices?.[0]?.message?.content || "{}");
    return parsed as FeedbackData;
  } catch (e) {
    console.error("Failed to parse ChatGPT JSON:", e);
    return null;
  }
}