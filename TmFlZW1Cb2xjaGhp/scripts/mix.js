// SVG Icons
const menuSVG = '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" version="1.1" viewBox="0 0 300 300"><path class="long" d="M149.7 168.7H21.9c-2.8 0-5.6 0-8.3-.5-8.8-1.9-14.3-9.9-13.6-19.4.8-10 7-16.6 16.5-17.3 1.9-.1 3.8-.1 5.7-.1h255.5c2.8 0 5.6-.1 8.3.5 8.8 1.8 14.4 9.8 13.8 19.2-.6 10-6.9 16.8-16.3 17.5-2 .2-4.1.1-6.1.1H149.7z"/><path class="tops" d="M206.4 37.3h73.7c14.1 0 22.3 10.1 19.1 23.9-1.6 7.1-6.1 11.5-13.3 13.1-2.5.5-5.2.7-7.8.7h-144c-3.2 0-6.5-.2-9.5-1.1-8.5-2.5-13.3-11-12-20.4 1.4-9.8 7.9-15.9 17.8-16 16.2-.2 32.5-.1 48.7-.1 9.2-.1 18.3-.1 27.3-.1z"/><path class="bottoms" d="M93.6 262.7H19.9c-14 0-22-9.7-19.3-23.4 1.4-7.2 6.5-12.3 13.7-13.6 2.3-.4 4.6-.6 7-.6h144.9c3 0 6.2.2 9.1 1.1 8.5 2.4 13.4 10.9 12 20.4-1.4 9.8-7.9 15.9-17.7 16-14.5.2-29 .1-43.5.1H93.6z"/></svg>';

// Units and conversion values
const unitCalc = [
    {"unit": "YiB", "math": "80"},
    {"unit": "ZiB", "math": "70"},
    {"unit": "EiB", "math": "60"},
    {"unit": "PiB", "math": "50"},
    {"unit": "TiB", "math": "40"},
    {"unit": "GiB", "math": "30"},
    {"unit": "MiB", "math": "20"},
    {"unit": "KiB", "math": "10"},
    {"unit": "B", "math": "0"}
];

// Function for inserting new elements in the DOM.
function elemake(tag, innr, attr) {
    let element = document.createElement(tag);
    if (innr) {element.innerHTML = innr;}
    if (!attr) {return element;}

    for (let x = 0; x < attr.key.length; x++) {
        element.setAttribute(attr.key[x], attr.val[x]);
    }
    return element;
}

// Increasing and decreasing brightness of colors. (https://stackoverflow.com/a/57401891/14312937)
function applyShade(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).slice(-2));
}

// Get the byte value
function byteGet(value) {
    for (let x = 0; x < unitCalc.length; x++) {
        if (value.match(unitCalc[x].unit)) {
            let multiplicand = parseFloat(value.replace(unitCalc[x].unit,"")),
                multiplier = Math.pow(2,parseInt(unitCalc[x].math)),
                product = multiplicand*multiplier;
            return product;
        }
    }
}

// Theme JSONs
const defDawn = {
    "bodybg": "#f9fafd",
    "bodyfg": "#f2f4f7",
    "headerbg": "#edeff5",
    "accent1": "#868cff",
    "accent2": "#78b1d0",
    "bodytext": "#343436"
};
const defDusk = {
    "bodybg": "#1e1e1e",
    "bodyfg": "#242424",
    "headerbg": "#181818",
    "accent1": "#868cff",
    "accent2": "#78b1d0",
    "bodytext": "#eeeeee"
};

const dawnCSS = `
:root {
    --mix-body-bg: ${defDawn.bodybg};
    --mix-body-fg: ${defDawn.bodyfg};
    --mix-header-bg: ${defDawn.headerbg};
    --mix-accent-1: ${defDawn.accent1};
    --mix-accent-2: ${defDawn.accent2};
    --mix-body-text: ${defDawn.bodytext};
    /* Shades */
    --mix-header-lite: ${applyShade(defDawn.headerbg, +4)};
    --mix-menu-sidebar: var(--mix-body-bg);
    --mix-menu-backdrop: ${defDawn.headerbg}65;
    --mix-menu-hover-text: ${applyShade(defDawn.bodytext, -6)};
    --mix-menu-hover-bg: ${applyShade(defDawn.bodyfg, -6)};
    --mix-body-text-lite: ${defDawn.bodytext}85;
    --mix-menu-hover-text-lite: ${defDawn.bodytext}15;
}
`;

const duskCSS = `
:root {
    --mix-body-bg: ${defDusk.bodybg};
    --mix-body-fg: ${defDusk.bodyfg};
    --mix-header-bg: ${defDusk.headerbg};
    --mix-accent-1: ${defDusk.accent1};
    --mix-accent-2: ${defDusk.accent2};
    --mix-body-text: ${defDusk.bodytext};
    /* Shades */
    --mix-header-lite: ${applyShade(defDusk.headerbg, +3)};
    --mix-menu-sidebar: var(--mix-body-bg);
    --mix-menu-backdrop: ${defDusk.headerbg}65;
    --mix-menu-hover-text: ${applyShade(defDusk.bodytext, +6)};
    --mix-menu-hover-bg: ${applyShade(defDusk.bodyfg, +6)};
    --mix-body-text-lite: ${defDusk.bodytext}85;
    --mix-menu-hover-text-lite: ${defDusk.bodytext}15;
}
`;

// Determine Dark/Light Mode based on Port
if (!sessionStorage.cScheme) {
    if (window.location.port.match(/[13579]$/)) {
        sessionStorage.cScheme = 'dawn';
    } else if (window.location.port.match(/[02468]$/)) {
        sessionStorage.cScheme = 'dusk';
    }
}

if (sessionStorage.cScheme === 'dawn') {
    document.head.appendChild(elemake("style",dawnCSS,{"key":["type","id"],"val":["text/css","dawnCSS"]}));
    document.head.appendChild(elemake("style",duskCSS,{"key":["type","id"],"val":["null","duskCSS"]}));
} else {
    document.head.appendChild(elemake("style",dawnCSS,{"key":["type","id"],"val":["null","dawnCSS"]}));
    document.head.appendChild(elemake("style",duskCSS,{"key":["type","id"],"val":["text/css","duskCSS"]}));
}


/* document.head.appendChild(elemake('link','',{"key":["rel","type","href"],"val":["stylesheet","text/css","http://127.0.0.1:3836/styles/cascadiacode.css"]}));
document.head.appendChild(elemake('link','',{"key":["rel","type","href"],"val":["stylesheet","text/css","http://127.0.0.1:3836/styles/radiocanada.css"]}));
document.head.appendChild(elemake('link','',{"key":["rel","type","href"],"val":["stylesheet","text/css","http://127.0.0.1:3836/styles/nsbengali.css"]}));
document.head.appendChild(elemake('link','',{"key":["rel","type","href"],"val":["stylesheet","text/css","http://127.0.0.1:3836/styles/fontasm.css"]}));
document.head.appendChild(elemake('link','',{"key":["rel","type","href"],"val":["stylesheet","text/css","http://127.0.0.1:3836/styles/main.css"]})); */


// Run Once Flag
sessionStorage.runOnce = false;


/* function docEnd() {
    if (document.readyState === "interactive" || document.readyState === "complete") {
        document.body.appendChild(elemake("script",'',{"key":["type","src","id"],"val":["text/javascript","http://127.0.0.1:3836/scripts/elements.js","mix2JS"]}));
        document.body.appendChild(elemake("script",'',{"key":["type","src","id"],"val":["text/javascript","http://127.0.0.1:3836/scripts/activities.js","mix3JS"]}));
        document.body.appendChild(elemake("script",'',{"key":["type","src","id"],"val":["text/javascript","http://127.0.0.1:3836/scripts/listeners.js","mix4JS"]}));
        sessionStorage.runOnce = true;
    }
} */


function docEnd() {
    if (document.readyState === "interactive" || document.readyState === "complete") {
        document.documentElement.removeAttribute('style');
        sessionStorage.runOnce = true;
    }
}
docEnd();

document.onreadystatechange = function () {
    if (sessionStorage.runOnce == false) {
        docEnd();
    }
};