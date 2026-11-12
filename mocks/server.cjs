const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use((req, res, next) => {
    setTimeout(next, 1000);
});

const shows = [
    {
        id: 1,
        name: 'Breaking Bad',
        image: {
            medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/0/2400.jpg',
            original: 'https://static.tvmaze.com/uploads/images/original_untouched/0/2400.jpg',
        },
        genres: ['Drama', 'Crime', 'Thriller'],
    },
    {
        id: 2,
        name: 'Game of Thrones',
        image: {
            medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/0/2401.jpg',
            original: 'https://static.tvmaze.com/uploads/images/original_untouched/0/2401.jpg',
        },
        genres: ['Drama', 'Adventure', 'Fantasy'],
    },
    {
        id: 3,
        name: 'The Office',
        image: {
            medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/0/2402.jpg',
            original: 'https://static.tvmaze.com/uploads/images/original_untouched/0/2402.jpg',
        },
        genres: ['Comedy'],
    },
    {
        id: 4,
        name: 'Stranger Things',
        image: null,
        genres: ['Drama', 'Science-Fiction', 'Horror'],
    },
    {
        id: 5,
        name: 'The Mandalorian',
        image: null,
        genres: ['Action', 'Adventure', 'Science-Fiction'],
    },
];

app.get('/search/shows', (req, res) => {
    const query = (req.query.q || '').toLowerCase();
    const results = shows
        .filter((show) => show.name.toLowerCase().includes(query))
        .map((show, index) => ({
            score: 1.0 - index * 0.05,
            show,
        }));
    res.json(results);
});

app.get('/shows', (req, res) => {
    res.json(shows);
});

app.get('/shows/:id', (req, res) => {
    const show = shows.find((s) => s.id === parseInt(req.params.id));
    if (show) {
        res.json(show);
    } else {
        res.status(404).json({ error: 'Not found' });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Mock server running on http://localhost:${PORT}`);
});