// Vercel无服务器函数 - /api/chat.js
// 这个文件放在 /api/ 文件夹中

export default async function handler(req, res) {
    // API密钥从环境变量读取，更安全
    const API_KEY = process.env.API_KEY;
    const API_URL = "https://open.bigmodel.cn/api/paas/v4/chat/completions";
    
    if (!API_KEY) {
        return res.status(500).json({ error: 'API key not configured' });
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const { messages, temperature, max_tokens } = req.body;
        
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "glm-4-flash",
                messages,
                temperature: temperature || 0.8,
                max_tokens: max_tokens || 150
            })
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        res.status(200).json(data);
        
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
