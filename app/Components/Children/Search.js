// Include React 
var React = require('react')
var helpers = require('../utils/helpers')
var Results = require('./Results')

// This is the form component. 
var Search = React.createClass({

	// Here we set a generic state associated with the text being searched for
	getInitialState: function(){
		return {
			term: "",
			start: "",
			end: "",
			"articles": [],
			"arr": [1,2,3,4]
		}
	},

	// This function will respond to the user input 
	handleChange: function(event){
    	// Here we create syntax to capture any change in text to the query terms (pre-search).
    	// See this Stack Overflow answer for more details: 
    	// http://stackoverflow.com/questions/21029999/react-js-identifying-different-inputs-with-one-onchange-handler
    	var newState = {};
    	newState[event.target.id] = event.target.value;
    	console.log(newState)
    	this.setState(newState);

	},

	// When a user searches 
	handleClick: function(e) {
		e.preventDefault()
		var arr = []
		//execute the function that searches nytimes
		helpers.runQuery(this.state.term, this.state.start, this.state.end)
			.then(function(data) {
				//results from the nytimes api search
				// console.log(data)
				this.state.articles.push(data)
				// this.setState({"new": data})
				console.log(this.state.articles[0])

				// Send a POST request to save the data from the nytimes api search
				$.ajax({
					method: 'post',
					url: '/saveArticles',
					data: {"articles": data},
				}).done(function(data) {
					
					data.forEach(function(value,index) {
						
					})

				})

			}.bind(this))
		// Set the parent to have the search term
		// this.props.setTerm(this.state.term);

		

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
		
			{this.state.articles}
			
			</div>

		)
	}
});

// Export the component back for use in other files
module.exports = Search;