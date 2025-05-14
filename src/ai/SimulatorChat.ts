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
    const clientName = 'Charles'; // Hardcoded client name
  
    const difficultyPrompts = {
      novice: 'Respond simply, avoiding technical jargon. Assume Charles is new to financial concepts.',
      moderate: 'Respond with balanced detail and clarity. Assume Charles has some understanding of financial concepts.',
      advanced: 'Respond with advanced financial terminology and deeper insights. Assume Charles has strong financial knowledge.',
    };
  
    const systemMessage = {
      role: 'system',
      content: 
        `You are simulating a financial client named ${clientName}.\n` +
        `${difficultyPrompts[difficulty]}\n\n` +
        `You should only express financial concerns, ask questions, and react to the advisor's suggestions. Do not provide any financial advice or recommendations.\n` +
        `Introduce related financial concerns naturally if appropriate, but stay in the character of a client.\n\n` +
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
  