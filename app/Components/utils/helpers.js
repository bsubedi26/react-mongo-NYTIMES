// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

// NY TIMES API
// var nytAPI = 'c93c620e2666430ab20bf934eca8d8d6';
var nytAPI = '75b34d15b9a448418433f388c8c85020';



// Helper Functions
var helpers = {

	runQuery: function(term, start, end) {

		// build the query url for the new york times api
		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + nytAPI + "&q=";
			queryURL += term;
			queryURL += "&begin_date=" + start + "0101";
			queryURL += "&end_date=" + end + "0101";
		
		 return axios.get(queryURL)
			.then(function(nytimes_data) {

				// store the articles returned in a variable
				var articles = nytimes_data.data.response.docs;

				// map through the array and build an object for each article
				var articles_obj_array = articles.map(function(article, index) {
					var articlesObj = {
						title: article.headline.main,
						pub_date: article.pub_date,
						url: article.web_url
					};
					return articlesObj;
				});

				// return the object, which can be accessed using .then
				return articles_obj_array;
					
		})
	},

	getArticles: function() {
			
			// using axios to access the get route defined in server.js and will return all the articles in our db
			return axios.get('/api')
				.then(function(response) {

					// return response so we can access it in the Main component
					return response;

			}); 

	}, 

	// This function hits our own server to retrieve the record of query results
	getHistory: function(){

		return axios.get('/api/')
			.then(function(response){

				// console.log(response);

				return response;
			});
	},

	// This function posts new searches to our database.
	postHistory: function(location){

		return axios.post('/api/', {location: location})
			.then(function(results){

				console.log("Posted to MongoDB");
				return(results);
			})
	}

}


// We export the helpers function 
module.exports = helpers;