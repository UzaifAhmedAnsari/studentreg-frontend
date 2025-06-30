    import axios from 'axios';

    // Create an Axios instance
    const api = axios.create({
      baseURL: 'https://studentreg-backend.ahmeduzaif200.repl.co/api', // <-- Yeh URL bilkul sahi honi chahiye
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add a request interceptor to include the token in headers
    api.interceptors.request.use(
      (config) => {
        // *** Zaroori: 'user' key use ho rahi hai ***
        const userStored = localStorage.getItem('user'); 
        if (userStored) {
          const userInfo = JSON.parse(userStored);
          if (userInfo.token) {
            config.headers.Authorization = `Bearer ${userInfo.token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    export default api;
    