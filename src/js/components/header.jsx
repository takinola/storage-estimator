(function(){
  var React = require("react")
  , EstimatorActions = require("../actions/EstimatorActions.js")
  ;

  var Header = React.createClass({
    _handleClick: function(e){
      e.preventDefault();
      switch(e.target.getAttribute("data-show")){
        case "guidance":
          EstimatorActions.openMessage();
          return;
          break;
        case "estimator":
          EstimatorActions.closeMessage();
          return;
          break;
      }
    },

    render: function(){
      return (
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            {/* Brand and toggle get grouped for better mobile display */}
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">SAP Jam Storage Estimator</a>
            </div>

            {/* Collect the nav links, forms, and other content for toggling */}
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li><a href="#" data-show="guidance" onClick={this._handleClick}>Guidance</a></li>
                <li><a href="#" data-show="estimator" onClick={this._handleClick}>Estimator</a></li>
              </ul>
            </div>{/* .navbar-collapse */}
          </div>{/* .container-fluid */}
        </nav>
      );
    }
  });

  module.exports = Header;
  
})();