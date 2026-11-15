const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const CACHE_TTL_MS = 5 * 60 * 1000;
const cache = {};

const TVMAZE_BASE_URL = 'https://api.tvmaze.com';
const DEFAULT_PAGE = 100;
const DEFAULT_SIZE = 1;

const MOCK_DATA = require('./mock.json');

const TVMAZE_TIMEOUT_MS = 400;

function getCachedOrFetch(url) {
    const now = Date.now();
    const cached = cache[url];

    if (cached && (now - cached.timestamp) < CACHE_TTL_MS) {
        return { data: cached.data, source: 'cache' };
    }

    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('TVmaze API timeout')), TVMAZE_TIMEOUT_MS);
    });

    return Promise.race([
        fetch(url).then((res) => {
            if (!res.ok) {
                throw new Error(`TVmaze API error: ${res.status}`);
            }
            return res.json();
        }),
        timeoutPromise,
    ])
        .then((data) => {
            cache[url] = { data, timestamp: now };
            return { data, source: 'tvmaze' };
        })
        .catch((error) => {
            console.warn(`[FALLBACK] ${error.message}, using mock data`);
            return { data: MOCK_DATA, source: 'mock' };
        });
}

function paginate(list, page, size) {
    const total = list.length;
    const totalPages = Math.ceil(total / size) || 1;
    const safePage = Math.min(page, Math.max(1, totalPages));
    const startIndex = (safePage - 1) * size;
    const items = list.slice(startIndex, startIndex + size);

    return {
        total,
        page: safePage,
        size,
        items,
    };
}

app.get('/api/search/shows', async (req, res) => {
    const {
        q = '',
        genres = '',
        page = DEFAULT_PAGE,
        size = DEFAULT_SIZE,
    } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10) || DEFAULT_PAGE);
    const sizeNum = Math.max(1, parseInt(size, 10) || DEFAULT_SIZE);
    const searchQuery = q.trim();
    const genreList = genres
        ? genres.split(',').map((g) => g.trim().toLowerCase()).filter(Boolean)
        : [];

    try {
        if (!searchQuery) {
            res.json({
                total: 0,
                page: pageNum,
                size: sizeNum,
                items: [],
                genres: [],
            });
            return;
        }

        const tvmazeUrl = `${TVMAZE_BASE_URL}/search/shows?q=${encodeURIComponent(searchQuery)}`;
        const { data: searchResults, source } = await getCachedOrFetch(tvmazeUrl);

        let shows = searchResults.map(({ show }) => show);

        if (genreList.length > 0) {
            shows = shows.filter(({ genres: showGenres }) =>
                genreList.some((genre) =>
                    showGenres.some((g) => g.toLowerCase().includes(genre))
                )
            );
        }

        const uniqueGenres = [...new Set(shows.flatMap(({ genres }) => genres))].sort();

        const result = paginate(shows, pageNum, sizeNum);
        result.genres = uniqueGenres;

        console.log(`[${source.toUpperCase()}] q="${searchQuery}" page=${result.page} size=${result.size} genres=[${genreList.join(',')}] -> ${result.items.length} shows (of ${result.total})`);

        res.json(result);
    } catch (error) {
        console.error('Search error:', error.message);
        res.status(500).json({ error: 'Failed to fetch shows' });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});