var React = require('react');

var Button = React.createClass({
    render: function() {
        return (
          <div className="btn">My Button</div>
        )
    }
});

require('../index')(`

  .btn
    display: inline-block
    background: blue
    padding: 5px

    &:hover
      background: red
`)

module.exports = Button;
