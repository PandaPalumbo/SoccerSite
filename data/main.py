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
    for league in leagues:
        config = {
            'type': 'fixtures',
            'query': '&t=season&season_id='+ str(league['current_season_id'])
        }
        res = api_call(config)
        if(res):
            for fixture in res:
                fixtures.append(fixture)
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
    print(res)
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
                 VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'''

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


api_get_fixtures()

database.cnx.close()
