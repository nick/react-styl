var _styles = "",
    styl = require('styl'),
    strip = require('strip-indent');

module.exports = function(styles) {
    _styles += strip(styles);
}

module.exports.addStylesheet = function() {

    var css = styl(_styles, { whitespace: true }).toString(),
        style = document.createElement('style');

    style.type = 'text/css';

    if (style.styleSheet){
        style.styleSheet.cssText = css;
    }
    else {
        style.appendChild(document.createTextNode(css));
    }

    document.head.appendChild(style);
};

module.exports.getCss = function() {
    return styl(_styles, { whitespace: true }).toString();
};
