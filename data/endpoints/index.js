const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;
app.use(cors());


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
            query:'&include=' +
                'country,' +
                'season,' +
                'season.stats,' +
                'season.stats.mostcleansheetsteam,' +
                'season.stats.team_with_most_goals,' +
                'season.stats.team_with_most_goals_per_match,' +
                'season.stats.mostconcededgoalsteam,' +
                'season.stats.mostcornersteam,' +
                'seasons,seasons.stats,' +
                'season.aggregatedAssistscorers.player,' +
                'season.aggregatedAssistscorers.team,' +
                'season.cardscorers.player,' +
                'season.cardscorers.team,' +
                'season.aggregatedGoalscorers.player,' +
                'season.aggregatedGoalscorers.team,season.fixtures,' +
                'season.round,'+
                'season.fixtures.localTeam,' +
                'season.fixtures.visitorTeam,' +
                'season.upcoming.localTeam,' +
                'season.upcoming.visitorTeam,' +
                'season.results.localTeam,' +
                'season.results.visitorTeam'
        })
        console.log(config);
        retrieve(config, (data)=> {
            console.log(data)
            res.send(data.data);
        })
    }
    else
        res.send('No player name sent...')
})

app.get('/search/teams', (req, res) => {
    let search = req.query.search;
    if(search) {
        let config = buildAPIConfig({
            type:'teams/search/'+search,
            query:'&include=league,country,squad.player.position,coach,transfers,sidelined,' +
                'stats.season.league,venue,fifaranking,uefaranking,trophies,' +
                'latest.localTeam,latest.visitorTeam,latest.league,'+
                'upcoming.localTeam,upcoming.visitorTeam,upcoming.league,' +
                'transfers.fromTeam,transfers.toTeam,transfers.player'
        })
        console.log(config);
        retrieve(config, (data)=> {

            res.send(data.data);
        })
    }
    else
        res.send('No player name sent...')
})

app.get('/search/teams/standings', (req, res) => {
    let search = req.query.id;
    if(search) {
        let config = buildAPIConfig({
            type:'teams/'+search,
            query:'&include=aggregatedGoalscorers.player,aggregatedGoalscorers.team,' +
                'aggregatedAssistscorers.player,aggregatedAssistscorers.team,' +
                'aggregatedCardscorers.player,aggregatedCardscorers.team'
        })
        console.log(config);
        retrieve(config, (data)=> {

            res.send(data.data);
        })
    }
    else
        res.send('No id name sent...')
})

app.get('/standings/season/', (req, res) => {
    let search = req.query.id;
    if(search) {
        let config = buildAPIConfig({
            type:'standings/season/'+search,
            query:'&include=standings.team'
        })
        console.log(config);
        retrieve(config, (data)=> {

            res.send(data.data);
        })
    }
    else
        res.send('No id name sent...')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

function retrieve(config,cb) {
    axios(config).then(data =>{
        let res = data.data;
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
