// Adds a unique variant identifier to CSS when deployed to ensure CSS does not impact styling of other elements.
var compiledCSS = Boxever.templating.compile(variant.assets.css)(variant);
var styleTag = document.getElementById('style-' + variant.ref)
if (styleTag) {
    styleTag.innerHTML = compiledCSS;
}
// End Adds a unique variant identifier to CSS when deployed to ensure CSS does not impact styling of other elements.

insertHTMLAfter("body");

// show experience on bx load
let bxContent = document.querySelector("#bx-"+variant.ref+ " #bx-transition-card");
setTimeout(function() {
    bxContent.classList.add("open");
    sendInteractionToBoxever("VIEWED");
});

// declarations
var bxCardClose = document.body.querySelector("#bx-"+variant.ref+ " #CTA-dismiss");
var bxCloseBtn = document.body.querySelector("#bx-"+variant.ref+ " .bx-btn-close");
var CTAbtn = bxContent.querySelector("#CTA-accept");

// close experience function declaration
const dismissExperience = function(){
    sendInteractionToBoxever("DISMISSED");
    bxContent.classList.remove("open");
}


// Listeners
// dismiss experience on secondary button click
bxCardClose.onclick = function() {
    dismissExperience();
}
// dismiss on X btn click
bxCloseBtn.onclick = function() {
    dismissExperience();
}

// on Call to action click redirect to specific URL
CTAbtn.onclick = function() {
    sendInteractionToBoxever("CLICKED");
    window.location.href = "[[CTA destination URL | string || {required:true, group: Button Configuration}]]";
}

// BX function declaration
const sendInteractionToBoxever = function(interactionType) {
    let eventToSent = {
        "channel": "WEB",
        "type": "[[ Experience ID | String | CORNER | {required: true}]]_" + interactionType,
        "pos": window._boxever_settings.pointOfSale,
        "browser_id": Boxever.getID(),
    };
    Boxever.eventCreate(eventToSent, function (data) { }, 'json');
}