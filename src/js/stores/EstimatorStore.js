(function(){
  var Dispatcher = require("../dispatcher/Dispatcher.js")
  , _ = require("underscore")
  , Model = require("../utils/Model.js")
  ;

  var Flux = new Dispatcher();

  var estimatorData = {
    displayMessage: true,
    calculator: {
      storageEstimated: 0,
      seatLicenseSold: 0,
      contractPeriod: 36,
      archivePercentage: 0,
      custom: {
        disable: true,
        activeUserPercentage: 30,
        publisherPercentage: 30,
        documentsUploaded: 25,
        averageDocumentSize: 3,
        videosUploaded: 0.083,
        averageVideoSize: 20
      },
      primaryUseCase: {
        value: "uc1",
        selectorStatus: {
          uc1: false,
          uc2: false,
          uc3: false,
          uc4: false,
          uc5: false,
          uc6: false,
          uc7: false,
          uc8: false,
          uc9: false,
          uc10: false,
          uc11: false,
          ucCS: false,
        }
      },
      secondaryUseCase: {
        value: "uc0",
        selectorStatus: {
          uc0: false, 
          uc1: true,
          uc2: false,
          uc3: false,
          uc4: false,
          uc5: false,
          uc6: false,
          uc7: false,
          uc8: false,
          uc9: false,
          uc10: false,
          uc11: false,
          ucCS: false
        }
      }
    }
  };

  var EstimatorStore = Flux.createStore({
    getData: function(){
      return estimatorData;
    }
  }, function(payload){
    switch(payload.actionType){
      case "CLOSE_MESSAGE":
        estimatorData.displayMessage = false;
        EstimatorStore.emitChange();
        break;

      case "OPEN_MESSAGE":
        estimatorData.displayMessage = true;
        EstimatorStore.emitChange();
        break;

      case "UPDATE_STATE":
        estimatorData = payload.state;
        estimatorData.calculator.storageEstimated = Model(estimatorData);
        EstimatorStore.emitChange();
        break;

      case "CHANGE_OPTION":
        var target;
        switch(payload.target.selector){
          case "primary":
            // reset status for all the options
            _.forEach(estimatorData.calculator.primaryUseCase.selectorStatus, function(status, option){
              estimatorData.calculator.primaryUseCase.selectorStatus[option] = false;
            });
            // change required option to status
            estimatorData.calculator.primaryUseCase.selectorStatus[payload.target.option] = payload.target.status;
            EstimatorStore.emitChange();
            break;
          case "secondary":
            // reset status for all the options
            _.forEach(estimatorData.calculator.secondaryUseCase.selectorStatus, function(status, option){
              estimatorData.calculator.secondaryUseCase.selectorStatus[option] = false;
            });
            // change required option to status
            estimatorData.calculator.secondaryUseCase.selectorStatus[payload.target.option] = payload.target.status;
            EstimatorStore.emitChange();
            break;
          case "custom":
            estimatorData.calculator.custom.disable = payload.target.status;
            EstimatorStore.emitChange();
            break;
        }
        break;
    }
  });

  module.exports.Flux = Flux;
  module.exports.EstimatorStore = EstimatorStore;
})();