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
        "type": "[[ Experience ID | String | POP_UP | {required: true , group: General}]]_" + interactionType,
        "pos": window._boxever_settings.pointOfSale,
        "browser_id": Boxever.getID(),
    };
    Boxever.eventCreate(eventToSent, function (data) { }, 'json');
}

// insert html into body
insertHTMLBefore("body");
document.querySelector("#bx-modal_overlay").style.display = "flex";
document.body.classList.add("bx-modal_content");


//declaration and listener in case if dismissing the experience
var bxCardClose = document.querySelector(".bx-modal__btn-close-icon");
bxCardClose.onclick = function() {
    sendInteractionToBoxever("DISMISSED");
    document.querySelector("#bx-modal_overlay").style.display = "none";
}

//declaration and listener in case POP-UP get engaged
var bxCardClicked = document.querySelector(".bx-modal_button");
bxCardClicked.onclick = function() {
    sendInteractionToBoxever("CLICKED");
    document.querySelector("#bx-modal_overlay").style.display = "none";
}
//declaration and listener in case if dismissing the experience clicking outside
var overlayClicked = document.querySelector("#bx-modal_overlay");
overlayClicked.onclick = function() {
    sendInteractionToBoxever("DISMISSED");
    document.querySelector("#bx-modal_overlay").style.display = "none";
}