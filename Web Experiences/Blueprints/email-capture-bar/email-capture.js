// Adds a unique variant identifier to CSS when deployed to ensure CSS does not impact styling of other elements.
var compiledCSS = Boxever.templating.compile(variant.assets.css)(variant);
var styleTag = document.getElementById('style-' + variant.ref);
if (styleTag) {
    styleTag.innerHTML = compiledCSS;
}
// End

insertHTMLBefore("body");
// add space to the body to show experience
document.body.classList.add("show-TopBanner");

// declarations
const scButtonPress = document.getElementById('sCDP-CTA');
const scCloseButtonPress = document.querySelector(".sCDP-x-btn");
let isBannerBeenClosed = false;

// when sending email, if is verified sendInteractionToSitecoreCDP() or "stop event" ;
scButtonPress.onclick = function(){
    isBannerBeenClosed = true;
    let emailVerified = validateEmail();
    if(emailVerified){
        hideBar();
        sendInteractionToSitecoreCDP("CLICKED")
        showThankYou();
    }else{
        //friendly error
        document.getElementById("sCDP-email_input").style.backgroundColor = 'rgba(200,0,0,0.1)'
        isBannerBeenClosed = false;
    }
};

//dismiss bar;
scCloseButtonPress.onclick = function(){
    isBannerBeenClosed = true;
    hideBar();
    sendInteractionToSitecoreCDP("DISMISSED")
};

// functions
const currentScrollPercentage = function(){
    const scrollPercentage = Math.round((document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100);

    if (scrollPercentage > scrollPercentageInput && !isBannerBeenClosed){
        document.querySelector(`#bx-${variant.ref} #sCDP-top-banner-container`).style.display = "flex";
        document.body.classList.add("show-TopBanner");
    }
}

const showThankYou= function(){
    let thanksMessage = document.querySelector('#sCDP-thank_you_modal');
    thanksMessage.style.display = "block";

    setTimeout(function(){ thanksMessage.style.display= 'none'; }, 1500);
}

// dismiss bar
const hideBar = function(){
    document.querySelector("#sCDP-top-banner-container").style.display = "none";
    document.body.classList.remove("show-TopBanner");
}

const sendInteractionToSitecoreCDP = function(interactionType) {
    let eventToSent = {
        "channel": "WEB",
        "type": "[[ Experience ID | String | EMAIL_CAPTURE_BAR | {required: true}]]_" + interactionType,
        "pos": window._boxever_settings.pointOfSale,
        "browser_id": Boxever.getID(),
    };
    Boxever.eventCreate(eventToSent, function (data) { }, 'json');
}

// validate text if Mail format
const validateEmail = function(){
    let bxEmail = document.getElementById("sc-email_input").value;
    let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(bxEmail)
    let validation = false;
    mailformat ? validation = true: validation = false;
    return validation;
}