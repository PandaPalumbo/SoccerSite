import axios from 'axios';

//base url stuff for https://soccersapi.com/page/documentation
//https://documenter.getpostman.com/view/11399692/SztA99ag?version=latest#dd5b9f84-354e-46b5-8479-227bf8a98573
const user = process.env.VUE_APP_USER
const token = process.env.VUE_APP_TOKEN
const baseQuery = '?user='+user+'&token='+token;
const baseUrl = 'https://api.soccersapi.com/v2.2/'
//basic axios config
const baseConfig = {
    method: 'get',
    url: baseUrl,
    headers: {}
};


export default {
    saveData:{
        getAllLeagues(cb){
            let params =
                {
                    type: 'leagues',
                    query:'&t=list&page=1'
                }
            let config = buildConfig(params);
            getData(config, data => {
                // saveToJson(params, data.data)
                cb(data.data)
            });
        },
    },
    firebase:{

    },
}
//gets data given the proper config
function getData(config, cb) {
    axios(config)
        .then(res => {
            cb(res.data)
        })
        .catch(err => console.log(err))
}

//building the url for the config
function buildConfig(params){
    let config = baseConfig;
    let callType = params.type;
    let query = params.query;
    config.url += callType + '/' + baseQuery
    if(query)
        config.url += query;
    return config
}
//
// function saveToJson(params, data){
//     // fs.writeFileSync('./public/data/'+ params.type +'.json', data)
// }
