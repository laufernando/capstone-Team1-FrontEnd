import axios from "axios";

class DataService {
    static async getData() {
        const apiURL = process.env.REACT_APP_API_URL;
        try {
            console.log('Se obtienen los tenis con axios')
            const response = await axios.get(`${apiURL}/api/sneaker`);
            console.log(response.data);
          return response.data;
        } catch (error) {
          console.error(error);
          return [];
        }
    }
}

export default DataService;