CREATE PROCEDURE `sp_GetTeam` (teamID INT)
BEGIN

-- Gets all the stats
SELECT id, teams.name, country_id, TS.season_id, L.country_name, L.continent_name, L.name as league_name, stats.* FROM teams
	INNER JOIN
		team_seasons as TS ON  TS.team_id = teams.id INNER JOIN
		leagues as L ON TS.season_id = L.current_season_id INNER JOIN
        team_stats as stats ON teams.id = team_stats.team_id;

-- GET PLAYERS

SELECT team_squad.*, players.* FROM team_squad 
	INNER JOIN
		players ON team_squad.player_id = players.id
WHERE team_id = teamID;

END
