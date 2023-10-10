// CLEAR INLINE STYLES
function clearStyles() {
    let allStyle = document.querySelectorAll('*[style]');

    for (let x = 0; x < allStyle.length; x++) {
        allStyle[x].removeAttribute('style');
    }
}
clearStyles();

// CLEAR WHITESPACES
function clearSpaces() {
    let whiteUL = document.querySelector('ul');

    whiteUL.innerHTML = whiteUL.innerHTML.replace(/\&nbsp\;/g,'');
}
clearSpaces();

// CLEAR DIRECTORY SLASHES
function clearSlashes() {
    let allSlash = document.querySelectorAll('.dirname');

    for (let x = 0; x < allSlash.length; x++) {
        allSlash[x].innerText = allSlash[x].innerText.replace('/','');
    }
}
clearSlashes();

// ADD A NEW HEADER
function makeHeader() {
    let header = elemake('header',`
        <section class="main">
            <spread>
                <span class="menu">
                    ${menuSVG}
                </span>
            </spread>
        </section>
        <section class="sub">
            <spread>
            </spread>
        </section>
    `.replace(/>\s+/g,'>').replace(/\s+</g,'<'),'');

    document.body.insertBefore(header, document.body.children[0]);

    let sectionSUB = document.querySelector('header section.sub spread'),
        sectionMAIN = document.querySelector('header section.main spread'),
        directory = document.querySelector('.directory'),
        deviceName = document.querySelector('.deviceName');
    
    directory.innerHTML = '<a href="/"><i class="fa fa-home"></i>' + directory.innerText.replace('/storage/emulated/0','').replace(/\//g,'</a><i class="fa fa-arrow-right"></i><a class="boxes">');
    deviceName.innerHTML = '<span>' + deviceName.innerHTML.replace('<br>','</span><span>') + '</span>';
    
    sectionMAIN.appendChild(directory);
    sectionSUB.appendChild(deviceName);

    let boxes = sectionMAIN.querySelectorAll('a.boxes'),
        runningHREF = '/';

    for (let x = 0; x < (boxes.length - 1); x++) {
        runningHREF = runningHREF + encodeURIComponent(boxes[x].innerText) + '/';
        boxes[x].setAttribute('href',runningHREF);
    }
}
makeHeader();

// ADD A NEW NAV
function makeNav() {
    let dawnActive = '', duskActive = '';
    if (sessionStorage.cScheme === 'dawn') {
        dawnActive = ' active';
    } else {
        duskActive = ' active';
    }

    if (typeof sessionStorage.folderActive === 'undefined') {
        sessionStorage.folderActive = ' active';
        sessionStorage.folderCSS = 'null';
    }
    if (typeof sessionStorage.fileActive === 'undefined') {
        sessionStorage.fileActive = ' active';
        sessionStorage.fileCSS = 'null';
    }

    if (typeof sessionStorage.device === 'undefined') {
        if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
            sessionStorage.device = ' mobile';
            sessionStorage.deviceTxt = 'Mobile';
        } else {
            sessionStorage.device = ' pc';
            sessionStorage.deviceTxt = 'PC';
        }
    }

    if (typeof sessionStorage.playerChoice === 'undefined') {
        sessionStorage.playerChoice = ' mark-none';
        sessionStorage.playerTxt = 'None';
    }

    let nav = elemake('nav',`
        <sidebar>
            <section class="theme">
                <btn class="dawn${dawnActive}">
                    <i class="fa fa-dawn"></i>
                </btn>
                <btn class="dusk${duskActive}">
                    <i class="fa fa-dusk"></i>
                </btn>
            </section>
            <section class="upload">
                <gbtn>
                    <btn class="select-files grow">
                        <i class="fa fa-upload"></i>
                        <span>Select File to Upload</span>
                    </btn>
                    <btn class="send-files hide" style="--_percent: 0%">
                        <i class="fa fa-tick"></i>
                        <i class="fa fa-send"></i>
                        <i class="fa fa-loading"></i>
                        <span class="keep-bg"></span>
                    </btn>
                </gbtn>
            </section>
            <section class="config">
                <btn class="folder-view${sessionStorage.folderActive}">
                    <i class="fa fa-folder"></i>
                    <span>Show Folders</span>
                    <i class="fa fa-tick"></i>
                    <style type="${sessionStorage.folderCSS}">
                        section.directories li:not(.back-link) {display: none !important;}
                    </style>
                </btn>
                <btn class="file-view${sessionStorage.fileActive}">
                    <i class="fa fa-file"></i>
                    <span>Show Files</span>
                    <i class="fa fa-tick"></i>
                    <style type="${sessionStorage.fileCSS}">
                        section.files {display: none !important;}
                    </style>
                </btn>
            </section>
            <section class="pplayer">
                <gbtn class="platform${sessionStorage.device} closed">
                    <btn class="base">
                        <i class="fa fa-platform"></i>
                        <span>Platform:</span>
                        <span class="holder">${sessionStorage.deviceTxt}</span>
                        <i class="fa fa-arrow-down"></i>
                    </btn>
                    <btn class="sel-mobile">
                        <span>Mobile</span>
                        <i class="fa fa-tick"></i>
                    </btn>
                    <btn class="sel-pc">
                        <span>PC</span>
                        <i class="fa fa-tick"></i>
                    </btn>
                </gbtn>
                <gbtn class="player${sessionStorage.device}${sessionStorage.playerChoice} closed">
                    <btn class="base">
                        <i class="fa fa-player"></i>
                        <span>Player:</span>
                        <span class="holder">${sessionStorage.playerTxt}</span>
                        <i class="fa fa-arrow-down"></i>
                    </btn>
                    <btn class="sel-none">
                        <span>None</span>
                        <i class="fa fa-tick"></i>
                    </btn>
                    <btn class="sel-potplayer mhide">
                        <span>PotPlayer</span>
                        <i class="fa fa-tick"></i>
                    </btn>
                    <btn class="sel-vlcplayer">
                        <span>VLC Player</span>
                        <i class="fa fa-tick"></i>
                    </btn>
                    <btn class="sel-xplayer pchide">
                        <span>XPlayer</span>
                        <i class="fa fa-tick"></i>
                    </btn>
                    <btn class="sel-mxplayer pchide">
                        <span>MX Player</span>
                        <i class="fa fa-tick"></i>
                    </btn>
                    <btn class="sel-mxplayerpro pchide">
                        <span>MX Player Pro</span>
                        <i class="fa fa-tick"></i>
                    </btn>
                </gbtn>
            </section>
        </sidebar>
        <backdrop></backdrop>
    `.replace(/>\s+/g,'>').replace(/\s+</g,'<'),{"key":['class'],"val":['hide none']});

    document.body.insertBefore(nav, document.body.children[0]);
}
makeNav();

// ADD GRAPHIC PREVIEW
function makePreview() {
    let preview = elemake('preview',`
        <btn class="prev-image">
            <i class="fa fa-arrow-left"></i>
        </btn>
        <btn class="next-image">
            <i class="fa fa-arrow-right"></i>
        </btn>
        <img src="" alt="" title="">
        <curtains></curtains>
    `.replace(/>\s+/g,'>').replace(/\s+</g,'<'),{"key":['class'],"val":['hide none']});

    document.body.appendChild(preview);
}
makePreview();

// MOVE CONTENT ELEMENT TO NAV
function moveContent() {
    let content = document.querySelector('#content'),
        sidebar = document.querySelector('nav sidebar section.upload');

    sidebar.appendChild(content);

    document.querySelector('#fil').value = '';
}
moveContent();

// ADD A NEW CLASS TO BACK LINK
function backlinkClass() {
    let backLink = document.querySelector('section.directories > li .dirname');

    if (backLink.innerText === '..') {
        backLink.parentNode.parentNode.classList.add('back-link');
    }
}
backlinkClass();