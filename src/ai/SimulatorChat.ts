export interface AIClientResponse {
    response: string;
  }
  
  interface FetchAIResponseParams {
    profileName: string;
    difficulty: 'novice' | 'moderate' | 'advanced';
    concerns: string[];
    conversation: { role: string; content: string }[];
  }
  
  export async function fetchAIResponse({
    profileName,
    difficulty,
    concerns,
    conversation,
  }: FetchAIResponseParams): Promise<AIClientResponse | null> {
  
    const systemMessage = {
      role: 'system',
      content: 
        `You are simulating a financial client who has an ${difficulty} understanding of investing and has concerns about ${concerns}.\n` +
        `Ask a question related to the concerns and within your investment understanding.\n` +
        `Respond strictly in this JSON format:\n` +
        `{"response": "client's message"}\n\n`,
    };
  
    const formattedMessages = [
      systemMessage,
      ...conversation.map(msg => ({
        role: msg.role === 'advisor' ? 'assistant' : 'user',
        content: msg.content,
      })),
    ];
  
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${(import.meta as any).env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o', // Using the latest, most capable model
          messages: formattedMessages,
          temperature: 0.5,
          max_tokens: 300,
        }),
      });
  
      const data = await res.json();
      const content = data.choices?.[0]?.message?.content || '{}';
  
      return JSON.parse(content) as AIClientResponse;
    } catch (error) {
      console.error('Failed to get AI response:', error);
      return null;
    }
  }
  