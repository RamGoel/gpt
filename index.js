const express =  require('express')
const app = express()
require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai")
app.use(express.static('public'))
const { OpenAI } =require("openai")
const openai = new OpenAI({
    organization:process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_API_KEY
});

app.post('/chat', async (req, res)=> {   
  try {
    const resp = await openai.chat.completions.create({
      model: "text-davinci-003",
        messages: [
          { role: "user", content: "Hello, who are you?" },
        ]  
    })           
        
      let chat_message = resp['choices'][0]['message']['content']
      console.log(chat_message)
      res.status(400).json({message: chat_message})
  } catch(e) {
      res.status(400).json({message: e.message})
  }
})

app.listen(5000, ()=> {
    console.log("Server is active")
})