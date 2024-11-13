const server = process.env.REACT_APP_SERVER;

let baseUrl;

switch (server) {
  case "development":
    baseUrl = "https://dev.api.globemee.de";
    break;
  case "staging":
    baseUrl = "https://stage.api.globemee.de";
    break;
  case "production":
    baseUrl = "https://api.globemee.de/";
    break;
  default:
    baseUrl = "http://localhost:3000";
    break;
}

export { baseUrl };
