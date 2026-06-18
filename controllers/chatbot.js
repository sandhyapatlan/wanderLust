const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports.chat = async (req, res) => {
  try {
    const { message } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `You are a helpful travel assistant for Wanderlust, an Airbnb-like platform for India. 
    Help users find stays, answer travel questions, and suggest destinations.
    User message: ${message}`;
    
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    res.json({ success: true, message: response });
  } catch (err) {
    res.json({ success: false, message: "Something went wrong!" });
  }
};