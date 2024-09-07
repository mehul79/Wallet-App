axios.get(url, [config])
  .then(response => {
    // Handle successful response
    console.log(response.data);
  })
  .catch(error => {
    // Handle error
    console.error('Error:', error);
  });const axios = require("axios");
