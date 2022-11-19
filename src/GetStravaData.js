
import React, { useState, useEffect} from 'react';
import { Link, Routes, Route, useSearchParams } from "react-router-dom";

const callback_domain = "http://localhost:3001"
const client_id = "93718"
const client_secret = "565e029eaaff81270bbf2e3b01079682355a2041"

const GetStravaData = () => {

    var details = {
        "activity_data": null,
        "total_ride_count": 0,
        "total_distance":0,
        "biggest_distance": 0
    }

    const [searchParams, setSearchParams] = useSearchParams();
    const [authTokenState, setAuthTokenState] = useState();
    const [stravaData, setStravaData] = useState(undefined);
    const [stravaAthleteDetails, setStravaAthleteDetails] = useState(details);

    const [disabledButton, setDisabledButton] = useState(true)


    const requestData = (access_token) => {
        const url_athlete_activities = "https://www.strava.com/api/v3/athlete/activities"
    
        const options = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
        }
        fetch(url_athlete_activities, options)
            .then(response => response.json())
            .then((response) => {
                const jsonified_response = JSON.stringify(response, undefined, 4)
                
                // Update the details object
                details.activity_data = jsonified_response
                setStravaAthleteDetails(details)

                // Get athlete details
                const athlete_id = getAthleteId(JSON.parse(jsonified_response))
                requestAthleteStats(access_token, athlete_id)
            })
            .then(() => setDisabledButton(false) )
            .catch(error => console.log('error', error));
    }

    const getAthleteId = (stravaData) => {
        const athlete_id = stravaData[0]['athlete']['id']
        console.log("athlete_id: " + athlete_id)

        return athlete_id
    }

    const requestAthleteStats = (access_token, athlete_id) => {
        const url_athlete_stats = "https://www.strava.com/api/v3/athletes/" + athlete_id + "/stats"

        const options = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
        }
        fetch(url_athlete_stats, options)
            .then(response => response.json())
            .then((response) => {
                const jsonified_response = JSON.stringify(response, undefined, 4)
                const json_object = JSON.parse(jsonified_response)
                console.log(jsonified_response)

                // Update the details object
                details.total_ride_count = json_object["all_ride_totals"]["count"]
                details.total_distance = json_object["all_ride_totals"]["distance"]
                details.biggest_distance = json_object["biggest_ride_distance"]

                setStravaAthleteDetails(details)
                console.log(stravaAthleteDetails.total_ride_count)
            })
            .catch(error => console.log('error', error));

    }
    
    const requestOauth = (auth_token, client_id, client_secret) => {
        const url_oauth_token = "https://www.strava.com/oauth/token?client_id="+ client_id +"&client_secret=" + client_secret + "&code=" + auth_token + "&grant_type=authorization_code"
        const options = {
            method: "POST"
        }
    
        fetch(url_oauth_token, options)
            .then(response => response.json())
            .then((response) => {
                const access_token = response['access_token']
                if(access_token !== undefined) {
                    console.log("toestemming ontvangen met access_token: " + access_token)
                    requestData(access_token)
                } else {
                    console.log("geen access_token teruggekregen.")
                }
            })
    }
    
    const requestPermission = () => {
        var endpoint_permission = "http://www.strava.com/oauth/authorize?client_id=" + client_id+ "&response_type=code&redirect_uri=" + callback_domain + "/exchange_token&approval_prompt=auto&scope=activity:read_all"
    
        window.location.replace(endpoint_permission)
    }

    useEffect(() => {
        if(authTokenState === undefined) {
            if(searchParams.get("code") === null) {
                console.log("geen auth_token, ook niet in de URL")
            }
            else {
                const auth_token = searchParams.get("code")
                setAuthTokenState(auth_token)
                console.log("toestemming gekregen met auth_token: " + auth_token)
                requestOauth(auth_token, client_id, client_secret)
            }
        } else {
            console.log("er is reeds toestemming met auth_token, maar is vast verlopen")
            setAuthTokenState(undefined)
        }
    }, [searchParams, stravaData, stravaAthleteDetails])

    const printData = () => {
        console.log(JSON.stringify(stravaAthleteDetails))
    }

    return (
      <div>
        {/* <div className="background"></div> */}
        <div className="wrapper-button">
            <button className="toestemming" onClick={() => requestPermission()}>geef toestemming</button>
            <Link to="show">
                <button href className="bekijken" onClick={() => printData()} disabled={disabledButton}>bekijk je data</button>
            </Link>
        </div>
      </div>
    )
  }

export default GetStravaData;  