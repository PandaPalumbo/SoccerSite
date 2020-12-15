CREATE DEFINER=`mpalumbo`@`%` PROCEDURE `sp_SearchPlayers`(search varchar(250))
BEGIN

select players.*, player_stats.*, team_squad.team_id, teams.name as team_name, leagues.name as league_name from players
	INNER JOIN player_stats on player_stats.player_id = players.id
    INNER JOIN team_squad on team_squad.player_id = players.id
    INNER JOIN teams on teams.id = team_squad.team_id
    INNER JOIN leagues on team_squad.season_id = league.current_season_id
	where LOWER(players.common_name) LIKE CONCAT('%', LOWER(search), '%');
	
END