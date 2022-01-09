var city="";

var searchLocation = $("#search-location");
var searchBtn = $("#search-btn");
var clearBtn = $("#history");
var currentLocation = $("#current-city");
var currentTemperature = $("#temp");
var currentHumidty= $("#humidity");
var currentWS=$("#wind-speed");
var currentUV= $("#uv-index");
//var Citylist=[];

//class fetch {
   // get currentLocation(input) {
     const APIKey="1393df54fa0081545b6aea4e0b637cad";  

      //const response = fetch(
      //  'https://api.openweathermap.org/data/2.5/weather?q="+ APIKey+ City+ APIKey=1393df54fa0081545b6aea4e0b637cad' 
      //);

      //const data = response.json();

      //console.log(data);

      //return data;
    //}
//}

   // $.getJSON("https://api.openweathermap.org/data/2.5/uvi?appid="+ APIKey+ City+ APIKey);
     //{
       // $('#search-location').html(a.name + ", " + a.sys.City);
        //$('#weather').html('<img src=' + "https://api.openweathermap.org/img/w" + a.weather[0].icon + ".png" + '>' + a.weather[0].description)
        //$('#temp').html(f)
        //$('#humidity'). html("Humidity " + a.main.humidity + "%");
    //};

    //const APIKey="1393df54fa0081545b6aea4e0b637cad"

    fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&appid=' +
        APIKey
    )
    
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        const currentTemperature = data.main.temp
        const currentIcondata = data.weather[0].icon;
        const currentIconURL = "http://openweathermap.org/img/w/" + currentIcondata + ".png";
        const currentWS = data.wind.speed
        const currentHumidty = data.main.humidty
        const currentUV = data.UV.index
    
        console.log(displayWeather);
    
        $('#weatherlocation').text(city)
        $('#weatherIcon').attr('src', currentIconURL)
        $('#temp').text('temp: ${currentTemperature} ℉')
        $('#wind').text('wind: ${currentWS} MPH')
        $('#humidity').text('Humidity: ${currentHumidity}%')
    })



function displayWeather(event){
    event.preventDefault();
    if(searchLocation.val().trim()!==""){
        city=searchLocation.val().trim();
        currentWeather(city);
    }
}
    
function currentWeather() {
    $.get(url) .done(function(Response) {
        processWeatherData(Response);
    })
    .fail(function() {
        console.log("jQuery Request failed");
    });
} 

function processWeatherData(response) {
    if (!response) { //1
      console.log("Empty response");
      return;
    }

    var location=response.location;
    var values=response.location.values;
    console.log("Location: "+location.address);
  }

  
function UVIndex(ln,lt){
    
    var uvqURL="https://api.openweathermap.org/data/2.5/uvi?appid="+ APIKey+"&lat="+lt+"&lon="+ln;
    $.ajax({
            url:uvqURL,
            method:"GET"
            }).then(function(response){
                $(currentUV).html(response.value);
            });
}
    

function forecast(cityid){
    var dayover= false;
    var queryforcastURL="https://api.openweathermap.org/data/2.5/forecast?id="+cityid+"&appid="+APIKey;
    $.ajax({
        url:queryforcastURL,
        method:"GET"
    }).then(function(response){
        for (i=0;i<5;i++) {
            var tempK= response.list[((i+1)*8)-1].main.temp;
            var tempF=(((tempK-273.5)*1.80)+32).toFixed(2);
            var humidity= response.list[((i+1)*8)-1].main.humidity;

            $("#fTemp"+i).html(tempF+"&#8457");
            $("#fHumidity"+i).html(humidity+"%");
        }  
    });
}


function PastSearch(event){
    var liEl=event.target;
    if (event.target.matches("li")){
        city=liEl.textContent.trim();
        currentWeather(city);
    }

}


function loadlastCity(){
    $("ul").empty();
    var Citylist = JSON.parse(localStorage.getItem("cityname"));
    if(Citylist!==null){
        Citylist=JSON.parse(localStorage.getItem("cityname"));
        for(i=0; i<Citylist.length;i++){
            addToList(Citylist[i]);
        }
        city=Citylist[i-1];
        currentWeather(city);
    }

}

function clearHistory(event){
    event.preventDefault();
    Citylist=[];
    localStorage.removeItem("cityname");
    document.location.reload();

}

$("#search-btn").on("click",displayWeather);
$(document).on("click",PastSearch);
$(window).on("load",loadlastCity);
$("#clear-history").on("click",clearHistory);