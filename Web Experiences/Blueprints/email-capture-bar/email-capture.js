// Adds a unique variant identifier to CSS when deployed to ensure CSS does not impact styling of other elements.
var compiledCSS = Boxever.templating.compile(variant.assets.css)(variant);
var styleTag = document.getElementById('style-' + variant.ref);
if (styleTag) {
    styleTag.innerHTML = compiledCSS;
}
// End Adds a unique variant identifier to CSS when deployed to ensure CSS does not impact styling of other elements.

// make space in the body for the experience
document.body.classList.add("show-TopBanner");
insertHTMLBefore("body");

// Declarations
const bxButtonPress = document.getElementById("#bx-"+variant.ref+ " #bx_TopBanner-button");
const bxCloseButtonPress = document.querySelector("#bx-"+variant.ref+ " .bx-btn-close");
const bxBanner = document.querySelector("#bx-"+variant.ref+ " #bx_TopBanner");

// Listen on CTA, if email is valid proceed to show message
bxButtonPress.onclick = function(){
    let emailVerified = validateEmail();
    if(emailVerified){
        hideBar();
        sendInteractionToBoxever("CLICKED")
        showThankYou();
    }else{
        //friendly error
        document.getElementById("bx-email_input").style.backgroundColor = 'rgba(200,0,0,0.1)'
    }
};

//Dismiss bar on X clicK
bxCloseButtonPress.onclick = function(){
    hideBar();
    sendInteractionToBoxever("DISMISSED")
};

// Functions

// show thank you message function
const showThankYou= function(){
    let thanksMessage = document.querySelector('#bx-thank_you_modal');
    thanksMessage.style.display = "block";
    setTimeout(function(){ thanksMessage.style.display= 'none'; }, 1500);
}

// dismiss bar function
const hideBar = function(){
    bxBanner.style.display = "none";
    document.body.classList.remove("show-TopBanner");
    bxBanner.classList.add('bx_TopBanner-hide');

}

// Declare BX function event
const sendInteractionToBoxever = function(interactionType){
    let eventToSend = {
        "channel": "WEB",
        "type": "[[ Experience ID | String | EMAIL_BAR | {required: true}]]_" + interactionType,
        "pos": window._boxever_settings.pointOfSale,
        "browser_id": Boxever.getID()
    };
    Boxever.eventCreate(eventToSend, function(data){ }, 'json');
}

// validate Mail format function
const validateEmail = function(){
    let bxEmail = document.getElementById("bx-email_input").value;
    let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(bxEmail)
    let validation = false;
    mailformat ? validation = true: validation = false;
    return validation;
}