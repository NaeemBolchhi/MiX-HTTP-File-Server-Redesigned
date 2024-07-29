// DIRECTORY SHADES ON SCROLL
function scrollShades() {
    let directory = document.querySelector('.directory');

    if (directory.clientWidth < directory.scrollWidth) {
        if (directory.scrollLeft > 0) {
            directory.classList.add('mask-left');
        } else {
            directory.classList.remove('mask-left');
        }
        if (directory.scrollLeft < directory.scrollLeftMax) {
            directory.classList.add('mask-right');
        } else {
            directory.classList.remove('mask-right');
        }
    }
}

// MOVE FILESIZE ELEMENT TO ANCHOR
function moveSize() {
    let fSizes = document.querySelectorAll('li > span.filesize');

    for (let x = 0; x < fSizes.length; x++) {
        fSizes[x].innerText = fSizes[x].innerText.replace(/\((.*)\)/,'$1');
        fSizes[x].parentNode.children[0].appendChild(fSizes[x]);
    }
}

// SET HEADER HEIGHT ON BODY
function heightFix() {
    let hHeight = document.querySelector('header').offsetHeight + 'px';
    document.body.setAttribute('style','--_header-height: ' + hHeight);
}

// MENU BUTTON IS CLICKED
function menuClick() {
    let menu = document.querySelector('.menu'),
        navly = document.querySelector('nav');

    if (menu.classList.contains('aight')) {
        menu.classList.remove('aight');
        document.body.classList.remove('no-scroll');
        navly.classList.add('hide');
        setTimeout(function() {
            navly.classList.add('none');
        }, 100);
    } else {
        menu.classList.add('aight');
        navly.classList.remove('none');
        document.body.classList.add('no-scroll');
        setTimeout(function() {
            navly.classList.remove('hide');
        }, 100);
    }
}

// THEME BUTTONS ARE CLICKED
function themeClick(key) {
    let sDusk = document.getElementById('duskCSS'),
        sDawn = document.getElementById('dawnCSS');

    document.body.classList.add('swap');
    
    sDusk.setAttribute('type','null');
    sDawn.setAttribute('type','null');

    key.parentNode.children[0].classList.remove('active');
    key.parentNode.children[1].classList.remove('active');

    key.classList.add('active');
    if (key.classList.contains('dawn')) {
        sDawn.setAttribute('type','text/css');
        sessionStorage.cScheme = 'dawn';
    } else {
        sDusk.setAttribute('type','text/css');
        sessionStorage.cScheme = 'dusk';
    }

    setTimeout(function() {
        document.body.classList.remove('swap');
    }, 100);
}

// USER SELECTED A FILE TO UPLOAD
function fileSelected() {
    let newUp = document.querySelector('.select-files'),
        oldUp = document.querySelector('#fil'),
        newSend = document.querySelector('.send-files');

    newUp.querySelector('span').innerText = 'File: ' + oldUp.value.replace(/^.*[\\\/]/, '');
    // newUp.classList.remove('grow');
    newSend.classList.remove('hide');
    newSend.classList.add('send');
}

// USER CLICKED SEND TO START UPLOAD
function sendUpload() {
    let newSend = document.querySelector('.send-files'),
        oldSend = document.querySelector('#content .sbtn'),
        progress = document.querySelector('#progress');

    progress.innerHTML = '';
    oldSend.click();
    newSend.classList.remove('send');
    newSend.classList.add('progress');
}

// OBSERVE PROGRESS AND ADD A BAR
function progressObserve() {
    let progress = document.querySelector('#progress'),
        newSend = document.querySelector('.send-files'),
        newUp = document.querySelector('.select-files');

    if (progress.innerText === '') {
        newSend.classList.remove('progress');
        newSend.classList.add('tick');
    } else {
        newUp.querySelector('span').innerText = progress.innerText.replace('/',' / ');

        let current = byteGet(progress.innerText.replace(/\/.*/,'')),
            total = byteGet(progress.innerText.replace(/.*\//,'')),
            prcnt = parseFloat(current/total*100).toFixed(2);

        if (isNaN(prcnt)) {
            prcnt = 0;
        } else if (prcnt < 0 || prcnt > 100) {
            prcnt = 0;
        }

        newSend.setAttribute('style','--_percent: ' + prcnt + '%');
    }
}

// SHOW OR HIDE FOLDERS AND FILES
function contentShow(key, bet) {
    if (sessionStorage.getItem(bet + 'Active').match(/active/)) {
        sessionStorage.setItem(bet + 'Active', '');
        sessionStorage.setItem(bet + 'CSS', 'text/css');
        key.querySelector('style').setAttribute('type','text/css');
        key.classList.remove('active');
    } else {
        sessionStorage.setItem(bet + 'Active', ' active');
        sessionStorage.setItem(bet + 'CSS', 'null');
        key.classList.add('active');
        key.querySelector('style').setAttribute('type','null');
    }
}

// CLOSE OR OPEN MENU ITEMS
function toggleClose(key) {
    if (key.classList.contains('closed')) {
        key.classList.remove('closed-within','closed');
    } else {
        key.classList.add('closed');
        setTimeout(function() {
            key.classList.add('closed-within');
        }, 100);
    }
}

// SWITCH BETWEEN MOBILE AND PC OPTIONS
function mobilePC(key) {
    let holder = key.parentNode.querySelector('.base .holder'),
        player = document.querySelector('section.pplayer .player'),
        playerHolder = player.querySelector('.base .holder');

    if (key.classList.contains('sel-mobile')) {
        sessionStorage.device = ' mobile';
        sessionStorage.deviceTxt = 'Mobile';
        key.parentNode.classList.remove('pc');
        key.parentNode.classList.add('mobile');
        holder.innerText = 'Mobile';
        player.classList.remove('pc');
        player.classList.add('mobile');
    } else if (key.classList.contains('sel-pc')) {
        sessionStorage.device = ' pc';
        sessionStorage.deviceTxt = 'PC';
        key.parentNode.classList.remove('mobile');
        key.parentNode.classList.add('pc');
        holder.innerText = 'PC';
        player.classList.remove('mobile');
        player.classList.add('pc');
    }

    sessionStorage.playerChoice = ' mark-none';
    sessionStorage.playerTxt = 'None';
    player.classList.remove('mark-potplayer','mark-vlcplayer','mark-xplayer','mark-mxplayer','mark-mxplayerpro');
    player.classList.add('mark-none');
    playerHolder.innerText = 'None';
}

// SWITCH AMONG MEDIA PLAYER OPTIONS
function selPlayer(key) {
    let keyClass = key.className.replace('mhide','').replace('pchide','').replace(/\s/g,''),
        keyToken = keyClass.replace('sel-',''),
        keyName = key.querySelector('span').innerText,
        holder = key.parentNode.querySelector('.base .holder');

    sessionStorage.playerChoice = ' mark-' + keyToken;
    sessionStorage.playerTxt = keyName;
    holder.innerText = keyName;
    key.parentNode.classList.remove('mark-none','mark-potplayer','mark-vlcplayer','mark-xplayer','mark-mxplayer','mark-mxplayerpro');
    key.parentNode.classList.add('mark-' + keyToken);
}

// GET AN APPROPRIATE URL FOR MEDIA
function getURL(player, url, text) {
    let matchList = [
        {"key": "none", "val": `${url}`},
        {"key": "potplayer", "val": `potplayer://${url}`},
        {"key": "vlcplayer", "val": `vlc://${url}`},
        {"key": "xplayer", "val": `intent:${url}#Intent;package=video.player.videoplayer;S.title=${text};end`},
        {"key": "mxplayer", "val": `intent:${url}#Intent;package=com.mxtech.videoplayer.ad;S.title=${text};end`},
        {"key": "mxplayerpro", "val": `intent:${url}#Intent;package=com.mxtech.videoplayer.pro;S.title=${text};end`}
    ]

    for (let x = 0; x < matchList.length; x++) {
        if (player === matchList[x].key) {
            return matchList[x].val;
        }
    }
}

// ONCLICK TO OVERRIDE MEDIA ANCHOR
function reAnchor(key) {
    let player = sessionStorage.playerChoice.replace(/^\smark\-/,''),
        ahref = key.href,
        fname = key.querySelector('.filename').innerText;

    window.location.assign(getURL(player, ahref, fname));
}

// ONCLICK TO OVERRIDE GRAPHIC ANCHOR
function reAnchor2(key) {
    let imgsrc = key.href,
        imgtxt = key.querySelector('.filename').innerText,
        prev = document.querySelector('preview'),
        previmg = prev.querySelector('img'),
        rank = key.getAttribute('data-rank');
    
    previmg.setAttribute('src',imgsrc);
    previmg.setAttribute('alt',imgtxt);
    previmg.setAttribute('title',imgtxt);
    prev.setAttribute('data-rank',rank);

    prev.classList.remove('no-prev');
    prev.classList.remove('no-next');

    if (rank == 0) {
        prev.classList.add('no-prev');
    }
    if (rank == prev.getAttribute('data-length')) {
        prev.classList.add('no-next');
    }

    prev.classList.remove('none');
    document.body.classList.add('no-scroll-kai');
    setTimeout(function() {
        prev.classList.remove('hide');
    }, 100);
}

// NEXT OR PREVIOUS IMAGE
function changePreview(key) {
    let prev = document.querySelector('preview'),
        now = parseInt(prev.getAttribute('data-rank')),
        go = now + parseInt(key);
    
    reAnchor2(document.querySelector(`section.files a[data-rank="${go}"]`));
}

// SET CLASSES TO MEDIA AND GRAPHIC FILES
function setAClass() {
    let vid = [
        '3g2','3gp','aac','amr','amv',
        'avi','drc','f4a','f4b','f4p',
        'f4v','flac','flv','imy','m2ts',
        'm2v','m4a','m4v','mid','mkv',
        'mogg','mov','mp2','mp3','mp4',
        'mpe','mpeg','mpg','mpv','mts',
        'mxf','mxmf','off','oga','ogg',
        'ogv','opus','ota','qt','ra',
        'rm','rmvb','rtttl','rtx','svi',
        'ts','viv','vob','wav','webm',
        'wma','wmv','xmf','yuv'
    ];

    let files = document.querySelectorAll('section.files li a:not(.data-media):not(.data-graphic)');

    for (let x = 0; x < files.length; x++) {
        for (let y = 0; y < vid.length; y++) {
            let pat = new RegExp('.' + vid[y] + '$', '')

            if (files[x].href.match(pat)) {
                files[x].classList.add('data-media');
            }
        }
    }

    let pic = [
        'bmp','gif','heif','j2k','jfi','jfif',
        'jif','jp2','jpe','jpeg','jpf','jpg',
        'jpm','jpx','mj2','png','svg','svgz',
        'tif','tiff','webp'
    ];

    let files2 = document.querySelectorAll('section.files li a:not(.data-media):not(.data-graphic)');

    for (let x = 0; x < files2.length; x++) {
        for (let y = 0; y < pic.length; y++) {
            let pat = new RegExp('.' + pic[y] + '$', '')

            if (files2[x].href.match(pat)) {
                files2[x].classList.add('data-graphic');
            }
        }
    }

    let files3 = document.querySelectorAll('section.files li a.data-graphic');

    for (let x = 0; x < files3.length; x++) {
        files3[x].setAttribute('data-rank',x);
    }

    document.querySelector('preview').setAttribute('data-length',files3.length-1);
}

// SMOOTH SCROLL TO TOP
function smoothTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// QUICK SCROLL TO TOP
function quickTop() {
    window.scrollTo({
        top: 0
    });
}

// SCROLL SHOW HIDE BUTTON
function resizeFigure() {
    let footerHeight = document.querySelector('footer').offsetHeight,
        topper = document.querySelector('footer top'),
        html = document.documentElement;

    if (html.clientHeight === html.scrollHeight || html.clientHeight >= html.scrollHeight - footerHeight) {
        topper.classList.add('opacity');
        setTimeout(function() {
            topper.classList.add('place');
        }, 100);
    } else {
        topper.classList.remove('place');
        setTimeout(function() {
            topper.classList.remove('opacity');
        }, 100);
    }
}
resizeFigure();