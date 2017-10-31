
var ews = require('ews-javascript-api');


// init EWS 
var exch = new ews.ExchangeService(ews.ExchangeVersion.Exchange2013);
exch.Credentials = new ews.ExchangeCredentials(process.env.AUTOMAILER_USERNAME, process.env.AUTOMAILER_PASSWORD);
exch.Url = new ews.Uri("https://outlook.office365.com/Ews/Exchange.asmx");

var notifier = {

    Notify : function(action, item, done) {
        
        var emailMessage = new ews.EmailMessage(exch);

        emailMessage.Subject = 'Heap activity notification - ' + action;
        emailMessage.Body = new ews.MessageBody(JSON.stringify(item));
        
        emailMessage.ToRecipients.Add(new ews.EmailAddress('zeromemory@live.com'));
        emailMessage.ToRecipients.Add(new ews.EmailAddress('minjingzhu@outlook.com'));

        emailMessage.Send().then(function() {
                done();
            });
    },

};

module.exports = notifier;