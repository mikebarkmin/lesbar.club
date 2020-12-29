let apiURL = process.env.API_URL || "https://api.lesbar.club";

if (process.env.NODE_ENV === "development") {
  apiURL = "http://localhost:8000";
}

export default {
  apiURL,
};
