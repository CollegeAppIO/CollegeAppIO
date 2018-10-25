var axios = require('axios');
const base_url = 'http://127.0.0.1:5000/';

function test(){
  const url = `${base_url}/`;
  axios.get(url).then(function(response){
      console.log("here");
      console.log(response.data)
  });
}

test();
