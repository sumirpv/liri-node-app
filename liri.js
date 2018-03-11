require("dotenv").config();
var keys= require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");
var fs = require("fs");


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var parameter=process.argv[2];

// working tweeter
if (parameter == "my-tweets"){
  console.log("Calling my tweet function");
  myTweet();
 }else if (parameter === "spotify-this-song" ){
  console.log("Calling my spotify function");
  mySpotify();
 }else if (parameter === "movie-this" ){
 console.log("Calling my movie function");
 myMovie();
}else if (parameter === "do-what-it-says" ){
  //var movieName =process.argv[3];
 console.log("Calling my random function");
 myRandom();
}else{
  console.log(" enter some value");
}

function myTweet(){
var param={
  q : 'sumirpv1',
  count : 20
}
client.get('search/tweets', param, function(error, tweets, response) {
  for ( var i =0; i < (tweets.statuses).length; i++ ){
    console.log("\nSumirpv1 says : "+ tweets.statuses[i].text);

  }
});
}


//client.get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=sumirpv1&count=5");

function mySpotify(){
  var songName ="";
  nodeArrg =process.argv;
  if (nodeArrg.length === 3) {
    songName = "party in the usa";
} 
 else{
  for (var i = 3; i < nodeArrg.length; i++) {
    if (i > 3 && i < nodeArrg.length) {
      songName = songName + "+" + nodeArrg[i];
    }
    else {
      songName += nodeArrg[i];
    }
  }
}

spotify.search({ type: 'track', query: songName }, function(err, data) {
  if ( err ) {
      console.log('Error occurred: ' + err);
      return;  //from spotify npm docs
  }
  else{
  var song_data = data.tracks.items[0];
  console.log("\nArtist(s)  :  "+song_data.artists[0].name);
  console.log("\nSong name is  : "+song_data.name);
  console.log("\nPreview : "+song_data.preview_url);
  console.log("\nAlbum is : "+song_data.album.name+"\n");
  };
});
}

function myMovie(){
  var movieName ="";
  nodeArrg =process.argv;
  if (nodeArrg.length === 3) {
    movieName = "Mr. Nobody";
} else{
  for (var i = 3; i < nodeArrg.length; i++) {

    if (i > 3 && i < nodeArrg.length) {
      movieName = movieName + "+" + nodeArrg[i];
    }
    else {
      movieName += nodeArrg[i];
    }
  }
}
  request("http://www.omdbapi.com/?t="+movieName+"&y=&plot=short&apikey=trilogy", function(error, response, body) {

  if (!error && response.statusCode === 200) {
   // console.log(JSON.parse(body));
    console.log("\nThe title of the movie : " + JSON.parse(body).Title);
    console.log("\nYear movie came out : " + JSON.parse(body).Year);
    console.log("\nIMDB rating of the movie : " + JSON.parse(body).imdbRating);
    console.log("\nRotten tomatoes rating : " + JSON.parse(body).Ratings[1].Value);
    console.log("\nCountry where produced : " + JSON.parse(body).Country);
    console.log("\nLanguage of the movie : " + JSON.parse(body).Language);
    console.log("\nActors in the movie : " + JSON.parse(body).Actors);
    console.log("\nPlot of the Movie : " + JSON.parse(body).Plot+"\n");
  }
});
}
function myRandom(){
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    console.log("Geting in the random");
    var output = data.split(",");
    parameter=output[0];
    process.argv[3]=output[1];

    // console.log(process.argv[2]);
    // console.log(process.argv[3]);

    if (parameter == "my-tweets"){
      console.log("Calling my tweet function");
      myTweet();
     }else if (parameter === "spotify-this-song" ){
       var songName =process.argv[3];
      console.log("Calling my spotify function");
      mySpotify(songName);
     }else if (parameter === "movie-this" ){
      var movieName =process.argv[3];
     console.log("Calling my movie function");
     myMovie(movieName);
     }else{
       console.log(" enter some value");
     }
    // for (var i = 0; i < output.length; i++) {
    //   console.log(output[i]);
    // }
  });
}









