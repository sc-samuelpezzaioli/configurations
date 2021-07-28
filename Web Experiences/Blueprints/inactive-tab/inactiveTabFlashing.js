//copy and paste this snipet into your JS file of the experience content variant
//and the Advance pagetargeting snipet into your page tergeting script
//configure the text message using the UI

//declarations
var pageTitle = document.title;
// default messages
var attentionMessage = "[[Title Text | text |Choose first flashing text| {max: 20}]]";
var attentionMessage1 = "[[Second Text | text |Choose second flashing text| {max: 20}]]"
var blinkEvent = null;
var eventSent = false;
var isPageActive = !document.hidden;


//functions declarations
const blink = function(){
    blinkEvent = setInterval(function() {
        if(document.title === attentionMessage1){
            document.title = attentionMessage;
        }else {
            document.title = attentionMessage1;
        }
    }, 100);
}
function visibilityChangeFunction(){
    var isPageActive = !document.hidden;
    if(!isPageActive){
        blink();
    }else {
        document.title = pageTitle;
        clearInterval(blinkEvent);
    }
}

// BX function declaration
const sendInteractionToBoxever = function(interactionType) {
    let eventToSent = {
        "channel": "WEB",
        "type": "[[ Experience ID | String | INACTIVETAB | {required: true}]]_" + interactionType,
        "pos": window._boxever_settings.pointOfSale,
        "browser_id": Boxever.getID(),
    };
    Boxever.eventCreate(eventToSent, function (data) { }, 'json');
}
//end functions declarations


blink();
sendInteractionToBoxever("TRIGGERED");

//this following listener function will stop the experience if user come back to the page
// and retrigger if leave again
window.addEventListener('visibilitychange', visibilityChangeFunction);
