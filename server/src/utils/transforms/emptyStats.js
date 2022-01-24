export const emptyStats = () => {
    return  {
        "teams":[],
        "leagues": [],
        "games": {
            "appearences": 0,
            "lineups": 0,
            "minutes": 0,
            "number": 0,
            "positions": [],
            "rating": 0,
            "captain": 0
        },
        "substitutes": {
            "in": 0,
            "out": 0,
            "bench": 0
        },
        "shots": {
            "total": 0,
            "on": 0
        },
        "goals": {
            "total": 0,
            "conceded": 0,
            "assists": 0,
            "saves": 0
        },
        "passes": {
            "total": 0,
            "key": 0,
            "accuracy": 0
        },
        "tackles": {
            "total": 0,
            "blocks": 0,
            "interceptions": 0
        },
        "duels": {
            "total": 0,
            "won": 0
        },
        "dribbles": {
            "attempts": 0,
            "success": 0,
            "past": 0
        },
        "fouls": {
            "drawn": 0,
            "committed": 0
        },
        "cards": {
            "yellow": 0,
            "yellowred": 0,
            "red": 0
        },
        "penalty": {
            "won": 0,
            "commited": 0,
            "scored": 0,
            "missed": 0,
            "saved": 0
        }
    }
}