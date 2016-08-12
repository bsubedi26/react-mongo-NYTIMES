// Include React 
var React = require('react');

// Here we include all of the sub-components
var Saved = require('./Children/Saved');
var Search = require('./Children/Search');
var Results = require('./Children/Results');

// Helper Function
var helpers = require('./utils/helpers.js');

// This is the main component. 
var Main = React.createClass({

	// Here we set a generic state associated with the number of clicks
	getInitialState: function(){
		return {
			search: "",
			fiveArticles: [],
			results: "",
			history: [] /*Note how we added in this history state variable*/
		}
	},	

	// This function allows childrens to update the parent.
	setArticles: function(term){
		this.setState({
			search: term
		})
	},

	getArticles: function() {
		helpers.getArticles()
				.then(function(response) {
					console.log(response.data)
					this.state.fiveArticles.push(response.data)
					console.log(this.state.fiveArticles[0])

					// this.state.articles.push(response.data)
					// this.state.articles.push(data)
				}.bind(this))
	},

	// If the component changes (i.e. if a search is entered)... 
	componentDidUpdate: function(prevProps, prevState){

	},

	// The moment the page renders get the History
	componentDidMount: function() {

		this.getArticles()

		console.log('this is the component did mount function (if console logs then it ran)')
	},

	// Here we render the function
	render: function() {

		return (

			<div className="container">
				<div className="row">

					<div className="col-md-12">
					
						<Search setArticles={this.setArticles}/>

					</div>

					<div className="col-md-12">
					
						<Results results={this.state.fiveArticles}/>

					</div>

					

				</div>

				

			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = Main;