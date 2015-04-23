(function(){
  // calculates storage requirement and returns {value: xxx, unit: "MB"}
  function model(state){
    var storageByUseCase = {};
    var users = state.calculator.seatLicenseSold;
    var period = state.calculator.contractPeriod;
    var archivePercentage = state.calculator.archivePercentage;

    // set up assumptions
    var sections = ["primaryUseCase", "secondaryUseCase"];  // break the calculation down into primary and secondary
    sections.forEach(function(section){
      var assumptions = getAssumptions(state, state.calculator[section].value);
      var activeUserPercentage = assumptions.activeUserPercentage;
      var publisherPercentage = assumptions.publisherPercentage;
      var documentsUploaded = assumptions.documentsUploaded;
      var averageDocumentSize = assumptions.averageDocumentSize * 1048576;  // convert to bytes
      var videosUploaded = assumptions.videosUploaded;
      var averageVideoSize = assumptions.averageVideoSize * 1048576;  // convert to bytes

      var activeUsers = users * activeUserPercentage / 100;
      var publishers = activeUsers * publisherPercentage / 100;
      var documentsPublished = publishers * documentsUploaded;
      var documentStorageMonthly = documentsPublished * averageDocumentSize;
      var videosPublished = publishers * videosUploaded;
      var videoStorageMonthly = videosPublished * averageVideoSize;
      var storageSubTotal = documentStorageMonthly + videoStorageMonthly;
      var contentArchived = storageSubTotal * archivePercentage / 100;
      var storageMonthly = storageSubTotal - contentArchived;
      var totalStorage = storageMonthly * period;
      storageByUseCase[section] = totalStorage;
    });

    var scalingFactor = 40;  // fudge factor applied to secondary use case
    var result = storageByUseCase.primaryUseCase + storageByUseCase.secondaryUseCase * scalingFactor / 100;
    result = parseInt(result);
    return result;
  }

  module.exports = model;

  function getAssumptions(state, useCase){
    var activeUserPercentage
    , publisherPercentage
    , documentsUploaded
    , averageDocumentSize
    , videosUploaded
    , averageVideoSize
    ;

    switch(useCase){
      case "uc1":
        // account management
        activeUserPercentage = 20;
        publisherPercentage = 20;
        documentsUploaded = 5;
        averageDocumentSize = 3;
        videosUploaded = 0.083;
        averageVideoSize = 20;
        break;
      case "uc2":
        // customer and partner engagement
        activeUserPercentage = 20;
        publisherPercentage = 20;
        documentsUploaded = 5;
        averageDocumentSize = 3;
        videosUploaded = 0.083;
        averageVideoSize = 20;
        break;
      case "uc3":
        // education center
        activeUserPercentage = 35;
        publisherPercentage = 10;
        documentsUploaded = 5;
        averageDocumentSize = 3;
        videosUploaded = 0.083;
        averageVideoSize = 20;
        break;
      case "uc4":
        // help and support
        activeUserPercentage = 35;
        publisherPercentage = 10;
        documentsUploaded = 5;
        averageDocumentSize = 3;
        videosUploaded = 0.083;
        averageVideoSize = 20;
        break;
      case "uc5":
        // knowledge sharing
        activeUserPercentage = 45;
        publisherPercentage = 10;
        documentsUploaded = 5;
        averageDocumentSize = 3;
        videosUploaded = 0.083;
        averageVideoSize = 20;
        break;
      case "uc6":
        // mentoring and coaching
        activeUserPercentage = 45;
        publisherPercentage = 10;
        documentsUploaded = 5;
        averageDocumentSize = 3;
        videosUploaded = 0.083;
        averageVideoSize = 20;
        break;
      case "uc7":
        // opportunity deal room
        activeUserPercentage = 45;
        publisherPercentage = 20;
        documentsUploaded = 5;
        averageDocumentSize = 3;
        videosUploaded = 0.083;
        averageVideoSize = 20;
        break;
      case "uc8":
        // order to cash
        activeUserPercentage = 45;
        publisherPercentage = 10;
        documentsUploaded = 5;
        averageDocumentSize = 3;
        videosUploaded = 0.083;
        averageVideoSize = 20;
        break;
      case "uc9":
        // planning and implementation
        activeUserPercentage = 45;
        publisherPercentage = 10;
        documentsUploaded = 5;
        averageDocumentSize = 3;
        videosUploaded = 0.083;
        averageVideoSize = 20;
        break;
      case "uc10":
        // service request
        activeUserPercentage = 45;
        publisherPercentage = 10;
        documentsUploaded = 5;
        averageDocumentSize = 3;
        videosUploaded = 0.083;
        averageVideoSize = 20;
        break;
      case "uc11":
        // help and support
        activeUserPercentage = 45;
        publisherPercentage = 30;
        documentsUploaded = 5;
        averageDocumentSize = 3;
        videosUploaded = 0.083;
        averageVideoSize = 20;
        break;
      case "ucCS":
        // help and support
        activeUserPercentage = state.calculator.custom.activeUserPercentage;
        publisherPercentage = state.calculator.custom.publisherPercentage;
        documentsUploaded = state.calculator.custom.documentsUploaded;
        averageDocumentSize = state.calculator.custom.averageDocumentSize;
        videosUploaded = state.calculator.custom.videosUploaded;
        averageVideoSize = state.calculator.custom.averageVideoSize;
        break;
      case "uc0":
        // help and support
        activeUserPercentage = 0;
        publisherPercentage = 0;
        documentsUploaded = 0;
        averageDocumentSize = 0;
        videosUploaded = 0;
        averageVideoSize = 0;
        break;
    }

    return {
      activeUserPercentage: activeUserPercentage,
      publisherPercentage: publisherPercentage,
      documentsUploaded: documentsUploaded,
      averageDocumentSize: averageDocumentSize,
      videosUploaded: videosUploaded,
      averageVideoSize: averageVideoSize
    };
  }


})();