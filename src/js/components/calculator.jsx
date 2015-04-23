(function(){
  var React = require("react")
  , _ = require("underscore")
  , EstimatorActions = require("../actions/EstimatorActions.js")
  , numeral = require("numeral")
  ;

  var Calculator = React.createClass({
    _correctType: function(type, value){
      var flag = false;  // default is false
      // check if value is of type type
      switch(type){
        case "number":
          flag = !isNaN(value) && typeof value === "number" ? true : false;
          if(!flag){return flag; }
          flag = value >= 0 ? true : false;
          return flag;
          break;
        case "percent":
          flag = !isNaN(value) && typeof value === "number" ? true : false;
          if(!flag){return flag; }
          flag = value >= 0 && value <= 100 ? true : false;
          return flag;
          break;
      }
    },

    _disableSelectionOption: function(selector, option){
      EstimatorActions.changeOption(selector, option, true);
    },

    _enableCustom: function(){
      var currentState = this.props.data;
      EstimatorActions.changeOption("custom", "all", true);
      if(currentState.calculator.primaryUseCase.value === "ucCS" || currentState.calculator.secondaryUseCase.value === "ucCS"){
        EstimatorActions.changeOption("custom", "all", false);
      }
    },

    _formatValue: function(value){
      return numeral(value).format("0.0 b");  // format result in KB, MB or TB as appropriate
    },

    _handleChange: function(e){
      var currentState = this.props.data;
      var value;

      switch(e.target.id){
        case "seatLicenseSold":
          value = e.target.value === "" ? 0 : parseInt(e.target.value);
          currentState.calculator.seatLicenseSold = this._correctType("number", value) ? value : currentState.calculator.seatLicenseSold;
          EstimatorActions.updateState(currentState);
          break;
        case "contractPeriod":
          value = e.target.value === "" ? 0 : parseInt(e.target.value);
          currentState.calculator.contractPeriod = this._correctType("number", value) ? value : currentState.calculator.contractPeriod;
          EstimatorActions.updateState(currentState);
          break;
        case "archivePercentage":
          value = e.target.value === "" ? 0 : parseInt(e.target.value);
          currentState.calculator.archivePercentage = this._correctType("percent", value) ? value : currentState.calculator.archivePercentage;
          EstimatorActions.updateState(currentState);
          break;
        case "primaryUseCase":
          // disable selection on secondary use case
          this._disableSelectionOption("secondary", e.target.value);
          // update value
          currentState.calculator.primaryUseCase.value = e.target.value;
          EstimatorActions.updateState(currentState);
          // enable custom settings, if needed
          this._enableCustom();
          break;
        case "secondaryUseCase":
          // disable selection on primary use case
          this._disableSelectionOption("primary", e.target.value);
          // update value
          currentState.calculator.secondaryUseCase.value = e.target.value;
          EstimatorActions.updateState(currentState);
          // enable custom settings, if needed
          this._enableCustom();
          break;
        case "activeUserPercentage":
          value = e.target.value === "" ? 0 : parseInt(e.target.value);
          currentState.calculator.custom.activeUserPercentage = this._correctType("percent", value) ? value : currentState.calculator.custom.activeUserPercentage;
          EstimatorActions.updateState(currentState);
          break;
        case "publisherPercentage":
          value = e.target.value === "" ? 0 : parseInt(e.target.value);
          currentState.calculator.custom.publisherPercentage = this._correctType("percent", value) ? value : currentState.calculator.custom.publisherPercentage;
          EstimatorActions.updateState(currentState);
          break;
        case "documentsUploaded":
          value = e.target.value === "" ? 0 : parseInt(e.target.value);
          currentState.calculator.custom.documentsUploaded = this._correctType("number", value) ? value : currentState.calculator.custom.documentsUploaded;
          EstimatorActions.updateState(currentState);
          break;
        case "averageDocumentSize":
          value = e.target.value === "" ? 0 : parseInt(e.target.value);
          currentState.calculator.custom.averageDocumentSize = this._correctType("number", value) ? value : currentState.calculator.custom.averageDocumentSize;
          EstimatorActions.updateState(currentState);
          break;
        case "videosUploaded":
          value = e.target.value === "" ? 0 : parseInt(e.target.value);
          currentState.calculator.custom.videosUploaded = this._correctType("number", value) ? value : currentState.calculator.custom.videosUploaded;
          EstimatorActions.updateState(currentState);
          break;
        case "averageVideoSize":
          value = e.target.value === "" ? 0 : parseInt(e.target.value);
          currentState.calculator.custom.averageVideoSize = this._correctType("number", value) ? value : currentState.calculator.custom.averageVideoSize;
          EstimatorActions.updateState(currentState);
          break;
      }
    },

    _renderCalculator: function(){
      var currentState = this.props.data;
      var primaryUseCase = currentState.calculator.primaryUseCase;
      var pstatus = primaryUseCase.selectorStatus;

      var secondaryUseCase = currentState.calculator.secondaryUseCase;
      var sstatus = secondaryUseCase.selectorStatus;

      var seatLicenseSold = currentState.calculator.seatLicenseSold
      , contractPeriod = currentState.calculator.contractPeriod
      , archivePercentage = currentState.calculator.archivePercentage
      , custom = currentState.calculator.custom
      ;


      return (

        <div id="calculator-box" className="container-fluid">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <h1 className="text-center">SAP Jam Storage Estimator</h1>
            </div>
          </div> 

          <div className="row spacer">
            <div className="col-md-4 col-md-offset-1">
              <form className="form-horizontal">
                <div className="form-group">
                  <label htmlFor="seatLicenseSold" className="col-sm-6 control-label">Seat licenses sold</label>
                  <div className="col-sm-6 input-group">
                    <input type="text" min="0" step="1" className="form-control" id="seatLicenseSold" value={seatLicenseSold} onChange={this._handleChange} />
                    <div className="input-group-addon">users</div>
                  </div> 
                </div>

                <div className="form-group">
                  <label htmlFor="contractPeriod" className="col-sm-6 control-label">Contract period</label>
                  <div className="col-sm-6 input-group">
                    <input type="text" min="0" max="200" step="1" className="form-control" id="contractPeriod" value={contractPeriod} onChange={this._handleChange} />
                    <div className="input-group-addon">months</div>
                  </div> 
                </div>

                <div className="form-group">
                  <label htmlFor="archivePercentage" className="col-sm-6 control-label">Percentage of content archived annually</label>
                  <div className="col-sm-6 input-group">
                    <input type="text" min="0" max="100" className="form-control" id="archivePercentage" value={archivePercentage} onChange={this._handleChange} />
                    <div className="input-group-addon">%</div>
                  </div> 
                </div>

                <div className="form-group">
                  <label htmlFor="primaryUseCase" className="col-sm-6 control-label">Primary use case</label>
                  <div className="col-sm-6 input-group">
                    <select className="form-control" id="primaryUseCase" value={primaryUseCase.value} onChange={this._handleChange}>
                      <option value="uc1" disabled={pstatus.uc1}>Account Management</option>
                      <option value="uc2" disabled={pstatus.uc2}>Customer and Partner Engagement</option>
                      <option value="uc3" disabled={pstatus.uc3}>Education Center</option>
                      <option value="uc4" disabled={pstatus.uc4}>Help and Support</option>
                      <option value="uc5" disabled={pstatus.uc5}>Knowledge Sharing</option>
                      <option value="uc6" disabled={pstatus.uc6}>Mentoring and Coaching</option>
                      <option value="uc7" disabled={pstatus.uc7}>Opportunity Deal Room</option>
                      <option value="uc8" disabled={pstatus.uc8}>Order to Cash (with orders and invoices)</option>
                      <option value="uc9" disabled={pstatus.uc9}>Planning and Implementation</option>
                      <option value="uc10" disabled={pstatus.uc10}>Service Request Resolution</option>
                      <option value="uc11" disabled={pstatus.uc11}>Team Collaboration</option>
                      <option value="ucCS" disabled={pstatus.ucCS}>Custom Setting</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="secondaryUseCase" className="col-sm-6 control-label">Secondary use case</label>
                  <div className="col-sm-6 input-group">
                    <select className="form-control" id="secondaryUseCase" value={secondaryUseCase.value} onChange={this._handleChange}>
                      <option value="uc1" disabled={sstatus.uc1}>Account Management</option>
                      <option value="uc2" disabled={sstatus.uc2}>Customer and Partner Engagement</option>
                      <option value="uc3" disabled={sstatus.uc3}>Education Center</option>
                      <option value="uc4" disabled={sstatus.uc4}>Help and Support</option>
                      <option value="uc5" disabled={sstatus.uc5}>Knowledge Sharing</option>
                      <option value="uc6" disabled={sstatus.uc6}>Mentoring and Coaching</option>
                      <option value="uc7" disabled={sstatus.uc7}>Opportunity Deal Room</option>
                      <option value="uc8" disabled={sstatus.uc8}>Order to Cash (with orders and invoices)</option>
                      <option value="uc9" disabled={sstatus.uc9}>Planning and Implementation</option>
                      <option value="uc10" disabled={sstatus.uc10}>Service Request Resolution</option>
                      <option value="uc11" disabled={sstatus.uc11}>Team Collaboration</option>
                      <option value="ucCS" disabled={sstatus.ucCS}>Custom Setting</option>
                      <option value="uc0" disabled={sstatus.uc0}>None</option>
                    </select>
                  </div>
                </div>

              </form>
            </div>
            <div className="col-md-4" id="calculated-result">
              <h3 className="text-center">Estimated Storage Required</h3>
              {<p className="text-center" id="storage-result">{this._formatValue(this.props.data.calculator.storageEstimated)}</p>}
            </div>
          </div>

          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="page-header">
                <h3>Custom settings <small> activate by selecting "Custom Setting" for one of the use cases</small></h3>
              </div>

              <form className="form-horizontal">
                <fieldset disabled={currentState.calculator.custom.disable}>
                  <div className="form-group">
                    <label htmlFor="activeUserPercentage" className="col-sm-2 control-label">Percentage of active users</label>
                    <div className="col-sm-6 input-group">
                      <input type="text" min="0" max="100" className="form-control" id="activeUserPercentage" value={custom.activeUserPercentage} onChange={this._handleChange} />
                      <div className="input-group-addon">%</div>
                    </div> 
                  </div>

                  <div className="form-group">
                    <label htmlFor="publisherPercentage" className="col-sm-2 control-label">Percentage of publishers</label>
                    <div className="col-sm-6 input-group">
                      <input type="text" min="0" max="100" className="form-control" id="publisherPercentage" value={custom.publisherPercentage} onChange={this._handleChange} />
                      <div className="input-group-addon">%</div>
                    </div> 
                  </div>                  

                  <div className="form-group">
                    <label htmlFor="documentsUploaded" className="col-sm-2 control-label">Documents uploaded</label>
                    <div className="col-sm-6 input-group">
                      <input type="text" min="0" step="1" className="form-control" id="documentsUploaded" value={custom.documentsUploaded} onChange={this._handleChange} />
                      <div className="input-group-addon">per publisher per month</div>
                    </div> 
                  </div> 

                  <div className="form-group">
                    <label htmlFor="averageDocumentSize" className="col-sm-2 control-label">Average document size</label>
                    <div className="col-sm-6 input-group">
                      <input type="text" min="0" className="form-control" id="averageDocumentSize" value={custom.averageDocumentSize} onChange={this._handleChange} />
                      <div className="input-group-addon">MB</div>
                    </div> 
                  </div> 

                  <div className="form-group">
                    <label htmlFor="videosUploaded" className="col-sm-2 control-label">Videos uploaded</label>
                    <div className="col-sm-6 input-group">
                      <input type="text" min="0" step="1" className="form-control" id="videosUploaded" value={custom.videosUploaded} onChange={this._handleChange} />
                      <div className="input-group-addon">per publisher per month</div>
                    </div> 
                  </div> 

                  <div className="form-group">
                    <label htmlFor="averageVideoSize" className="col-sm-2 control-label">Average video size</label>
                    <div className="col-sm-6 input-group">
                      <input type="text" min="0" className="form-control" id="averageVideoSize" value={custom.averageVideoSize} onChange={this._handleChange} />
                      <div className="input-group-addon">MB</div>
                    </div> 
                  </div> 

                </fieldset>

              </form>
            </div>


          </div>
        </div>
      );
    },

    render: function(){
      return (
        this._renderCalculator()
      );
    }
  });

  module.exports = Calculator;

})();