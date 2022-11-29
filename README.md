# freeroamers-strava

Static webpage to visualize your Strava data in a cool way. 
Currently in progress.

## Getting Strava's data
The very first step is registering your application in your [account settings](https://www.strava.com/settings/api).

Then, using your *client id* and *client secret*:
1. Ask for the user's consent, which returns an *authorization token* (OAuth 2.0).
2. Request an *access token* with the obtained authorization token.
3. Get the actual data from Strava through the [Strava API](https://developers.strava.com/docs/reference/).