const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/capslock', { useNewUrlParser: true, useUnifiedTopology: true });

const fillSchema = new mongoose.Schema({
    sentences: [{ text: String, answer: String }]
});
const matchSchema = new mongoose.Schema({
    pairs: [{ itemText: String, matchText: String }]
});
const quizSchema = new mongoose.Schema({
    questions: [{ text: String, options: [String] }]
});

const Fill = mongoose.model('Fill', fillSchema);
const Match = mongoose.model('Match', matchSchema);
const Quiz = mongoose.model('Quiz', quizSchema);

app.post('/api/fill-in-the-blanks', async (req, res) => {
    const data = new Fill(req.body);
    await data.save();
    res.json({ message: 'Data saved' });
});

app.post('/api/match', async (req, res) => {
    const data = new Match(req.body);
    await data.save();
    res.json({ message: 'Data saved' });
});

app.post('/api/quiz', async (req, res) => {
    const data = new Quiz(req.body);
    await data.save();
    res.json({ message: 'Data saved' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
