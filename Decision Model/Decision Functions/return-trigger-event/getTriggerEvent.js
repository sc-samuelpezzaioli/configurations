(function () {
    function getTriggerEvent(){
        var eventRef;
        if (entity && entity.ref !== 'undefined') {
            eventRef = entity.ref;
        }
        var triggerEvent;
        for (var i = 0; i < guest.sessions.length; i++) {
            var session = guest.sessions[i];
            for (var j = 0; j < session.events.length; j++) {
                var event = session.events[j];
                if (event.ref === eventRef) {
                    triggerEvent = event;
                    return triggerEvent;
                }
            }
        }
        return triggerEvent;
    }

    return getTriggerEvent();
})();