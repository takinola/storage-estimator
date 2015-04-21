(function(){
  var React = require("react")
  , EstimatorActions = require("../actions/EstimatorActions.js")
  ;

  var Message = React.createClass({
    _closeMessage: function(){
      EstimatorActions.closeMessage();
    },

    _renderMessage: function(){
      var message = (
        <div id="message-box" className="container-fluid">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <h3 className="text-center">Guidance for estimating storage requirements for customers</h3>
            </div>
            <div className="col-md-1">
              <button type="button" className="close" onClick={this._closeMessage} data-dismiss="modal" aria-label="Close"><span className="closeButton" aria-hidden="true">&times;</span></button>
            </div>
          </div>

          <div className="row spacer">
            <div className="col-md-10 col-md-offset-1">
              <div className="panel panel-default">
                <div className="panel-heading">
                  Only uploaded documents, images, and videos count towards storage quote – nothing else counts
                </div>
                <div className="panel-body">
                  Comments, blog posts, etc are not counted towards storage quotas<br />
                  Content is often very visible and therefore far less often duplicated/repeated per team, since it is no longer in a content silo or hidden from other employees.
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="panel panel-default">
                <div className="panel-heading">
                  It is better to avoid adding too much storage up-front, and instead only add additional increments as truly needed
                </div>
                <div className="panel-body">
                  It is unlikely that all the storage would be consumed all up-front.   When the storage cap is reached, users cannot upload new content/videos, but they can delete old documents to make room for new ones.  They can still comment & discuss around older (deleted) items.
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="panel panel-default">
                <div className="panel-heading">
                  Customers are advised to store documents and media in an external storage system
                </div>
                <div className="panel-body">
                  The service integrates with MS Sharepoint, Box, Alfresco One so customers who already have these systems can easily utilize them for storage.
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="panel panel-default">
                <div className="panel-heading">
                  Most common document types are Adobe Reader (.pdf), Word (.docx), Powerpoint (.pptx) and Excel (.xlsx)
                </div>
                <div className="panel-body">
                  Most Microssoft Word and Adobe Reader files are about 300 - 500Kb each, most Microsoft PowerPoint documents about 1.5 - 2.5 Mb and most videos are about 10 - 20 Mb depending on length (videos are less often uploaded, and typically only 2 - 5 minutes in length)
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">
                    SAMPLE CALCULATION
                  </h3>
                </div>
                <div className="panel-heading">
                  How many content publishers does the customer expect to have?
                </div>
                <div className="panel-body">
                  Most companies have a ratio in a range of 1:150 to 1:300, meaning there is one person publishing content for every 300 people consuming (or commenting on) uploaded content.
                </div>
                <div className="panel-heading">
                  How many documents per publisher per month does the customer expect to upload?
                </div>
                <div className="panel-body">
                  Most publishers upload about 5-25 documents per publisher per month, in the range of about 500kb-3mb per document.
                </div>
                <div className="panel-heading">
                  How many of their users do they expect will be active in a given month/year? 
                </div>
                <div className="panel-body">
                  Most companies experience about a 30-50% "active" rate per month at best, meaning that not everyone is using the service every single month to upload, download, or comment on new content.  Content uploads usually coincide with specific new projects or teams ramping up their usage (new training courses, new products or services to announce, etc.), and then fade off throughout the year as projects and events are completed.
                  <br />
                  <br />
                  So, for example, the math for usage amongst 5,000 users for a fairly active instance would look like this:
                  <br />
                  <br />
                  5,000 users * 30% active = 1,500 active/mo
                  <br />
                  <br />
                  1,500 active users / 150 publishers (1:150 publisher to consumer) = 10 publishers/mo
                  <br />
                  <br />
                  10 * 25 new documents uploaded @ 1.5mb each = +375 mb/mo (0.375 GB/mo)
                  <br />
                  <br />
                  (Notes: most images, Microsoft Word and Adobe PDF documents are about 300-500kb each, most Microsoft PowerPoint documents around 1.5-2.5mb, and most videos are about 10-20mb depending on length – videos are usually less often, and typically only 2-5 minutes in length.)
                  <br />
                  <br />
                  So in this example scenario, storage consumption would be about about 4.5gb per year, assuming no content clean-up or pruning.
                  <br />
                  <br />
                  <p className="warning-text">
                    Disclaimer: "your mileage may vary."  Use cases, actors, consumers vs. publishers ratio variances will skew this formula, but this is based on what we've seen with other customers.
                  </p>
                </div>


              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-10 col-md-offset-1">

            </div>
          </div>

          <div className="row">
            <div className="col-md-10 col-md-offset-1">

            </div>
          </div>


        </div>
      );

/*
      var message = (
        <div id="message-box" className="container-fluid">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="modal" data-show="true">
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" onClick={this._closeMessage} data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <h4 className="modal-title">Guidance for estimating storage requirements for customers</h4>
                    </div>

                    <div className="modal-body">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h3 className="panel-title">
                            Only uploaded documents, images, and videos count towards storage quote – nothing else counts
                          </h3>
                        </div>
                        <div className="panel-body">
                          Comments, blog posts, etc are not counted towards storage quotas<br />
                          Content is often very visible and therefore far less often duplicated/repeated per team, since it is no longer in a content silo or hidden from other employees.
                        </div>
                      </div>

                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h3 className="panel-title">
                            It is better to avoid adding too much storage up-front, and instead only add additional increments as truly needed
                          </h3>
                        </div>
                        <div className="panel-body">
                          It is unlikely that all the storage would be consumed all up-front.   When the storage cap is reached, users cannot upload new content/videos, but they can delete old documents to make room for new ones.  They can still comment & discuss around older (deleted) items.
                        </div>
                      </div>

                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h3 className="panel-title">
                            Customers are advised to store documents and media in an external storage system
                          </h3>
                        </div>
                        <div className="panel-body">
                          The service integrates with MS Sharepoint, Box, Alfresco One so customers who already have these systems can easily utilize them for storage.
                        </div>
                      </div>

                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h3 className="panel-title">
                            Most common document types are Adobe Reader (.pdf), Word (.docx), Powerpoint (.pptx) and Excel (.xlsx)
                          </h3>
                        </div>
                        <div className="panel-body">
                          Most Microssoft Word and Adobe Reader files are about 300 - 500Kb each, most Microsoft PowerPoint documents about 1.5 - 2.5 Mb and most videos are about 10 - 20 Mb depending on length (videos are less often uploaded, and typically only 2 - 5 minutes in length)
                        </div>
                      </div>

                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h3 className="panel-title">
                            SAMPLE CALCULATION
                          </h3>
                        </div>
                        <div className="panel-heading">
                          How many content publishers does the customer expect to have?
                        </div>
                        <div className="panel-body">
                          Most companies have a ratio in a range of 1:150 to 1:300, meaning there is one person publishing content for every 300 people consuming (or commenting on) uploaded content.
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      );
*/
      var returnMessage = this.props.data.displayMessage ? message : null;  // decide if message should be displayed

      return returnMessage;
    },

    render: function(){
      return (
        this._renderMessage()
      );
    }
  });

  module.exports = Message;

})();