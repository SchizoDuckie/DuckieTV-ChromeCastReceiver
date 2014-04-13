angular.module('DuckieTV.controllers.chromecastreceiver', ['DuckieTV.providers.chromecast'])


/**
 * Main controller: Kicks in favorites display
 */
.controller('ChromeCastReceiverCtrl', function($scope, ChromeCastReceiver) {
    console.log("Cast receiver initialized!", $scope);
    ChromeCastReceiver.initialize();

});