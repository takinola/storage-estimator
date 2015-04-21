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
      var averageDocumentSize = assumptions.averageDocumentSize;
      var videosUploaded = assumptions.videosUploaded;
      var averageVideoSize = assumptions.averageVideoSize;

      var activeUsers = users * activeUserPercentage / 100;
      var publishers = activeUsers * publisherPercentage / 100;
      var documentsPublished = publishers * documentsUploaded;
      var documentStorageMonthly = documentsPublished * averageDocumentSize;
      var videosPublished = publishers * videosUploaded;
      var videoStorageMonthly = videosPublished * averageVideoSize;
      var storageSubTotal = documentStorageMonthly + videoStorageMonthly;
      var contentArchived = storageSubTotal * archivePercentage / 100;
      var storageMonthly = storageSubTotal - contentArchived;
      var totalStorageMB = storageMonthly * period;
      var totalStorageGB = totalStorageMB / 1024;
      storageByUseCase[section] = totalStorageGB;
    });

    var scalingFactor = 40;  // fudge factor applied to secondary use case
    var result = storageByUseCase.primaryUseCase + storageByUseCase.secondaryUseCase * scalingFactor / 100;
    result = parseInt(result);
    return {value: result, unit: "GB"};
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
        activeUserPercentage = 30;
        publisherPercentage = 30;
        documentsUploaded = 25;
        averageDocumentSize = 3;
        videosUploaded = 0.083;
        averageVideoSize = 20;
        break;
      case "uc2":
        // customer and partner engagement
        activeUserPercentage = 30;
        publisherPercentage = 30;
        documentsUploaded = 25;
        averageDocumentSize = 3;
        videosUploaded = 0.083;
        averageVideoSize = 20;
        break;
      case "uc3":
        // education center
        activeUserPercentage = 50;
        publisherPercentage = 15;
        documentsUploaded = 25;
        averageDocumentSize = 3;
        videosUploaded = 0.083;
        averageVideoSize = 20;
        break;
      case "uc4":
        // help and support
        activeUserPercentage = 50;
        publisherPercentage = 15;
        documentsUploaded = 25;
        averageDocumentSize = 3;
        videosUploaded = 0.083;
        averageVideoSize = 20;
        break;
      case "uc5":
        // knowledge sharing
        activeUserPercentage = 70;
        publisherPercentage = 15;
        documentsUploaded = 25;
        averageDocumentSize = 3;
        videosUploaded = 0.083;
        averageVideoSize = 20;
        break;
      case "uc6":
        // mentoring and coaching
        activeUserPercentage = 70;
        publisherPercentage = 15;
        documentsUploaded = 25;
        averageDocumentSize = 3;
        videosUploaded = 0.083;
        averageVideoSize = 20;
        break;
      case "uc7":
        // opportunity deal room
        activeUserPercentage = 70;
        publisherPercentage = 30;
        documentsUploaded = 25;
        averageDocumentSize = 3;
        videosUploaded = 0.083;
        averageVideoSize = 20;
        break;
      case "uc8":
        // order to cash
        activeUserPercentage = 70;
        publisherPercentage = 15;
        documentsUploaded = 25;
        averageDocumentSize = 3;
        videosUploaded = 0.083;
        averageVideoSize = 20;
        break;
      case "uc9":
        // planning and implementation
        activeUserPercentage = 70;
        publisherPercentage = 15;
        documentsUploaded = 25;
        averageDocumentSize = 3;
        videosUploaded = 0.083;
        averageVideoSize = 20;
        break;
      case "uc10":
        // service request
        activeUserPercentage = 70;
        publisherPercentage = 15;
        documentsUploaded = 25;
        averageDocumentSize = 3;
        videosUploaded = 0.083;
        averageVideoSize = 20;
        break;
      case "uc11":
        // help and support
        activeUserPercentage = 70;
        publisherPercentage = 40;
        documentsUploaded = 25;
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