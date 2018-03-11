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
 myDoWhatItSays();
}else{
  console.log("You have to pick some choices");
}

function myTweet(){
var param={
  q : 'sumirpv1',
  count : 20
}
client.get('search/tweets', param, function(error, tweets, response) {
  for ( var i =0; i < (tweets.statuses).length; i++ ){
    value= tweets.statuses[i].text;
    fs.appendFile("log.txt", "\nSumirpv1 says : " + value, function(err) {
        if (err) {
          return console.log(err);
        }
      });

  }
  console.log("Added the tweets to the log.txt file")

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
      return;  
  }
  else{
  var song_data = data.tracks.items[0];
  value= ("\nArtist(s)  :  "+song_data.artists[0].name)+("\nSong name is  : "+song_data.name)+("\nPreview : "+song_data.preview_url)+("\nAlbum is : "+song_data.album.name+"\n");
  fs.appendFile("log.txt", "\n" + value, function(err) {
      if (err) {
        return console.log(err);
      }
  
    });
  };
  console.log("Spotify is added to the log.txt file")
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
   data=JSON.parse(body);
   value=("\nThe title of the movie : " + data.Title)
   +("\nYear movie came out : " + data.Year)
   +("\nIMDB rating of the movie : " + data.imdbRating)
   +("\nRotten tomatoes rating : " + data.Ratings[1].Value)
   +("\nCountry where produced : " + data.Country)
   +("\nLanguage of the movie : " + data.Language)
   +("\nActors in the movie : " + data.Actors)
   +("\nPlot of the Movie : " + data.Plot+"\n");
   fs.appendFile("log.txt", "\n " + value, function(err) {
       if (err) {
         return console.log(err);
       }
     });
     console.log("Added all the movies data into the log.txt")
  }
});
}
function myDoWhatItSays(){
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    console.log("Geting in the random");
    var output = data.split(",");
    parameter=output[0];
  
    if (parameter == "my-tweets"){
      //console.log("Calling my tweet function");
      myTweet();
     }else if (parameter === "spotify-this-song" ){
     // console.log("Calling my spotify function");
      mySpotify();
     }else if (parameter === "movie-this" ){
     //console.log("Calling my movie function");
     myMovie();
     }else{
       console.log("You have to pick some choices");
     }
  });
}













// spotify
//   .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
//   .then(function(data) {
//     console.log(data); 
//   })
//   .catch(function(err) {
//     console.error('Error occurred: ' + err); 
//   });

// spotify.search({ type: 'track', query: 'Best Day Of My Life' }, function(err, data) {
//     if ( err ) {
//         console.log('Error occurred: ' + err);
//         return;
//     }
// console.log(" working"+ JSON.stringify(data,null,2)); 
// });

// var params = {screen_name: 'nodejs'};
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     console.log(tweets);
//   }
//   console.log(JSON.stringify(response, null, 2));
// });
// client.get('favorites/list', function(error, tweets, response) {
//   if(error) throw error;
//   console.log(tweets);  // The favorites. 
//   console.log(response);  // Raw response object. 
// });
// client.post('statuses/update', {status: 'I Love my Twitter accounts'},  function(error, tweet, response) {
//   if(error){ console.log("error");}
//   console.log(tweet);  // Tweet body. 
//   console.log(response);  // Raw response object. 
// });





