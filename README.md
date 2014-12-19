# Keep your CSS with your React component definitions

I've recently been creating a large client side JavaScript application with React and Flux. As of right now the app has 35 basic React components, about 10 of which have their own custom CSS. I was in the bad habit of simply appending CSS for new components to a global stylesheet as I built them, but I knew this approach wouldn't be maintainable in the longer term.

What I really wanted was to keep my CSS in the same file as my component definition so I wouldn't need to go fishing around in my global stylesheet every time I wanted to make a change. This would also mean that CSS would only be included if the component was require'd in the project somewhere. Removing a component from a project would remove its corresponding CSS automatically - no need to remember to remove it from the global stylesheet.

Enough background - here's what it looks like:

    var React = require('react');
    var Button = React.createClass({
        render: function() {
            return (
              <div class="btn">My Button</div>
            )
        }
    });

    require('react-styl')(`
      .btn {
        display: inline-block;
        background: blue;
        padding: 5px;
      }
      .btn:hover {
        background: red;
      }
    `)

    module.exports = Button;

You'll notice we use the convenience of ES6 multiline strings (`) so we can write css directly in our component JS files without any funky quoting. You'll need to run this through an ES6->ES5 converter (such as es6ify) for your resulting code to be cross-browser compatible.

Now, to render the CSS on the client, simply add a line to your bootstrap file. Something like:

    React.render(<MyApp/>, document.getElementById('react'));
    require('react-styl').addStylesheet();

That's it! But how does it work? Here's the (slimmed down) code for the react-styl module:

    var _styles = "";

    module.exports = function(styles) {
        _styles += styles;
    }

    module.exports.addStylesheet = function() {
        var styleTag = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(_styles));
        document.head.appendChild(style);
    }

Every call to require('react-styl')('css string') appends the given css to the _styles variable. Since each component is cached after being require'd somewhere in your project, component CSS is only appended to the _styles variable once, even though your component may be require'd many times throughout your project. Then it's simply a case of appending the resulting CSS to a style tag and you're done.

If you want to use a CSS preprocessor, like styl, simply edit your addStylesheet function to process the css before it gets added to the style tag. Something like this:

    var styl = require('styl');
    module.exports.addStylesheet = function() {
        var css = styl(_styles).toString(),
            style = document.createElement('style');

        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));

        document.head.appendChild(style);
    }

And that's the crux of it! Now you can keep your component CSS and JS in the same file, easing development and maintainability.

By wrapping your CSS code with annotations, you can strip them out when building for production, instead serving your CSS from a static file.

To try the example, clone this repo, change to the example directory, run npm install then npm build.
