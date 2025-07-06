export async function fetchAISummary(journalText: string) {
  try {
    const res = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.TOGETHER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/Mistral-7B-Instruct-v0.1",
        messages: [
          {
            role: "system",
            content: "You are a supportive journaling AI assistant. Your job is to read a user's journal entry and generate 9–10 emotionally intelligent, comforting lines that validate their feelings and offer practical suggestions.",
          },
          {
            role: "user",
            content: `Journal entry:\n\n${journalText}\n\nWrite a supportive response.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    const data = await res.json();

    // 👇 THIS IS THE IMPORTANT DEBUGGING LINE
    console.log("🧠 Together AI full response:", JSON.stringify(data, null, 2));

    if (!res.ok || data.error) {
      console.error("❌ Together AI Error:", data.error || data);
      return "Sorry bestie, I couldn’t read your journal right now 💔";
    }

    return data.choices?.[0]?.message?.content?.trim() || "Here's your vibe check, bestie 💖";
  } catch (error) {
    console.error("❌ Error calling Together AI:", error);
    return "Sorry bestie, I had a little meltdown reading your journal 💻💔";
  }
}
