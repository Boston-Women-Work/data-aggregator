'use strict';

/**
 * @ngdoc function
 * @name bwwc.controllers:SessionGeneratorCtrl
 * @description
 * # SessionGeneratorCtrl
 */
angular.module('bwwc.controllers')
  .controller('SessionGeneratorCtrl', ['SessionService',
    function (SessionService) {
      var that = this;
      this.buttonLabel = 'Generate Session';

      this.generateSession = function () {
        this.buttonLabel = 'Loading...';
        SessionService.generateSession()
          .then(function (priKey, pubKey, priBlob) {
            that.sessionGenerated = true;
            return SessionService.storeSession(priKey, pubKey, priBlob)
          })
          .then(function () {
            that.buttonLabel = 'Generate Session';
          });
      };

      /*$.ajax({
       type: "POST",
       url: "/create_session",
       contentType: "application/json",
       data: JSON.stringify({ session: rndSess, publickey: pubKey}),
       success: function(){
       document.getElementById(privID).innerHTML = priKey;
       document.getElementById(pubID).innerHTML = pubKey;
       document.getElementById(linkID).innerHTML =
       "Go To Live Data Page for Session " + rndSess.toString();
       document.getElementById(linkID).href += "?session=" + rndSess.toString();
       saveAs(priblob,'Session_'+rndSess.toString()+'_private_key.pem');
       },
       error: function(){
       var errmsg = "ERROR!!!: failed to load public key to server, please try again";
       document.getElementById(privID).innerHTML = errmsg;
       document.getElementById(pubID).innerHTML = errmsg;
       }
       });*/
      console.log('sessionGeneratorCtrl.js controller');
    }]);
