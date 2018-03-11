# liri-node-app
Overview
 LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.
 Used Node packages
    Twitter
    Spotify
    Request
    Grab data from the OMDB API.
    DotEnv
Liri can take in one of the following commands:
* `my-tweets`

* `spotify-this-song`

* `movie-this`

* `do-what-it-says`

1.  node liri.js my-tweets
This will show your last 20 tweets and when they were created at in your terminal/bash window.
 *  node liriBonus.js my-tweets
This will show your last 20 tweets and output the data to a .txt file called log.txt.
2. node liri.js spotify-this-song '<song name here>'
This will show the following information about the song in your terminal/bash window
Artist(s)
The song's name
A preview link of the song from Spotify
The album that the song is from
If no song is provided then your program will default to "The Sign" by Ace of Base.
* node liriBonus.js spotify-this-song '<song name here>'
this will show all the data to a .txt file called log.txt.
3. node liri.js movie-this '<movie name here>'
This will output the following information to your terminal/bash window:
  . Title of the movie.
   . Year the movie came out.
   . IMDB Rating of the movie.
   . Rotten Tomatoes Rating of the movie.
   . Country where the movie was produced.
   . Language of the movie.
   . Plot of the movie.
   . Actors in the movie.
   If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
* node liriBonus.js movie-this '<movie name here>'
this will show all the movie info to a .txt file called log.txt.
4. node liri.js do-what-it-says
It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
Feel free to change the text in that document to test out the feature for other commands.
*  node liriBonus.js do-what-it-says
It will store all the info into a log.txt file

