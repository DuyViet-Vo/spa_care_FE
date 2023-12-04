<!-- ExampleComponent.vue -->
<template>
    <div>
      <h1>Data from API:</h1>
      <ul>
        <li v-for="item in apiData" :key="item.id">{{ item.ten_danh_muc }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import API_ENDPOINTS from '@/config' 
  
  export default {
    data() {
      return {
        apiData: [],
      };
    },
    mounted() {
      // Replace the URL and headers with your actual API endpoint and headers
      const apiUrl = API_ENDPOINTS.apiUrl + '/danh-muc';
      const headers = {
        'accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAxNjg0ODUzLCJpYXQiOjE3MDE2ODEyNTMsImp0aSI6ImU4NzdkZmQxZTc1MTQwYmE5YTE1MjJhMjI3MTI3Yzk5IiwidXNlcl9pZCI6MX0.yvLwJ6MZGDoOlcjBStacwrN5G8cbSKD_y2kFWeGuwCM',
      };
  
      axios.get(apiUrl, { headers })
        .then(response => {
          this.apiData = response.data.results;
          console.log("data: ",response.data.results)
        })
    
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
  };
  </script>
  