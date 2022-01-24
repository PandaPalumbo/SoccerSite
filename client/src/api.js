import axios from "axios";


export const searchPlayers = (query, cb) => {
    axios.get(`http://localhost:3000/search/players?search=${query}`)
        .then(({data}) => {
            console.log('Players: ', data)
            if(cb)
                cb(data)
            return data
        }).catch(error => {
        console.log(error)
    })
}

export const getPlayerSeasons = ({id}, cb) => {
    axios.get(`http://localhost:3000/player/seasons?id=${id}`)
        .then(({data}) => {
            console.log('Player: ', data)
            if(cb)
                cb(data)
            return data
        }).catch(error => {
        console.log(error)
    })
}


export const getPlayerInformation = ({id}, cb) => {
    axios.get(`http://localhost:3000/player?id=${id}`)
        .then(({data}) => {
            console.log('Player: ', data)
            if(cb)
                cb(data)
            return data
        }).catch(error => {
        console.log(error)
    })
}


