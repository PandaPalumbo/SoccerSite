const express = require('express');
require('dotenv').config();
const cors = require('cors');
// const mysql = require('mysql');
const axios = require('axios');

const app = express();
const port = 3000;
app.use(cors());

// const connection =  mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PW,
//     database: process.env.DB
// });

const apiUrl = 'https://soccer.sportmonks.com/api/v2.0/';
const apiQuery = '?api_token='+ process.env.TOKEN;




app.get('/', (req, res) => {
    res.send('Hello world')
})


app.get('/search/players', (req, res) => {
    let search = req.query.search;
    if(search) {
        let config = buildAPIConfig({
            type:'players/search/'+search,
            query:'&include=stats,position,team,trophies,sidelined,transfers,lineups,country,team.league,stats.season,team.country,stats.league'
        })
        retrieve(config, (data)=> {
            res.send(data.data);
        })
    }
    else
        res.send('No player name sent...')
})


//https://sportmonks.com/docs/football/2.0/leagues/a/search-league-by-name/222
// nested stuff from -> https://sportmonks.com/docs/football/2.0/seasons/a/get-by-id/9
app.get('/search/leagues', (req, res) => {
    let search = req.query.search;
    if(search) {
        let config = buildAPIConfig({
            type:'leagues/search/'+search,
            query:'&include=country,season,season.stats,season.stats.mostcleansheetsteam,season.stats.mostgoalsteam,season.stats.mostgoalspermatchteam,season.stats.mostconcededgoalsteam,season.stats.mostcornersteam,seasons,seasons.stats,season.aggregatedAssistscorers.player,season.aggregatedAssistscorers.team,season.cardscorers.player,,season.cardscorers.team,season.aggregatedGoalscorers.player,season.aggregatedGoalscorers.team,season.fixtures,season.round,season.fixtures.localTeam,season.fixtures.visitorTeam,season.upcoming.localTeam,season.upcoming.visitorTeam,season.results.localTeam,results.visitorTeam'
        })
        retrieve(config, (data)=> {
            res.send(data.data);
        })
    }
    else
        res.send('No player name sent...')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

function retrieve(config,cb) {
    axios(config).then(data =>{
        let res = data.data;
        // console.log(data.data)
        cb(res);
    }).catch((e)=> console.error(e));
}

function buildAPIConfig (params){
    let config = {};
    //this is the basic structure of the JSON passed to axios to fetch data
    const baseConfig = {
        method: 'get',
        url: apiUrl,
        headers: {}
    };
    config = baseConfig;
    //tacking on our API query type (ex: players, teams, stats, etc..)
    //then adds our user info, and if there are any specific query params passed to function, add those at the end
    config.url += params.type + apiQuery
    if (params.query)
        config.url += params.query;
    return config
}
