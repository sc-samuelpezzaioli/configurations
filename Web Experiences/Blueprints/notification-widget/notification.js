// Adds a unique variant identifier to CSS when deployed to ensure CSS does not impact styling of other elements.
var compiledCSS = Boxever.templating.compile(variant.assets.css)(variant);
var styleTag = document.getElementById('style-' + variant.ref);
if (styleTag) {
    styleTag.innerHTML = compiledCSS;
}
// End Adds a unique variant identifier to CSS when deployed to ensure CSS does not impact styling of other elements.

//declare function to send data to SITECORE CDP
const sendInteractionToBoxever = function(interactionType) {
    let eventToSent = {
        "channel": "WEB",
        "type": "[[ Experience ID | String | NOTIFICATION | {required: true , group: General}]]_" + interactionType,
        "pos": window._boxever_settings.pointOfSale,
        "browser_id": Boxever.getID(),
    };
    Boxever.eventCreate(eventToSent, function (data) { }, 'json');
}


// insert html into body
insertHTMLAfter('body');
//declare experience and then add the class "open" to show it with animation
var bxContent = document.querySelector('#bx-' + variant.ref + ' #bx-transition-card');
setTimeout(function () {
  bxContent.classList.add('open');
  sendInteractionToBoxever("INTERACTION_VIEWED")
}, 10);


//declare close button 
var bxCardClose = document.body.querySelector('#bx-' + variant.ref + ' #bx-modal__btn-close-icon');
//hide experience on "X" clicked
bxCardClose.onclick = function () {
  bxContent.classList.remove('open');
  sendInteractionToBoxever("INTERACTION_DISMISSED")
};

