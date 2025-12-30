export const getGeminiApiKey = () => {
  return process.env.GEMINI_API_KEY || process.env.API_KEY || '';
};

export const getGeminiModel = () => {
  // Default to a widely available model; can be overridden in .env.local via GEMINI_MODEL
  return process.env.GEMINI_MODEL || 'gemini-2.5-flash';
};
