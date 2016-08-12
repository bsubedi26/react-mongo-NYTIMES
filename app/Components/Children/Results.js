var React = require('react')


var Results = React.createClass({
	componentDidMount: function() {

		

	},
	show: function() {
			console.log(this.props.results)

	},

	render: function() {
		return (
			<div>

				<div className="panel panel-default">
					<div className="panel-heading">
					<h3 className="panel-title text-center">Results Section: </h3>
					</div>
					<div className="panel-body text-center">
						{this.props.results.map(function(result,i) {

											return <p key={i}><a href={result.url}> {result.title} </a> 
											<a href="/save" className="btn btn-primary">Save</a></p>

						})}
					</div>
				</div>
				
				<button onClick={this.show}>BUTTON</button>
				

			</div>
			)
	},
})


module.exports = Results;