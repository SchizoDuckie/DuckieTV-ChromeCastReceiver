angular.module('DuckieTV.providers.chromecast', [])


.factory('ChromeCastReceiver', function($rootScope) {

    var applicationID = 'B09C392B';
    var namespace = 'urn:x-cast:io.github.schizoduckie.duckietv';
    var session = null;
    var messageBus = null;
    var remoteMedia = null;

    var handlers = {
        onReady: function(event) {
            console.log('Received Ready event: ', event);
            session.setApplicationState("Application status is ready...");
        },
        onSenderConnected: function(event) {
            console.log('Received Sender Connected event: ', event);
            console.log(session.getSender(event.data).userAgent);
        },
        onSenderDisconnected: function(event) {
            console.log('Received Sender Disconnected event: ', event);
            if (session.getSenders().length == 0) {
                window.close();
            }
        },
        onSystemVolumeChanged: function(event) {
            console.log('Received System Volume Changed event: ', event);
        },
        onMessage: function(event) {
            console.log('Message [' + event.senderId + ']: ' + event.data);
            var message = JSON.parse(event.data);
            service.handleMessage(message);
            messageBus.send(event.senderId, event.data);
        }
    };

    var service = {
        initialize: function() {
            console.log('ChromeCast Receiver Manager initializing');

            cast.receiver.logger.setLevelValue(0);
            session = cast.receiver.CastReceiverManager.getInstance();
            session.onSenderDisconnected = handlers.onSenderConnected;
            session.onSystemVolumeChanged = handlers.onSystemVolumeChanged;
            session.onSenderConnected = handlers.onSenderConnected;
            session.onReady = handlers.onReady;

            remoteMedia = new cast.receiver.MediaManager(document.getElementById('vid'));

            messageBus = session.getCastMessageBus('urn:x-cast:io.github.schizoduckie.duckietv');
            messageBus.onMessage = handlers.onMessage;
            session.start({
                statusText: "Application is starting"
            });
            console.log('ChromeCastReceiver Manager started');
        },
        /**
         * Handle an incoming eventchannel and fire it on $rootScope. SWEET! :D
         */
        handleMessage: function(data) {

            console.log("Message received!", data);
            var inputFilter = ['background:load', 'serie:load', 'episode:load', 'video:load'];
            inputFilter.map(function(el) {
                if (el in data) {
                    console.log("Found message to broadcast! ", el, data[el]);
                    $rootScope.$broadcast(el, data[el]);
                }
            })
            session.setApplicationState("update");

        }
    };


    return service;
});