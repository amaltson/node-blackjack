/* Author: Ahmed Javed 
 */
var blackjackClient = {
  /**
   * Socket io connection.
   */
  socket : "",

  /**
   * Maximum number of logs to display on the main page.
   */
  maximumNumberOfLogsToDisplay : 3,

  /**
   * Logs a message on the main page.
   * 
   * @param message
   *          to log
   */
  logMessage : function(message) {
    if ($('#logList li').length === this.maximumNumberOfLogsToDisplay) {
      $('#logList li:first').remove();
    }
    $('#logList').append("<li>" + message + "</li>");
  }
};