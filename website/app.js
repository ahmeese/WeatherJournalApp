/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();




const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=7d4a7866e0521d00e12d82357bb92ada&units=metric';

//Using the event listener to trigger the performAction function when the use click on generate button
  document.getElementById('generate').addEventListener('click', performAction);

  function performAction(){ 
    //Storing the zip code and feeling value from the user 
    let zipCode =  document.getElementById('zip').value;
    let feeling =  document.getElementById('feelings').value;    
    console.log(zipCode) 
    console.log(feeling) 
    //Triggering the getWeatherInfo function
    getWeatherInfo(baseURL,zipCode, apiKey).then((data)=>{
        console.log("Data:")
        console.log(data.main.temp)
        console.log(newDate)
        console.log(feeling)
        //After getting the weather info trigger postData function 
        postData('/addData',{date:newDate,temp:Math.round(data.main.temp),content:feeling})
        //Then update the user interface 
        updateUI()
       })
  }

// Getting the weather info from the api ny combining the base url,zip code from the user and the api key
  const getWeatherInfo = async (baseURL, zipCode, apiKey)=>{
    const response = await fetch(baseURL+zipCode+apiKey)

    try {

      const data = await response.json();
      console.log(data)
      return data
    
    }  catch(error) {
        // appropriately handle the error
       console.log("error", error);

    }
    
  }


//Posting data to the server
  const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),        
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData
  }catch(error) {
  console.log("Error happened")    
  console.log("error", error);
  }
}

//Updating the user interface with the data from the server
const updateUI = async () => {
    const req = await fetch("/getData")
    const projectData = await req.json();
    document.getElementById('date').innerHTML = `Date: ${projectData.date}`;
    document.getElementById('temp').innerHTML = `Temp: ${projectData.temp} \u00B0`;
    document.getElementById('content').innerHTML = `Mood: ${projectData.content}`;
};
 