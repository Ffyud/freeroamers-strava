import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

const callback_domain = "http://localhost:3001";
const client_id = "";
const client_secret = "";

const GetStravaData = (props) => {
    // FIXME make this a proper JS object
    var details = {
        user: {
            username: "",
            firstname: "",
            lastname: "",
        },
        activity_data: null,
        total_ride_count: 0,
        total_distance: 0,
        biggest_distance: 0,
    };

    const [searchParams, setSearchParams] = useSearchParams();
    const [authTokenState, setAuthTokenState] = useState();
    const [stravaData, setStravaData] = useState(undefined);
    const [stravaAthleteDetails, setStravaAthleteDetails] = useState(details);
    const [disabledButton, setDisabledButton] = useState(true);

    /**
     * Obtain the user activity data with an access token.
     * @function
     * @param {string} accessToken - The access token received after requesting it with the authorization token.
     */
    const requestData = (accessToken) => {
        const url = "https://www.strava.com/api/v3/athlete/activities";

        // FIXME get all activities instead of latest 30

        const options = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + accessToken,
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
        };
        fetch(url, options)
            .then((response) => response.json())
            .then((response) => {
                const js_object_response = JSON.parse(JSON.stringify(response));

                var activityArray = [];
                // FIXME  https://www.sitepoint.com/loop-through-json-response-javascript/
                Object.keys(js_object_response).map((index) => {
                    // FIXME make this a proper JS object
                    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new
                    var activity = {
                        id: "",
                        name: "",
                        average_speed: 0,
                        max_speed: 0,
                        average_watts: 0,
                        distance: 0,
                        total_elevation_gain: 0,
                        moving_time: 0,
                        summary_polyline: null,
                    };

                    // Update the activity object
                    activity.name = js_object_response[index]["name"];
                    activity.average_speed = js_object_response[index]["average_speed"];
                    activity.average_watts = js_object_response[index]["average_watts"];
                    activity.distance = js_object_response[index]["distance"];
                    activity.id = js_object_response[index]["id"];
                    activity.max_speed = js_object_response[index]["max_speed"];
                    activity.moving_time = js_object_response[index]["moving_time"];
                    activity.summary_polyline = js_object_response[index]["map"]["summary_polyline"];
                    activity.total_elevation_gain = js_object_response[index]["total_elevation_gain"];

                    activityArray.push(activity);
                    return "push";
                });

                details.activity_data = activityArray;
                setStravaAthleteDetails(details);

                const athlete_id = getAthleteId(js_object_response);
                requestAthleteStats(accessToken, athlete_id);
            })
            .then(() => setDisabledButton(false)) // Enable button when data is received
            .catch((error) => console.log("error", error));
    };

    /**
     * Return the athlete ID that is inside the v3/athlete/activities response body.
     * @function
     * @param {Object} stravaData - The response from v3/athlete/activities.
     */
    const getAthleteId = (stravaData) => {
        // const athlete_id = stravaData[0]['athlete']['id']
        const athlete_id = "63320990"
        console.log("Found an athlete ID: " + athlete_id)

        // return athlete_id
        return athlete_id;
    };

    /**
     * Obtain the user stats by from v3/athletes/{athleteId}/stats
     * @function
     * @param {string} accessToken - The response from v3/athlete/activities.
     * @param {string} athleteId
     */
    const requestAthleteStats = (accessToken, athleteId) => {
        const url = "https://www.strava.com/api/v3/athletes/" + athleteId + "/stats";

        const options = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + accessToken,
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
        };
        fetch(url, options)
            .then((response) => response.json())
            .then((response) => {
                const js_object_response = JSON.parse(JSON.stringify(response));

                // Update the details object
                details.total_ride_count = js_object_response["all_ride_totals"]["count"];
                details.total_distance = js_object_response["all_ride_totals"]["distance"];
                details.biggest_distance = js_object_response["biggest_ride_distance"];

                setStravaAthleteDetails(details);
            })
            .catch((error) => console.log("error", error));
    };

    /**
     * Obtain an access token in order to get Strava user data
     * @function
     * @param {string} authToken - The authorization token received after user permission.
     * @param {string} clientId - The client ID that belongs to this application
     * @param {string} clientSecret - The client secret that belongs tho this application.
     */
    const requestOauth = (authToken, clientId, clientSecret) => {
        const urlOauthToken =
            "https://www.strava.com/oauth/token?client_id=" +
            clientId +
            "&client_secret=" +
            clientSecret +
            "&code=" +
            authToken +
            "&grant_type=authorization_code";
        
        const options = {
            method: "POST",
        };

        fetch(urlOauthToken, options)
            .then((response) => response.json())
            .then((response) => {
                const accessToken = response["access_token"];
                if (accessToken !== undefined) {
                    console.log("Received an access token: " + accessToken);
                    requestData(accessToken);
                } else {
                    console.warn("No access token received.");
                }
            });
    };

    /**
     * Request user permission on Strava.
     * @function
     */
    const requestPermission = () => {
        var endpoint_permission =
            "http://www.strava.com/oauth/authorize?client_id=" +
            client_id +
            "&response_type=code&redirect_uri=" +
            callback_domain +
            "/exchange_token&approval_prompt=auto&scope=activity:read_all";

        window.location.replace(endpoint_permission);
    };

    useEffect(() => {
        if (authTokenState === undefined) {
            if (searchParams.get("code") !== null) {
                const auth_token = searchParams.get("code");
                setAuthTokenState(auth_token);
                console.log("Received an authorization token: " + auth_token);
                requestOauth(auth_token, client_id, client_secret);
            }
        } else {
            console.warn("Authorization token is known, but probably expired. Let's not use it.");
            setAuthTokenState(undefined);
        }
    }, [searchParams, stravaData, stravaAthleteDetails]);

    const printData = () => {
        props.setStravaData(JSON.parse(JSON.stringify(stravaAthleteDetails)));
    };

    return (
        <div>
            {/* <div className="background"></div> */}
            <div className="wrapper-button">
                <button className="toestemming" onClick={() => requestPermission()}>
                    geef toestemming
                </button>
                <Link to="../show">
                    <button href className="bekijken" onClick={() => printData()} disabled={disabledButton}>
                        bekijk je data
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default GetStravaData;
