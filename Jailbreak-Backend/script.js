const Groq = require("groq-sdk");
const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000

app.use(cors());
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(express.json());

app.post('/', (req, res) => {
    console.log(req.body);
    const message=(req.body.message);
    main(message).then((response) => {
        res.send(response);
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



async function main(message) {
    const chatCompletion = await getGroqChatCompletion(message);
    return (chatCompletion.choices[0]?.message?.content || "");
  }

async function getGroqChatCompletion(message) {
    return groq.chat.completions.create({
        messages: [
        {
            role: "user",
            content: `${message}`,
        },
        ],
        model: "llama3-8b-8192",
    });
}