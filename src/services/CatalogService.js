import axios from "axios";

class DataService {

  static async postGenderData(data) {
    const apiURL = process.env.REACT_APP_API_URL;
    console.log('Respuesta getDataById '+ data);
    return await axios.post(`${apiURL}/api/gender`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }  
    static async getGenderData() {
        const apiURL = process.env.REACT_APP_API_URL;
        try {
            const response = await axios.get(`${apiURL}/api/gender`);
            console.log(response.data);
          return response.data;
        } catch (error) {
          console.error(error);
          return [];
        }
    }
    static async getDataById(id) {
      const apiURL = process.env.REACT_APP_API_URL;
      try {
          const response = await axios.get(`${apiURL}/api/gender/${id}`);
          console.log('Respuesta getDataById ',response.data);
        return response.data;
      } catch (error) {
        console.error(error);
        return [];
      }
    }
    static async deleteData(id) {
      const apiURL = process.env.REACT_APP_API_URL;
      try {
          const response = await axios.delete(`${apiURL}/api/gender/${id}`);

        return response.data;
      } catch (error) {
        console.error(error);
        return [];
      }
    }
    
}

export default DataService;