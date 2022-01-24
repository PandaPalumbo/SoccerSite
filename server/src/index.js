import { transformPlayerStats } from "./utils/transforms/playerTransforms.js";

import {config} from "dotenv";
import express from "express";
import cors from "cors";
import axios from "axios";

config();
const app = express();
const port = 3000;
app.use(cors());


const API_URL = 'https://api-football-v1.p.rapidapi.com/v3/';
const SEARCH_URL = 'https://api-football-v1.p.rapidapi.com/v2/';
const API_KEY = process.env.API_KEY;
const X_RAPIDAPI_HOST = 'api-football-v1.p.rapidapi.com'


// TODO extract functions to individual .js files, files with data relations (players, seasons, teams, etc)

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/search/players', async (req, res) => {
    let search = req.query.search;
    if (search) {
        let data = await searchRetrieve({
            url: SEARCH_URL,
            type: `players/search/${search}`,
            method: 'GET',
        })
        res.send(data)
    } else
        res.send('No player name sent...')
})

app.get('/player', async (req, res) => {
    let id = req.query.id;
    const now = new Date()
    const lastYear = now.getFullYear() - 1
    const thisYear = now.getFullYear()
    if (id) {
        let lastYearResponse = await retrieve({
            url: API_URL,
            type: `players`,
            method: 'GET',
            params: {id, season: lastYear }
        })
        let thisYearResponse = await retrieve({
            url: API_URL,
            type: `players`,
            method: 'GET',
            params: {id, season: thisYear}
        })
        let statistics = transformPlayerStats([...thisYearResponse[0].statistics, ...lastYearResponse[0].statistics])
        const response = {
            player: thisYearResponse[0].player,
            statistics
        }
        res.send(response)
    } else
        res.send('No player name sent...')
})

app.get('/player/seasons', async (req, res) => {
    let id = req.query.id;
    if (id) {
        let response = await retrieve({
            url: API_URL,
            type: `players/seasons`,
            method: 'GET',
            params: {id }
        })
        res.send(response[0])
    } else
        res.send('No player name sent...')
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

async function searchRetrieve(config) {
    try {
        let axiosConfig = {
            method: config.method,
            url: config.url + config.type,
            headers: {
            'x-rapidapi-host': X_RAPIDAPI_HOST,
                'x-rapidapi-key': API_KEY
        },
            params: config.params
        }
        let {data : { api: { players, results }}} = await axios(axiosConfig)
        return players;
    } catch (e) {
        throw Error(e)
    }
}

async function retrieve(config) {
    try {
        let axiosConfig = {
            method: config.method,
            url: config.url + config.type,
            headers: {
                'x-rapidapi-host': X_RAPIDAPI_HOST,
                'x-rapidapi-key': API_KEY
            },
            params: config.params
        }
        let { data: {response}} = await axios(axiosConfig)
        return response;
    } catch (e) {
        throw Error(e)
    }
}