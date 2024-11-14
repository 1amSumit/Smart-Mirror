import axios from "axios";

export const getCommandFromLLM = async (transcript) => {
  console.log("Transcript: " + transcript);
  try {
    const systemPrompt = `You are a smart assistant that generates commands for a Smart Mirror that functions solely on voice commands. Your task is to interpret the user's spoken intent and generate an appropriate command. Analyze the transcript and return ONLY the command as a string, without any JSON formatting or additional explanation. Follow these guidelines:

1. Reminders:
   * For setting a reminder: "add reminder [actual reminder]"
   * For removing a reminder: "remove reminder [actual reminder]"
2. Events:
   * For setting an event: "add event [actual event] at [time in 24 hrs]"
   * For removing an event: "remove event [actual event] at [time]"
3. To-Dos:
   * To show the to-do list: "show todo"
   * For adding a to-do item: "add todo [actual todo]"
   * For removing a to-do item: "remove todo [actual todo]"
4. News:
   * To show the news: "show news"
   * For starting news playback: "start top news"
   * For stopping news playback: "stop top news"
5. Music:
   * For playing music: "play music"
   * For pausing music: "pause music"
   * For shuffle music: "shuffle music"
   * For next song: "next music"
   * For previous song: "previous music"
Return ONLY the generated command as a single string, without any additional text or formatting.`;

    const response = await axios.post(
      "https://api.mistral.ai/v1/chat/completions",
      {
        model: "open-mixtral-8x22b",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: transcript },
        ],
        stream: false,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_MISTRATE_API_TOKEN}`,
        },
      }
    );

    const command = response.data.choices[0].message.content.trim();
    console.log("Command:", command);

    return command;
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response?.data || error.message
    );
    return null;
  }
};
