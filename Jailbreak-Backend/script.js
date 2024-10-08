const Groq = require("groq-sdk");
const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const full=path.join(__dirname, './prompt/full.txt');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/', (req, res) => {
  console.log(req.body);
    const message=(req.body.message);
    main(message).then((response) => {
        res.send(response);
    });
})

app.use((err, req, res, next) => {
  console.error('Global Error:', err.message);
  res.status(500).send('Internal Server Error');
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

async function main(message) {
    const chatCompletion = await getGroqChatCompletion(message);
    console.log(chatCompletion.choices[0]?.message?.content || "");
    return (chatCompletion.choices[0]?.message?.content || "");
  }

async function getGroqChatCompletion(message) {
    const fulldat= fs.readFileSync(full, 'utf8');
    return groq.chat.completions.create({
        messages: [
        {
            role: "user",
            content: `${fulldat+message}]`,
        },
        ],
        model: "llama-3.1-70b-versatile",
    });
}