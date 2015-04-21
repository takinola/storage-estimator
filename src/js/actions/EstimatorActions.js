(function(){
  var Flux = require("../stores/EstimatorStore.js").Flux
  ;

  var EstimatorActions = Flux.createActions({
    closeMessage: function(){
      return {
        actionType: "CLOSE_MESSAGE"
      }
    },

    openMessage: function(){
      return {
        actionType: "OPEN_MESSAGE"
      }
    },

    changeOption: function(selector, option, status){
      return {
        actionType: "CHANGE_OPTION",
        target: {
          selector: selector,
          option: option,
          status: status
        }
      }
    },

    updateState: function(state){
      return {
        actionType: "UPDATE_STATE",
        state: state
      }
    }
  });

  module.exports = EstimatorActions;

})();