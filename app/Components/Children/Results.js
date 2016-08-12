var React = require('react')


var Results = React.createClass({
	render: function() {
		return (
			<div>
				<h1 className="text-center">Results Section</h1>
				<h1 className="text-center">{this.props.results}</h1>
				{console.log(this.props)}
				{console.log(this.props.results)}

			</div>
			)
	}
})


module.exports = Results;