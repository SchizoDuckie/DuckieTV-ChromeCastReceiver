/**
 * Handle global dependencies
 */


angular.module('DuckieTV', [
    'ngRoute',
    'DuckieTV.controllers.chromecastreceiver',
    'DuckieTV.directives.backgroundrotator',
    'DuckieTV.directives.seriedetails',
    'DuckieTV.directives.lazybackground'
])

/**
 * Routing configuration.
 */
.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/home.html',
            controller: 'ChromeCastReceiverCtrl'
        })

})