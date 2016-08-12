// Include React 
var React = require('react')
var helpers = require('../utils/helpers')
var Results = require('./Results')
// This is the form component. 
var Search = React.createClass({

	// Here we set a generic state associated with the text being searched for
	getInitialState: function() {
		return {
			term: "",
			start: "",
			end: "",
			"articles": [],
		}
	},

	// This function will respond to the user input 
	handleChange: function(event) {
    	// Here we create syntax to capture any change in text to the query terms (pre-search).
    	// See this Stack Overflow answer for more details: 
    	// http://stackoverflow.com/questions/21029999/react-js-identifying-different-inputs-with-one-onchange-handler
    	var newState = {};
    	newState[event.target.id] = event.target.value;
    	console.log(newState)
    	this.setState(newState);

	},

	// When a user clicks the search button, execute this function
	handleClick: function(e) {
		// prevent default
		e.preventDefault()

		// pass the search parameters to the Main.js (parent) file 
		// to search for the data from the nytimes api
		this.props.setSearch(this.state.term)
		this.props.setStart(this.state.start)
		this.props.setEnd(this.state.end)

		//execute the function that searches nytimes
		helpers.runQuery(this.state.term, this.state.start, this.state.end)
			.then(function(data) {
				//data is the results from the nytimes api search
				
				// Send a POST request to save the data from the nytimes api search
				$.ajax({
					method: 'post',
					url: '/saveArticles',
					data: {"articles": data},
				}).done(function(data) {
					console.log(data)
					var updatedArticles = this.state.articles.concat(data);
					this.setState({articles: updatedArticles});
					console.log(this.state)
					// data.forEach(function(value,index) {

					// })

				}.bind(this))

			}.bind(this))

	},

	// Here we render the function
	render: function() {

		return(
			<div className="all">
			<div className="panel panel-default">
				<div className="panel-heading">
				<h3 className="panel-title text-center">NY TIMES SEARCH: </h3>
				</div>
				<div className="panel-body text-center">
					<form>
							<div className="form-group">

								{/*Note how each of the form elements has an id that matches the state. This is not necessary but it is convenient.
									Also note how each has an onChange event associated with our handleChange event. 
								*/}
								<h4 className=""><strong>Topic</strong></h4>
								<input type="text" className="form-control text-center" id="term" onChange= {this.handleChange} required/>
								<br />
								<h4 className=""><strong>Start Year</strong></h4>

								<input type="text" className="form-control text-center" id="start" onChange= {this.handleChange} required/>
								<br />
								<h4 className=""><strong>End Year</strong></h4>

								<input type="text" className="form-control text-center" id="end" onChange= {this.handleChange} required/>
								<br />

								<button type="button" className="btn btn-primary" onClick={this.handleClick}>Search</button>
							</div>
						</form>
				</div>
			</div>
		
						<Results results={this.state.articles}/>
			
			</div>

		)
	}
});

// Export the component back for use in other files
module.exports = Search;