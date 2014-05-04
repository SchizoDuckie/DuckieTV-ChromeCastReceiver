angular.module('DuckieTV.controllers.chromecastreceiver', ['DuckieTV.providers.chromecast'])


/**
 * Main controller: Receives event channels from DuckieTV and puts them into the scope.
 */
.controller('ChromeCastReceiverCtrl', function($scope, $rootScope, ChromeCastReceiver) {
    console.log("Cast receiver initialized!", $scope);
    ChromeCastReceiver.initialize();

    $scope.serie = false;
    $scope.episode = false;

    $rootScope.$on('serie:load', function(evt, data) {
        console.log("Received serie:load broadcast message!", data);
        $scope.serie = data;
        $scope.episode = false;
        $scope.$digest();
    });

    $rootScope.$on('episode:load', function(evt, data) {

        console.log("Received episode:load broadcast message!", data);
        $scope.episode = data;
        $scope.$digest();
    })

    $rootScope.$on('video:load', function(evt, src) {
        console.log('received video:load event!');
        $scope.showVideo = true;
        playVideo(src);

        $scope.$digest();
    });

    $scope.getAirDate = function(episode) {
        return new Date(episode.firstaired);
    }
    $scope.getEpisodeNumber = function(episode) {
        var sn = episode.seasonnumber.toString(),
            en = episode.episodenumber.toString(),
            out = ['S', sn.length == 1 ? '0' + sn : sn, 'E', en.length == 1 ? '0' + en : en].join('');
        return out;
    }


});

playVideo = function(src) {
    var elem = document.getElementById('vid');
    elem.setAttribute('src', src);
    elem.play();
    console.debug('playing!');
}