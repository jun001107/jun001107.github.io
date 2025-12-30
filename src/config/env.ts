export const getGeminiApiKey = () => {
  return process.env.GEMINI_API_KEY || process.env.API_KEY || '';
};
