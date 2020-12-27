CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_SearchPlayers`(search varchar(250))
BEGIN

select players.*, 
player_stats.*, 
team_squad.*, 
teams.name as team_name, 
leagues.name as league_name, 
countries.name as country_name,
leagues.id as league_id from players
	INNER JOIN player_stats on player_stats.player_id = players.id
    INNER JOIN team_squad on team_squad.player_id = players.id
    INNER JOIN teams on teams.id = team_squad.team_id
    INNER JOIN leagues on team_squad.season_id = leagues.current_season_id
    INNER JOIN countries on countries.id = players.country_id
	where LOWER(players.common_name) LIKE CONCAT('%', LOWER(search), '%');

END