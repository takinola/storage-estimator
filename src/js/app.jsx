(function(){
  var React = require("react")
  , EstimatorStore = require("./stores/EstimatorStore.js").EstimatorStore
  , Message = require("./components/message.jsx")
  , Calculator = require("./components/calculator.jsx")
  , Header = require("./components/header.jsx")
  ;

  var EstimatorApp = React.createClass({
    mixins: [EstimatorStore.mixin],
    getInitialState: function(){
      return {data: EstimatorStore.getData()};
    },

    storeDidChange: function(){
      this.setState({data: EstimatorStore.getData()});
    },

    _renderEstimator: function(){
      var estimatorApp = (
        <div id="app-box">
          {<Header data={this.state.data} />}
          {<Message data={this.state.data} />}
          {<Calculator data={this.state.data} />}
        </div>
      );

      return estimatorApp;
    },

    render: function(){
      return (
        this._renderEstimator()
      );
    }
  });

  React.render(<EstimatorApp />, document.getElementById("estimatorApp"));

})();