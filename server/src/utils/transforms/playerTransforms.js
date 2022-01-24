import { emptyStats } from "./emptyStats.js";


export const transformPlayerStats = (statistics) =>{
    const combinedStats = emptyStats()
    statistics.forEach(stats => {
        for(const category in stats){
            if(category === 'team'){
                combinedStats.teams.push(stats[category])
            }
            else if (category === 'league'){
                combinedStats.leagues.push(stats[category])
            }
            else {
                for(const field in stats[category]){
                    if(field === 'position'){
                        combinedStats.games.positions.push(stats[category][field])
                    }
                    else if(field === 'rating' && stats[category][field]){
                        combinedStats[category][field] += parseFloat(stats[category][field])
                    }
                    else if(stats[category][field] && field !== 'rating'){
                        combinedStats[category][field] += stats[category][field]
                    }
                }
            }
        }
    })
    combinedStats.games.rating = combinedStats.games.rating / statistics.filter(stats => stats.games.rating).length
    combinedStats.passes.accuracy = combinedStats.passes.accuracy  / statistics.filter(stats => stats.passes.accuracy ).length
    return combinedStats
}