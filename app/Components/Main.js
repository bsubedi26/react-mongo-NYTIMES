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
	getInitialState: function() {
		return {
			search: "",
			start: "",
			end: "",
			fiveArticles: []
		}
	},	

	// This function allows childrens to update the parent.
	setSearch: function(search) {
		this.setState({
			search: search
		})
	},
	setStart: function(start) {
		this.setState({
			start: start
		})
	},
	setEnd: function(end) {
		this.setState({
			end: end
		})
	},
	updateArticles: function() {

	},

	componentWillMount: function() {
	
	},
	
	// If the component changes (i.e. if a search is entered)... 
	componentDidUpdate: function(prevProps, prevState) {
		// //execute the function that searches nytimes
		// helpers.runQuery(this.state.search, this.state.start, this.state.end)
		// 	.then(function(data) {
		// 		//data is the results from the nytimes api search
				
		// 		// Send a POST request to save the data from the nytimes api search
		// 		$.ajax({
		// 			method: 'post',
		// 			url: '/saveArticles',
		// 			data: {"articles": data},
		// 		}).done(function(data) {
		// 			console.log(data)
		// 			console.log(data)
		// 			var updatedArticles = this.state.fiveArticles.concat(data);
		// 			this.setState({fiveArticles: updatedArticles});

		// 			console.log(this.state)
		// 			// data.forEach(function(value,index) {

		// 			// })

		// 		}.bind(this))

		// 	}.bind(this))
	},

	// The moment the page renders get the History
	componentDidMount: function() {

		// helpers.getArticles()
		// 		.then(function(response) {
		// 			// console.log(response.data)
		// 			// this.state.fiveArticles.push(response.data)
		// 			// this.setState({fiveArticles: response.data})
		// 			var newArray = this.state.fiveArticles.slice();
		// 			 newArray.push(response.data);
		// 			 this.setState(newArray);
		// 			console.log(this.state[0])

		// 		}.bind(this))

		console.log('this is the component did mount function (if console logs then it ran)')
	},

	// Here we render the function
	render: function() {

		return (

			<div className="container">
				<div className="row">

					<div className="col-md-12">
					
						<Search searchFunction={this.searchFunction} setSearch={this.setSearch} 
						setStart={this.setStart} setEnd={this.setEnd} articles={this.state.fiveArticles}/>

					</div>


				</div>


			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = Main;