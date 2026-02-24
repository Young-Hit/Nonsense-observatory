// 使用免费的API代理服务来隐藏密钥
// 推荐使用：CORS Anywhere 或自建代理

const PROXY_CONFIG = {
    // 选项1：使用公共代理（仅用于测试）
    PROXY_URL: "https://cors-anywhere.herokuapp.com/",
    
    // 选项2：使用Vercel无服务器函数（推荐）
    // 需要创建 /api/chat.js 文件
    
    // 选项3：使用Cloudflare Workers
    // 免费额度：每天100,000次请求
};

// 修改后的API调用函数
async function fetchUniverseResponse(universe, userText) {
    const response = await fetch(PROXY_CONFIG.PROXY_URL + API_CONFIG.API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // API密钥现在在服务器端，不在客户端
        },
        body: JSON.stringify({
            model: "glm-4-flash",
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
