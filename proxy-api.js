// proxy-api.js 

async function fetchUniverseResponse(universe, userText) {
    const response = await fetch(API_CONFIG.CHAT_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            messages: [
                { role: "system", content: universe.systemPrompt },
                { role: "user", content: userText }
            ],
            temperature: 0.8,
            max_tokens: 150
        })
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
}
