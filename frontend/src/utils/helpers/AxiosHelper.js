import axios from 'axios';

class AxiosHelper {
  constructor() {
    this.axiosInstance = axios.create({
      timeout: 60000, // Set a timeout for requests (optional)
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async getAsync(url, params = {}) {
    try {
      const response = await this.axiosInstance.get(url, { params });
      return response.data; // Return the response data
    } catch (error) {
      // Handle errors gracefully, e.g., log them or throw custom errors
      console.error('Axios GET request error:', error);
      throw error; // Rethrow the error to handle it further up the chain
    }
  }

  async postAsync(url, data = {}) {
    try {
      const response = await this.axiosInstance.post(url, data);
      return response.data;
    } catch (error) {
      console.error('Axios POST request error:', error);
      throw error;
    }
  }
  async authorizedGetAsync(url, params = {}) {
    try {
      const response = await this.axiosInstance.get(url, {
        params,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Add authorization header
        }
      });
      return response.data;
    } catch (error) {
      console.error('Authorized GET request error:', error);
      throw error;
    }
  }
}

export default new AxiosHelper();
