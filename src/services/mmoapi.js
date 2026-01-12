import axios from "axios";

const baseURL = "https://mmo-games.p.rapidapi.com";
const API_KEY = import.meta.env.VITE_API_KEY;

const getAll = async () => {
    try{
        const res = await axios.get(`${baseURL}/games`, {
            headers: {
                "x-rapidapi-key": API_KEY,
                "x-rapidapi-host": "mmo-games.p.rapidapi.com"
            }
        });
        return res.data;
    }catch(err){
        console.error(err);
    }
};

export default {
    getAll
}