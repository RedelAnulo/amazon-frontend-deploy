import axios from "axios";
const axiosInstance = axios.create({
	// Local instance of firebase functions
	// baseURL: "http://127.0.0.1:5001/clone-1802a/us-central1/api",
	// Deployed version of amazon server on render.com
	baseURL: "https://amazon-api-deploy-cg2h.onrender.com/",

	// Deployed version of firebase functions
});

export { axiosInstance };
