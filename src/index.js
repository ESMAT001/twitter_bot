const express = require('express');
const got = require('got');
const createPost = require('./createPost');
const app = express();
const port = process.env.PORT || 3001;
const apiKey = '3d97e93f74df6d3dd759d238a7b8564c'


app.get("/tweet/:movieId", async (req, res) => {
    console.log('working')
    const movieId = req.params.movieId;
    const {username, password} = req.query;

    if (!(username === 'admin' && password === 'qwer@12124')) {
        return res.status(401).send('Unauthorized');
    }
    if (!movieId) return res.status(400).send("No movie id provided");
    try {
        const movieDetail = await got(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`).json();
        const movieTitle = movieDetail.title;

        if (!movieTitle) return res.status(400).send("No movie title found");

        const movieReleaseDate = movieDetail.release_date;
        const movieGenre = movieDetail.genres;
        const movieRating = movieDetail.vote_average;
        const movieRuntime = movieDetail.runtime;
        const movieOriginalLanguage = movieDetail.original_language;
        const movieTitleForHashtag = movieTitle.replace(/[:-=]/g, '').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
        console.log('reached')
        res.send(await createPost(`Watch or Download ${movieTitle} 😮🔥 in #movieera\nRating: ${movieRating}\nRuntime: ${movieRuntime} minutes\nRelease Date: ${movieReleaseDate}\nOriginal Language: ${movieOriginalLanguage}\n#${movieTitleForHashtag} #${movieGenre.map(genre => genre.name).join(" #")}  https://movieera.vercel.app/movie/${movieId}`));
    } catch (error) {
        return res.status(500).send(error.message);
    }


})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))