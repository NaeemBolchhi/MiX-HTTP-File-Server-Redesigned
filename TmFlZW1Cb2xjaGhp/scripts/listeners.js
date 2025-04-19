// MENU CLICK
document.addEventListener('click', function(event) {
    let target = event.target;

    if (target.classList.contains('menu') || target.parentNode.classList.contains('menu') || target.parentNode.parentNode.classList.contains('menu')) {
        quickTop();
        menuClick();
    }
});

// BACKDROP CLICK
document.addEventListener('click', function(event) {
    let target = event.target;

    if (target.tagName.match(/backdrop/i)) {
        document.querySelector('.menu').click();
    }
});

/*
back.addEventListener('click', function() {
    menu.click();
});
*/

// THEME SWITCH CLICK
document.addEventListener('click', function(event) {
    let target = event.target;

    if (target.tagName.match(/btn/i) && target.className.match(/d[au][ws][nk]/i)) {
        themeClick(target);
    } else if (target.parentNode.tagName.match(/btn/i) && target.parentNode.className.match(/d[au][ws][nk]/i)) {
        themeClick(target.parentNode);
    } else {return;}
});

// UPLOAD CLICKS
document.addEventListener('click', function(event) {
    let target = event.target,
        newSend = document.querySelector('.send-files'),
        oldUp = document.querySelector('#fil');

    if (target.classList.contains('select-files') || target.parentNode.classList.contains('select-files')) {
        if (!newSend.classList.contains('send') && !newSend.classList.contains('hide')) {return;}
        oldUp.click();
    }
});

document.addEventListener('change', function(event) {
    let target = event.target;

    if (target.id === 'fil') {
        fileSelected();
    }
});

document.addEventListener('click', function(event) {
    let target = event.target;

    if (target.classList.contains('send-files') || target.parentNode.classList.contains('send-files')) {
        if (target.classList.contains('send') || target.parentNode.classList.contains('send')) {
            sendUpload();
        }
    }
});

/*
newUp.addEventListener('click', function() {
    if (!newSend.classList.contains('send') && !newSend.classList.contains('hide')) {return;}
    oldUp.click();
});

oldUp.addEventListener('change', function() {
    newUp.querySelector('span').innerText = 'File: ' + oldUp.value.replace(/^.*[\\\/]/, '');
    newUp.classList.remove('grow');
    newSend.classList.remove('hide');
    newSend.classList.add('send');
});

newSend.addEventListener('click', function() {
    if (!newSend.classList.contains('send')) {return;}
    progress.innerHTML = '';
    oldSend.click();
    newSend.classList.remove('send');
    newSend.classList.add('progress');
});
*/

// PROGRESS OBSERVER
(function() {
    let progress = document.querySelector('#progress');

    const pObserver = new MutationObserver(function() {
        progressObserve();
    });

    pObserver.observe(progress, {childList: true, subtree: true});
})();

// FOLDER-FILE HIDE/SHOW
document.addEventListener('click', function(event) {
    let target = event.target;

    if (target.classList.contains('folder-view')) {
        contentShow(target, 'folder');
    } else if (target.parentNode.classList.contains('folder-view')) {
        contentShow(target.parentNode, 'folder');
    }

    if (target.classList.contains('file-view')) {
        contentShow(target, 'file');
    } else if (target.parentNode.classList.contains('file-view')) {
        contentShow(target.parentNode, 'file');
    }
});

// SELECTION PC/MOBILE
document.addEventListener('click', function(event) {
    let target = event.target;

    if (target.classList.contains('platform')) {
        toggleClose(target);
    }
    if (target.classList.contains('base') && target.parentNode.classList.contains('platform')) {
        toggleClose(target.parentNode);
    }
    if (target.parentNode.classList.contains('base') && target.parentNode.parentNode.classList.contains('platform')) {
        toggleClose(target.parentNode.parentNode);
    }

    if (target.classList.contains('player')) {
        toggleClose(target);
    }
    if (target.classList.contains('base') && target.parentNode.classList.contains('player')) {
        toggleClose(target.parentNode);
    }
    if (target.parentNode.classList.contains('base') && target.parentNode.parentNode.classList.contains('player')) {
        toggleClose(target.parentNode.parentNode);
    }

    if (target.classList.contains('sel-mobile') || target.classList.contains('sel-pc')) {
        mobilePC(target);
    }
    if (target.parentNode.classList.contains('sel-mobile') || target.parentNode.classList.contains('sel-pc')) {
        mobilePC(target.parentNode);
    }

    let matchList = ['sel-none','sel-potplayer','sel-vlcplayer','sel-xplayer','sel-mxplayer','sel-mxplayerpro'];

    for (let x = 0; x < matchList.length; x++) {
        if (target.classList.contains(matchList[x])) {
            selPlayer(target);
        }
        if (target.parentNode.classList.contains(matchList[x])) {
            selPlayer(target.parentNode);
        }
    }
});

// PREVIEW PREVIOUS/NEXT
document.addEventListener('click', function(event) {
    let target = event.target,
        prev = document.querySelector('preview');

    if (target.classList.contains('data-media')) {
        event.preventDefault();
        reAnchor(target);
    } else if (target.parentNode.classList.contains('data-media')) {
        event.preventDefault();
        reAnchor(target.parentNode);
    }

    if (target.classList.contains('data-graphic')) {
        event.preventDefault();
        reAnchor2(target);
    } else if (target.parentNode.classList.contains('data-graphic')) {
        event.preventDefault();
        reAnchor2(target.parentNode);
    }

    if (target.tagName.match(/curtains/i)) {
        prev.classList.add('hide');
        document.body.classList.remove('no-scroll-kai');
        setTimeout(function() {
            prev.classList.add('none');
        }, 100);
    }

    if (target.classList.contains('prev-image') || target.parentNode.classList.contains('prev-image')) {
        changePreview(-1);
    }

    if (target.classList.contains('next-image') || target.parentNode.classList.contains('next-image')) {
        changePreview(1);
    }
});

// KEYBOARD SHORTCUTS
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        try {
            document.querySelector('preview:not(.hide):not(.none):not(.no-prev) .prev-image').click();
        } catch {}
    }
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        try {
            document.querySelector('preview:not(.hide):not(.none):not(.no-next) .next-image').click();
        } catch {}
    }
    if (event.key === "Escape") {
        try {
            document.querySelector('preview:not(.hide):not(.none):not(.no-prev) curtains').click();
        } catch {}
        try {
            document.querySelector('header section.main .menu.aight').click();
        } catch {}
    }
});

// HIDE/SHOW SCROLL ARROW
window.addEventListener('scroll', function() {
    resizeFigure();
});
window.addEventListener('resize', function() {
    resizeFigure();
});

// CLICK ARROW TOP
document.addEventListener('click', function(event) {
    let target = event.target;

    if (target.classList.contains('fa-arrow-up') && target.parentNode.tagName.match(/top/i)) {
        smoothTop();
    }
});

// DIRECTORY SCROLL
document.querySelector('.directory').addEventListener('scroll', function() {
    scrollShades();
});

/*
document.addEventListener('scroll', function(event) {
    let target = event.target;

    if (target.classList.contains('directory')) {
        scrollShades();
    }
});*/

// RUN FOR 5 SECONDS
(function() {
    function for5sec() {
        scrollShades();
        heightFix();
        moveSize();
        setAClass();
    }
    const timer = setInterval(for5sec, 50);
    setTimeout(function() {
        clearInterval(timer);
    }, 5000);
})();