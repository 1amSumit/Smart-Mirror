import axios from "axios";
import qs from "qs";

export const getSongs = async () => {
  const client_Secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
  const client_Id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const code = import.meta.env.VITE_SPOTIFY_CODE;

  console.log(client_Secret);
  console.log(client_Id);

  let accessToken;

  try {
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      qs.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "http://localhost:5173",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(`${client_Id}:${client_Secret}`),
        },
      }
    );

    console.log("Token Response:", tokenResponse.data);

    accessToken = tokenResponse.data.access_token;
    console.log("Access Token:", accessToken);
  } catch (error) {
    console.error(
      "Error fetching access token:",
      error.response?.data || error.message
    );
    return;
  }

  try {
    const songsResponse = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks?limit=20",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Songs Response:", songsResponse.data);
    return songsResponse.data.items;
  } catch (error) {
    console.error(
      "Error fetching songs:",
      error.response?.data || error.message
    );
  }
};
