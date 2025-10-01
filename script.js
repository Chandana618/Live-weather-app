async function fetchData() {
    let cityname=document.querySelector('input').value;
   
    let requesteddata=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=985e081ea76bc49f27f6250a1fe88e1e&units=metric`)
    let formatteddata=await requesteddata.json()
    console.log(formatteddata)
    $('#cityname')[0].innerText=formatteddata.name
    $('#citytemp')[0].innerText=formatteddata.main.temp+" °C"
    $('#skydesc')[0].innerText=formatteddata.weather[0].description
    
    //updating date and time
    let properdate=dateFormat(formatteddata.dt)
    $('#date')[0].innerText=properdate.split(',')[0];
    $('#time')[0].innerText=properdate.split(',')[1];

    //updating sunrise and sunset
    let sunrisetime=dateFormat(formatteddata.sys.sunrise)
    let sunsettime=dateFormat(formatteddata.sys.sunset)
    console.log("x",sunrisetime.split(',')[1])
    $('#sunrisetime')[0].innerText=sunrisetime.split(',')[1];
    $('#sunsettime')[0].innerText=sunsettime.split(',')[1];

    //fetching aqi data
    let lan=formatteddata.coord.lon
    let lat=formatteddata.coord.lat
    fetchAQIData(lan,lat);
 

    fivedays();
}
function dateFormat(timestamp){
    const date=new Date(timestamp*1000);
    console.log(date.toUTCString());
    console.log(date.toLocaleString());
    return date.toLocaleString();
}
async function fetchAQIData(lan,lat){
     let fetchaqidata= await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lan}&appid=985e081ea76bc49f27f6250a1fe88e1e`)
    let formattedaqidata= await fetchaqidata.json()
    
    let list=formattedaqidata.list[0].components;
    console.log(list)
    $('#covalue')[0].innerText=list.co
    $('#no2value')[0].innerText=list.no2
    $('#co2value')[0].innerText=list.so2
    $('#novalue')[0].innerText=list.no

    
    
    }
    async function fivedays(){
        let data=await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=17.69&lon=83.2093&appid=985e081ea76bc49f27f6250a1fe88e1e&units=metric`)
        let formatteddata=await data.json()
        console.log("five",formatteddata)  
         $('#pressure')[0].innerText=formatteddata.list[0].main.pressure+" hPa"
         $('#humidity')[0].innerText=formatteddata.list[0].main.humidity+" %"
         $('#feelslike')[0].innerText=formatteddata.list[0].main.feels_like
         $('#visibility')[0].innerText=formatteddata.list[0].visibility+" m"

         $('#sixam')[0].innerText=formatteddata.list[0].dt_txt.split(" ")[1].split(":")[0]+" AM"
         $('#sixamtime')[0].innerText=formatteddata.list[0].main.temp+" °C"
         $('#nineam')[0].innerText=formatteddata.list[1].dt_txt.split(" ")[1].split(":")[0]+" AM"
         $('#nineamtime')[0].innerText=formatteddata.list[1].main.temp+" °C"
         $('#noon')[0].innerText=formatteddata.list[2].dt_txt.split(" ")[1].split(":")[0]+" PM"
         $('#noontime')[0].innerText=formatteddata.list[2].main.temp+" °C"
         $('#threepm')[0].innerText=formatteddata.list[3].dt_txt.split(" ")[1].split(":")[0]+" PM"
         $('#threepmtime')[0].innerText=formatteddata.list[3].main.temp+" °C"
         $('#sixpm')[0].innerText=formatteddata.list[4].dt_txt.split(" ")[1].split(":")[0]+" PM"
         $('#sixpmtime')[0].innerText=formatteddata.list[4].main.temp+" °C"
         $('#ninepm')[0].innerText=formatteddata.list[5].dt_txt.split(" ")[1].split(":")[0]+" PM"
         $('#ninepmtime')[0].innerText=formatteddata.list[5].main.temp+" °C"
    
        $('#tempone')[0].innerText=formatteddata.list[0].main.temp+" °C"
        $('#dayone')[0].innerText=convertday(formatteddata.list[0].dt).split(',')[0]
        // console.log(dateFormat(formatteddata.list[0].dt).split(',')[0])
        $('#dateone')[0].innerText=formatteddata.list[0].dt_txt.split(" ")[0]
        $('#temptwo')[0].innerText=formatteddata.list[4].main.temp+" °C"
        $('#daytwo')[0].innerText=convertday(formatteddata.list[4].dt).split(',')[0]
        $('#datetwo')[0].innerText=formatteddata.list[4].dt_txt.split(" ")[0]
        $('#tempthree')[0].innerText=formatteddata.list[15].main.temp+" °C"
        $('#daythree')[0].innerText=convertday(formatteddata.list[15].dt).split(',')[0]
        $('#datethree')[0].innerText=formatteddata.list[15].dt_txt.split(" ")[0]
        $('#tempfour')[0].innerText=formatteddata.list[23].main.temp+" °C"
        $('#dayfour')[0].innerText=convertday(formatteddata.list[23].dt).split(',')[0]
        $('#datefour')[0].innerText=formatteddata.list[23].dt_txt.split(" ")[0]
        $('#tempfive')[0].innerText=formatteddata.list[30].main.temp+" °C"
        $('#dayfive')[0].innerText=convertday(formatteddata.list[30].dt).split(',')[0]
        $('#datefive')[0].innerText=formatteddata.list[30].dt_txt.split(" ")[0]
        }

        function convertday(timestamp){
             const date=new Date(timestamp*1000);
    return date.toUTCString();
        }