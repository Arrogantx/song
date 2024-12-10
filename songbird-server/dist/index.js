"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const openai_1 = __importDefault(require("openai"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
// Initialize OpenAI
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
}));
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});
// Content generation endpoint
app.post('/api/generate', async (req, res) => {
    try {
        const { audience, goal, tone, contentType, additionalContext } = req.body;
        const prompt = `Create ${contentType} content targeting ${audience} with a ${tone} tone. The goal is to ${goal}.${additionalContext ? `\n\nAdditional context: ${additionalContext}` : ''}`;
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-3.5-turbo",
            temperature: 0.7,
            max_tokens: 1000,
        });
        const generatedContent = completion.choices[0]?.message?.content;
        if (!generatedContent) {
            return res.status(500).json({ error: 'No content generated' });
        }
        res.json({ content: generatedContent });
    }
    catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({
            error: error?.message || 'An unexpected error occurred'
        });
    }
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
