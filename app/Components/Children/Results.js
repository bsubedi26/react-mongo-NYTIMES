var React = require('react')


var Results = React.createClass({
	getInitialState: function() {
		return {
			"saveTitle": ""
		}
	},
	componentDidMount: function() {

		$('body').on("click", "#save", function(e) {


		var title = $(this).prev().text()
		console.log(title)
		// this.setState({"saveTitle": title})
		})

	},

	render: function() {
		return (
			<div>

				<div className="panel panel-default">
					<div className="panel-heading">
					<h1 className="panel-title text-center"><strong>Results Section: </strong></h1>
					</div>
					<div className="panel-body text-center">
						{this.props.results.map(function(result,i) {

						return <div key={i}><a href={result.url}> {result.title} </a>
								<button type="button" className="btn btn-primary" id="save">Save</button>
								<hr />
								<hr />
								</div>
						})}
					</div>
				</div>

			</div>
			)
	},
})


module.exports = Results;