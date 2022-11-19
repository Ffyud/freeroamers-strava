import requests
import sys
import json
import datetime

def getstravadata(authorization_code: str):

    # Result token: http://localhost/exchange_token?state=&code=9d4c5152fbde99afa2346504a5818b3d44a5abbb&scope=read,read_all

    client_id = "93718"
    client_secret = "565e029eaaff81270bbf2e3b01079682355a2041"
    refresh_token = ""

    print("")
    print("authorization_code: " + authorization_code)
    print("")
    ENDPOINT_PERMISSION = "http://www.strava.com/oauth/authorize?client_id=" + client_id+ "&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=auto&scope=activity:read_all"
    
    ENDPOINT_OAUTH_TOKEN = "https://www.strava.com/oauth/token?client_id="+ client_id +"&client_secret=" + client_secret + "&code=" + authorization_code + "&grant_type=authorization_code"
    
    ENDPOINT_REFRESH_TOKEN = "https://www.strava.com/api/v3/oauth/token?client_id=" + client_id + "&client_secret=" + client_secret + "&grant_type=refresh_token&refresh_token="+refresh_token+""
    
    ENDPOINT_STRAVA_DATA = "https://www.strava.com/api/v3/" +  "athlete/activities"
    
    response_token = requests.post(ENDPOINT_OAUTH_TOKEN)
    if response_token.status_code == 200:

        json_response = response_token.json()
        refresh_token = json_response["refresh_token"]
        access_token = json_response["access_token"]
        print("refresh_token: " + refresh_token)
        print("access_token: " + access_token)
        
        headers = {
            "Authorization" : "Bearer " + access_token + ""
        }

        print("bevragen nu: " + ENDPOINT_STRAVA_DATA + "")
        response_data = requests.get(ENDPOINT_STRAVA_DATA, headers=headers).json()
        response_data
        with open("" + str(datetime.datetime.now()) + ".json", 'w') as outfile:
            outfile.write(json.dumps(response_data,indent=2))

        # ENDPOINT_REFRESH_TOKEN
    else:
        print("status " + str(response_token.status_code) + " teruggekregen")
        print("")
        print("haal een nieuwe authorizationcode via: ")
        print(ENDPOINT_PERMISSION)
        print("")

    return ""
    

if __name__ == "__main__":
   getstravadata(str(sys.argv[1]))