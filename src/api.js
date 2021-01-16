import axios from 'axios';
import fbConfig from './firebase';
import firebase from 'firebase';

//base url stuff for https://soccersapi.com/page/documentation
//https://documenter.getpostman.com/view/11399692/SztA99ag?version=latest#dd5b9f84-354e-46b5-8479-227bf8a98573

//API Username and token saved to .env file
const user = process.env.VUE_APP_USER
const token = process.env.VUE_APP_TOKEN

// the base url for the api,
// and the user/token query params that need to be tacked on after our type is added to base url
const baseQuery = '?user=' + user + '&token=' + token;
const baseUrl = 'https://api.soccersapi.com/v2.2/'


let db = null;

export default {
    saveData: {
        saveAllLeagues(callback) {
            let params =
                {
                    type: 'leagues',
                    query: '&t=list&page=1'
                }
            let config = this.buildAPIConfig(params);
            retrieve(config, data => {
                let leagues = data.data;
                leagues.map(league => {
                    db.collection('competitions').doc(league.id).set(league);
                })
                callback(data.data)
            });
        },
        async saveAllTeams(callback) {
            const leagues = await db.collection('competitions').where('country_name', '==', 'France').get()
            if (leagues.empty) {
                console.log('no leagues');
                callback(false)
            }
            leagues.forEach(league => {
                let data = league.data();
                let params =
                    {
                        type: 'teams',
                        query: '&t=byseason&season_id='
                    }
                params.query += data.current_season_id;
                let config = this.buildAPIConfig(params);
                setTimeout(
                    retrieve(config, teams => {
                        teams.data.map(team => db.collection('teams').doc(team.name).set(team))
                    }),
                    2000)
            })
            callback('Done')
        },
        saveAllFixtures() {
            //England, USA, Mexico, Brazil, France, Germany, Portugal, Netherlands, Italy, Spain
            // const countries = ['England', 'USA', 'Mexico', 'Brazil', 'France', 'Germany', 'Portugal', 'Netherlands', 'Italy', 'Spain']
            db.collection('competitions').where('country_name', '==', 'Spain').get()
                .then(leagues => {
                    try {
                        leagues.forEach(league => {
                            league = league.data();
                            let params =
                                {
                                    type: 'fixtures',
                                    query: '&t=season&season_id='
                                }
                            console.log(league)
                            params.query += league.current_season_id;
                            let config = this.buildAPIConfig(params);
                            retrieve(config, (data) => {
                                let fixtures = data.data;
                                console.log(fixtures);
                                fixtures.map(fixture => {
                                    db.collection('fixtures').doc("" + fixture.id).set(fixture, {merge: true})
                                });
                            })
                        });
                    } catch (e) {
                        console.error(e);
                    }
                })
        },
        saveLeagueStats() {
            let league_ids = [1358, 2802, 2803, 2878, 3104, 3105, 3699, 3704, 377, 547, 580, 583, 592, 594, 637, 638, 719, 721, 764, 765];
            league_ids.forEach(id => {
                let params =
                    {
                        type: 'stats',
                        query: '&t=league&id='
                    }
                params.query += id;
                let config = this.buildAPIConfig(params);
                setTimeout(function () {
                    retrieve(config, data => {
                        let stats = data.data;
                        console.log(stats)
                    })
                }, 1500);
            })
        },
        savePlayers() {
            //let country ids = [25,76,81,96,124,3,4,5,6,7];
            let params = {
                type: 'teams',
                query: 't=info&country_id='
            }
            params.query += '25'
            let config = this.buildAPIConfig(params);
            retrieve(config, data => {
                let players = data.data;
                console.log(players);
            })
        },
        //building the url for the config
        buildAPIConfig: (params) => {
            let config = {};
            const baseConfig = {
                method: 'get',
                url: baseUrl,
                headers: {}
            };
            config = baseConfig;
            config.url += params.type + '/' + baseQuery
            if (params.query)
                config.url += params.query;
            return config
        },
    },
    getData: {
        //TODO hook up with cloud sql instead of firebase
        getLeagues: (callback) => {
            let retArr = [];
            db.collection('competitions').where('is_amateur', '==', '0').get()
                .then((leagues => {
                    leagues.forEach(league => {
                        let data = league.data();
                        retArr.push(data)
                    })
                }))
                .then(() => {
                    callback(retArr);
                })
                .catch(e => console.error(e));
        },

        //gets teams from cloud sql
        getTeams: (callback) => {
            let config = buildDBConfig('teams');
            retrieve(config, (data) => {
                callback(data)
            })
        },
        //TODO hook up with cloud sql

        getLeagueStats: (id, callback) => {
            let params = {
                type: 'stats',
                query: '&t=league&id=' + id,
            }
            let config = buildAPIConfig(params);
            retrieve(config, data => callback(data));
        },

        //hits the endpoint that retrieves players given a name
        searchPlayers: (query, callback) => {
            let config = buildDBConfig('search/players/?search=' + encodeURI(query));
            retrieve(config, (data) => {

                callback(data);
            })
        },

        //hits the endpoint that retrieves players given a name
        searchLeagues: (query, callback) => {
            let config = buildDBConfig('search/leagues/?search=' + encodeURI(query));
            retrieve(config, (data) => {

                callback(data);
            })
        },

    },
    firebase: {
        //gets firebase started for the app
        init() {
            firebase.initializeApp(fbConfig.config)
            db = firebase.firestore();
        },
    },
    util: {
        flattenJson(obj) {
            let flattened_obj = {};
            let keys = Object.keys(obj);
            keys.forEach ( key => {
                if (obj[key] && typeof obj[key] == "object") {
                    let subKeys = Object.keys(obj[key]);
                    subKeys.forEach (subKey => {
                        flattened_obj[key + '_' + subKey] = obj[key][subKey]
                    })
                } else {
                    if(obj[key] && obj[key].data){
                        flattened_obj[key] = obj[key].data;
                    }else{
                        flattened_obj[key] = obj[key];
                    }
                }
            })
            return flattened_obj;
        },
        prettyCasing(string) {
            let splitString = string.split('_');
            let res = "";
            splitString.map(string => {
                string = string.charAt(0).toUpperCase() + string.slice(1)
                res += string + " "
            })
            return res;
        },
        getColor() {
            return this.$randomColor({luminosity: 'bright'}).toString();
        },
    }
}

function buildAPIConfig(params) {
    let config = {};
    //this is the basic structure of the JSON passed to axios to fetch data
    const baseConfig = {
        method: 'get',
        url: baseUrl,
        headers: {}
    };
    config = baseConfig;
    //tacking on our API query type (ex: players, teams, stats, etc..)
    //then adds our user info, and if there are any specific query params passed to function, add those at the end
    config.url += params.type + '/' + baseQuery
    if (params.query)
        config.url += params.query;
    return config
}

//same as above, but configured to hit our cloud sql with endpoint url baked in already.
function buildDBConfig(params) {
    const config = {
        method: 'get',
        url: 'http://localhost:3000/' + params,
        headers: {}
    };
    return config;
}

//gets data given the proper config
//works for both api calls and cloud sql calls
function retrieve(config, cb) {
    axios(config).then(data => {
        let res = data.data;
        // console.log(data.data)
        cb(res);
    }).catch((e) => console.error(e));
}



