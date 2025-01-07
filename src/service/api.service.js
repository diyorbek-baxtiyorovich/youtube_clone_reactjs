
import axios from 'axios';

const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
  params: {
    maxResults: '50'
  },
  headers: {
    'x-rapidapi-key': '5454025427msh4cecd2e4a5512efp19c81fjsnc72eef3c33e8',
    'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
  }
};


export const ApiServices = {
    async fetching(url) {
        const response = await axios.get(`${BASE_URL}/${url}`, options); 
        
        return response.data   
    }
}