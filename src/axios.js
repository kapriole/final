import axios from "axios";

//
var instance = axios.create({
    xsrfCookieName: "OHMYGLOB",
    xsrfHeaderName: "csrf-token"
});

export default instance;

