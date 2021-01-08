(function () {
    function getNumberOfEvents(session, eventType){
        var numberOfEvents = 0;
        for (var i = 0; i < session.events.length; i++) {
            var event = session.events[i];
            if (event.type === eventType) {
                numberOfEvents++;
            }
        }
        return numberOfEvents;
    }

    return getNumberOfEvents(triggerSession, "VIEW");
})();