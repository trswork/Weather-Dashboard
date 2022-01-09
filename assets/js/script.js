var city="";

var searchLocation = $("#search-location");
var searchBtn = $("#search-btn");
var clearBtn = $("#history");
var currentLocation = $("#current-city");
var currentTemperature = $("#temp");
var currentHumidty= $("#humidity");
var currentWS=$("#wind-speed");
var currentUV= $("#uv-index");
var Citylist=[];

function find(l){
    for (var i=0; i<Citylist.length; i++){
        if(l.toUpperCase()===Citylist[i]){
            return -1;
        }
    }
    return 1;
}
//Set up the API key
var APIKey="3619f23d64b5d2f7a415776391ee7afc";

function displayWeather(event){
    event.preventDefault();
    if(searchLocation.val().trim()!==""){
        city=searchLocation.val().trim();
        currentWeather(city);
    }
}
    
  var queryURL="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey
    
    function currentWeather(city) {
        $.get(uri) .done(function(rawResponse) {
            processWeatherData(rawResponse);
        })
        .fail(function() {
            console.log("jQuery Request failed");
        });
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