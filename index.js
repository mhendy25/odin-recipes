// server.js

const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

const openai = new OpenAI('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');

app.use(bodyParser.json());

// OpenAI Integration
const getAIResponse = async (input) => {
  const response = await openai.complete.create({
    engine: 'text-davinci-003',
    prompt: input,
    max_tokens: 100,
  });
  return response.data.choices[0].text.trim();
};

// Routes
app.post('/api/match', async (req, res) => {
  try {
    const { hrPreferences, candidateSkills } = req.body;
    const input = `HR Preferences: ${hrPreferences}\nCandidate Skills: ${candidateSkills}`;
    const aiResponse = await getAIResponse(input);

    // Add logic to process AI response and match HR with candidates

    res.json({ result: 'Matching successful', data: /* matched data */ });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
