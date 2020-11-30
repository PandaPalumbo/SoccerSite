import database
import settings
import requests

base_url = "https://api.soccersapi.com/v2.2/"
api_user_config = "?user={}&token={}".format(settings.API_USER, settings.API_TOKEN)

db = database.cnx


# API_GETTERS ###############################################
def api_get_all_countries():
    config1 = {
        'type': 'countries/',
        'query': '&t=list&page=1'
    }
    config2 = {
        'type': 'countries/',
        'query': '&t=list&page=2'
    }
    result1 = api_call(config1)
    result2 = api_call(config2)
    result = result1 + result2
    for res in result2:
        print(res)
    return result


def api_get_all_leagues():
    config = {
        "type": 'leagues/',
        "query": '&t=list&page=1'
    }
    result = api_call(config)
    return result


def api_get_teams():
    countries = db_get_league_countries()
    teams = []
    for country in countries:
        config = {
            "type": 'teams/',
            "query": '&t=list&country_id=' + str(country['id'])
        }
        result = api_call(config)
        if (result):
            for team in result:
                teams.append(team)
    print('Teams (' + str(len(teams)) + '): ' + str(teams))
    return teams


def api_get_players():
    countries = db_get_countries()
    players = []
    ids = []
    for country in countries:
        config = {
            "type": 'players/',
            "query": '&t=list&country_id=' + str(country['id'])
        }
        result = api_call(config)
        if (result):
            for player in result:
                if (player['id'] not in ids):
                    ids.append(player['id'])
                    players.append(player)
    # print('Players (' + str(len(players)) + '): ' + str(players))
    return players


def api_get_fixtures():
    leagues = db_get_leagues()
    fixtures = []
    ids = []
    for league in leagues:
        config = {
            'type': 'fixtures/',
            'query': '&t=season&season_id=' + str(league['current_season_id'])
        }
        res = api_call(config)
        if (res):
            for fixture in res:
                if fixture['id'] not in ids:
                    ids.append(fixture['id'])
                    fixtures.append(fixture)
    return fixtures


def api_get_league_stats():
    leagues = db_get_leagues()
    fixtures = []
    ids = []
    for league in leagues:
        config = {
            'type': 'stats/',
            'query': '&t=league&id=' + str(league['id'])
        }
        res = api_call(config)
        if (res):
            fixtures.append(res)
    print(fixtures)
    return fixtures


# DB GETTERS ####################################################
def db_get_leagues():
    cursor = db.cursor()
    sql = """
        SELECT * FROM 
        football.leagues
        WHERE country_name != 'World'
    """
    cursor.execute(sql)

    res = db_res_to_json(cursor)
    return res


def db_get_league_countries():
    cursor = db.cursor()
    sql = """
        SELECT * FROM countries WHERE id IN (SELECT country_id FROM football.leagues WHERE country_name != 'World')
    """
    cursor.execute(sql)
    res = db_res_to_json(cursor)
    # print(res)
    return res


def db_get_countries():
    cursor = db.cursor()
    sql = """
            SELECT * FROM countries WHERE continent != 'World'
        """
    cursor.execute(sql)
    res = db_res_to_json(cursor)
    # print(res)
    return res


# SETTERS ###########################################################

def save_countries():
    countries = api_get_all_countries()
    cursor = db.cursor()
    sql = '''
        INSERT INTO football.countries
        (id, name, continent, sub_region, code)
        VALUES (%s, %s,%s, %s, %s)
    '''
    for count in countries:
        print('Attempting Saving team: ' + count['name'])
        val = (
            count['id'], count['name'], count['continent'], count['sub_region'], count['code']
        )
        cursor.execute(sql, val)
        db.commit()
        print(cursor.rowcount, ' record inserted. Saved: ' + count['name'])


def save_leagues():
    leagues = api_get_all_leagues()
    cursor = db.cursor()
    sql = '''
        INSERT INTO football.leagues 
            (id, continent_id, continent_name, country_id, country_name, current_round_id, current_season_id, current_stage_id, is_amateur, is_cup, name)
             VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'''
    for league in leagues:
        print(league)
        val = (
            league['id'], league['continent_id'], league['continent_name'], league['country_id'],
            league['country_name'],
            league['current_round_id'], league['current_season_id'], league['current_stage_id'], league['is_amateur'],
            league['is_cup'], league['name'])
        cursor.execute(sql, val)
        db.commit()
        print(cursor.rowcount, ' record inserted.')


def save_teams():
    teams = api_get_teams()
    cursor = db.cursor()
    sql = '''
        INSERT INTO football.teams
        (id, country_id, name)
        VALUES (%s, %s,%s)
    '''
    for team in teams:
        print('Attempting Saving team: ' + team['name'])
        val = (
            team['id'], team['country_id'], team['name']
        )
        cursor.execute(sql, val)
        db.commit()
        print(cursor.rowcount, ' record inserted. Saved: ' + team['name'])


def save_players():
    players = api_get_players()
    cursor = db.cursor()
    sql = '''
        INSERT INTO football.players 
            (id, name, common_name, firstname, lastname, birthday, birthcountry, birthplace, weight, height, img, country_id)
             VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'''
    for player in players:
        print(player)
        val = (
            player['id'], player['name'], player['common_name'], player['firstname'],
            player['lastname'],
            player['birthday'], player['birthcountry'], player['birthplace'], player['weight'],
            player['height'], player['img'], player['country']['id'])
        cursor.execute(sql, val)
        db.commit()
        print(cursor.rowcount, ' record inserted.')


def save_fixtures():
    fixtures = api_get_fixtures()

    sql = '''
            INSERT INTO football.fixtures 
                (
                id,
                 status, 
                pitch, 
                referee_id,
                 round_id, 
                 season_id,
                  stage_id, 
                  group_id, 
                  aggregate_id, 
                  winner_team_id,
                   venue_id, 
                   leg, 
                   deleted, 
                   time, 
                   home_team_id,
                   away_team_id,
                   league_id,
                   home_score, 
                   away_score,
                   ht_score,
                   ft_score,
                   et_score,
                   ps_score,
                   home_position,
                   away_position,
                   first_assistant_id,
                   second_assistant_id,
                   fourth_assistant_id
                   )
                 VALUES (
                %s,
                 %s, 
                %s, 
                %s,
                 %s, 
                 %s,
                  %s, 
                  %s, 
                  %s, 
                  %s,
                   %s, 
                   %s, 
                   %s, 
                   %s, 
                   %s,
                   %s,
                   %s,
                   %s, 
                   %s,
                   %s,
                   %s,
                   %s,
                   %s,
                   %s,
                   %s,
                   %s,
                   %s,
                   %s
                   )'''
    cursor = db.cursor()
    # sql2 = """
    #     INSERT INTO fixture_weather
    #     (desc, temp_celc, temp_fahrenheit, wind_kmph, wind_miles, wind_direction, humidity_percent, pressure) VALUES
    #     (%s, %s, %s, %s, %s, %s, %s, %s)
    # """

    for fixture in fixtures:
        val = (
            fixture['id'],
            fixture['status'],
            fixture['pitch'],
            fixture['referee_id'],
            fixture['round_id'],
            fixture['season_id'],
            fixture['stage_id'],
            fixture['group_id'],
            fixture['aggregate_id'],
            fixture['winner_team_id'],
            fixture['venue_id'],
            fixture['leg'],
            fixture['deleted'],
            fixture['time']['timestamp'],
            fixture['teams']['home']['id'],
            fixture['teams']['away']['id'],
            fixture['league']['id'],
            fixture['scores']['home_score'],
            fixture['scores']['away_score'],
            fixture['scores']['ht_score'],
            fixture['scores']['ft_score'],
            fixture['scores']['et_score'],
            fixture['scores']['ps_score'],
            fixture["standings"]['home_position'],
            fixture["standings"]['away_position'],
            fixture["assistants"]['first_assistant_id'],
            fixture["assistants"]['second_assistant_id'],
            fixture["assistants"]['fourth_assistant_id']
        )

        cursor.execute(sql, val)
        db.commit()
        print(cursor.rowcount, ' record inserted.')
        # if(fixture['weather_report'] != None):
        #     val2 = (
        #         fixture['weather_report']['desc'],
        #         str(fixture['weather_report']['temp']['celsius']),
        #         str(fixture['weather_report']['temp']['fahrenheit']),
        #         str(fixture['weather_report']['wind']['kmph']),
        #         str(fixture['weather_report']['wind']['miles']),
        #         fixture['weather_report']['wind']['direction'],
        #         str(fixture['weather_report']['humidity_percent']),
        #         str(fixture['weather_report']['pressure'])
        #     )
        #     cursor.execute(sql2, val2)
        #
        # print(cursor.rowcount, ' record inserted.')


def save_league_stats():
    stats = api_get_league_stats()
    cursor = db.cursor()
    sql = '''
        INSERT INTO league_stats (season_id,league_id,number_of_teams,number_of_matches,number_of_matches_played,team_most_scoredid,team_most_scoredtotal_goals,player_most_scoredid,player_most_scoredtotal_goals,substituted_intotal,substituted_inavg_per_match,substituted_inavg_every_minutes,assiststotal,assistsavg_per_match,assistsavg_every_minutes,cardstotaltotal,cardstotalavg_per_match,cardstotalavg_every_minutes,cardsyellowtotal,cardsyellowavg_per_match,cardsyellowavg_every_minutes,cardsyellowredtotal,cardsyellowredavg_per_match,cardsyellowredavg_every_minutes,cardsredtotal,cardsredavg_per_match,cardsredavg_every_minutes,goalsoveralltotal,goalsoverallpercentage_total_goals,goalsoverallavg_per_match,goalsoverallavg_every_minutes,goalshometotal,goalshomepercentage_total_goals,goalshomeavg_per_match,goalshomeavg_every_minutes,goalsawaytotal,goalsawaypercentage_total_goals,goalsawayavg_per_match,goalsawayavg_every_minutes,clean_sheetsoveralltotal,clean_sheetsoverallavg_per_match,clean_sheetshometotal,clean_sheetshomeavg_per_match,clean_sheetsawaytotal,clean_sheetsawayavg_per_match,goals_scored_range015total,goals_scored_range015percentage_total_goals,goals_scored_range1530total,goals_scored_range1530percentage_total_goals,goals_scored_range3045total,goals_scored_range3045percentage_total_goals,goals_scored_range4560total,goals_scored_range4560percentage_total_goals,goals_scored_range6075total,goals_scored_range6075percentage_total_goals,goals_scored_range7590total,goals_scored_range7590percentage_total_goals,goals_scored_range90120total,goals_scored_range90120percentage_total_goals,goal_lineover05total,goal_lineover05percentage_total_matches,goal_lineover15total,goal_lineover15percentage_total_matches,goal_lineover25total,goal_lineover25percentage_total_matches,goal_lineover35total,goal_lineover35percentage_total_matches,goal_lineover45total,goal_lineover45percentage_total_matches,goal_lineover55total,goal_lineover55percentage_total_matches,goal_lineunder05total,goal_lineunder05percentage_total_matches,goal_lineunder15total,goal_lineunder15percentage_total_matches,goal_lineunder25total,goal_lineunder25percentage_total_matches,goal_lineunder35total,goal_lineunder35percentage_total_matches,goal_lineunder45total,goal_lineunder45percentage_total_matches,goal_lineunder55total,goal_lineunder55percentage_total_matches) 
        VALUES(%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ,%s
        ) 
    '''
    for stat in stats:
        val = (stat['season_id']
        ,stat['league_id']
        ,stat['number_of_teams']
        ,stat['number_of_matches']
        ,stat['number_of_matches_played']
        ,stat['team_most_scored']['id']
        ,stat['team_most_scored']['total_goals']
        ,stat['player_most_scored']['id']
        ,stat['player_most_scored']['total_goals']
        ,stat['substituted_in']['total']
        ,stat['substituted_in']['avg_per_match']
        ,stat['substituted_in']['avg_every_minutes']
        ,stat['assists']['total']
        ,stat['assists']['avg_per_match']
        ,stat['assists']['avg_every_minutes']
        ,stat['cards']['total']['total']
        ,stat['cards']['total']['avg_per_match']
        ,stat['cards']['total']['avg_every_minutes']
        ,stat['cards']['yellow']['total']
        ,stat['cards']['yellow']['avg_per_match']
        ,stat['cards']['yellow']['avg_every_minutes']
        ,stat['cards']['yellowred']['total']
        ,stat['cards']['yellowred']['avg_per_match']
        ,stat['cards']['yellowred']['avg_every_minutes']
        ,stat['cards']['red']['total']
        ,stat['cards']['red']['avg_per_match']
        ,stat['cards']['red']['avg_every_minutes']
        ,stat['goals']['overall']['total']
        ,stat['goals']['overall']['percentage_total_goals']
        ,stat['goals']['overall']['avg_per_match']
        ,stat['goals']['overall']['avg_every_minutes']
        ,stat['goals']['home']['total']
        ,stat['goals']['home']['percentage_total_goals']
        ,stat['goals']['home']['avg_per_match']
        ,stat['goals']['home']['avg_every_minutes']
        ,stat['goals']['away']['total']
        ,stat['goals']['away']['percentage_total_goals']
        ,stat['goals']['away']['avg_per_match']
        ,stat['goals']['away']['avg_every_minutes']
        ,stat['clean_sheets']['overall']['total']
        ,stat['clean_sheets']['overall']['avg_per_match']
        ,stat['clean_sheets']['home']['total']
        ,stat['clean_sheets']['home']['avg_per_match']
        ,stat['clean_sheets']['away']['total']
        ,stat['clean_sheets']['away']['avg_per_match']
        ,stat['goals_scored_range']["0-15"]['total']
        ,stat['goals_scored_range']["0-15"]['percentage_total_goals']
        ,stat['goals_scored_range']["15-30"]['total']
        ,stat['goals_scored_range']["15-30"]['percentage_total_goals']
        ,stat['goals_scored_range']["30-45"]['total']
        ,stat['goals_scored_range']["30-45"]['percentage_total_goals']
        ,stat['goals_scored_range']["45-60"]['total']
        ,stat['goals_scored_range']["45-60"]['percentage_total_goals']
        ,stat['goals_scored_range']["60-75"]['total']
        ,stat['goals_scored_range']["60-75"]['percentage_total_goals']
        ,stat['goals_scored_range']["75-90"]['total']
        ,stat['goals_scored_range']["75-90"]['percentage_total_goals']
        ,stat['goals_scored_range']["90-120"]['total']
        ,stat['goals_scored_range']["90-120"]['percentage_total_goals']
        ,stat['goal_line']['over']['0.5']['total']
        ,stat['goal_line']['over']['0.5']['percentage_total_matches']
        ,stat['goal_line']['over']['1.5']['total']
        ,stat['goal_line']['over']['1.5']['percentage_total_matches']
        ,stat['goal_line']['over']['2.5']['total']
        ,stat['goal_line']['over']['2.5']['percentage_total_matches']
        ,stat['goal_line']['over']['3.5']['total']
        ,stat['goal_line']['over']['3.5']['percentage_total_matches']
        ,stat['goal_line']['over']['4.5']['total']
        ,stat['goal_line']['over']['4.5']['percentage_total_matches']
        ,stat['goal_line']['over']['5.5']['total']
        ,stat['goal_line']['over']['5.5']['percentage_total_matches']
        ,stat['goal_line']['under']['0.5']['total']
        ,stat['goal_line']['under']['0.5']['percentage_total_matches']
        ,stat['goal_line']['under']['1.5']['total']
        ,stat['goal_line']['under']['1.5']['percentage_total_matches']
        ,stat['goal_line']['under']['2.5']['total']
        ,stat['goal_line']['under']['2.5']['percentage_total_matches']
        ,stat['goal_line']['under']['3.5']['total']
        ,stat['goal_line']['under']['3.5']['percentage_total_matches']
        ,stat['goal_line']['under']['4.5']['total']
        ,stat['goal_line']['under']['4.5']['percentage_total_matches']
        ,stat['goal_line']['under']['5.5']['total']
        ,stat['goal_line']['under']['5.5']['percentage_total_matches']
        )
        cursor.execute(sql, val)
        db.commit()
        print(cursor.rowcount, ' record inserted.')


# API ##############################################################
def api_call(config):
    url = base_url + config['type'] + api_user_config + config['query']
    print('Calling URL: ' + url)
    res = requests.request("GET", url).json()
    if ('data' in res):
        res = res['data']
        return res
    else:
        return False


def db_res_to_json(cursor):
    # Get all the rows
    res = cursor.fetchall()
    # get row column names https://stackoverflow.com/questions/43796423/python-converting-mysql-query-result-to-json
    row_headers = [x[0] for x in cursor.description]
    final = []
    for row in res:
        row_obj = {}
        for i in range(0, len(row_headers) - 1):
            row_obj[row_headers[i]] = row[i]
        final.append(row_obj)
    return final


database.cnx.close()
