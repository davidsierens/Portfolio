let menu = document.querySelector('.menu');
let items = document.querySelectorAll('.menu-item');
let clones = [];
let disableScroll = false;
let scrollheight = 0;
let scrollpos = 0;
let clonesHeight = 0;


function getScrollPos(){
    return menu. scrollTop; // Amount window scrolled
}

function setScrollPos(pos){
    menu.scrollTop = pos;
}

function getClonesHeight(){
    clonesHeight = 0;

    clones.forEach(clone => {
        clonesHeight += clone.offsetHeight; // offsetHeight returns height of element
    })

    return clonesHeight;
}

// Recalculate dimensions when screen is resized
function reCalc(){
    scrollpos = getScrollPos();
    scrollheight = menu.scrollHeight; // Height of an elements content, including content not visable on the screen
    clonesHeight = getClonesHeight();

    if(scrollpos <= 0){
        setScrollPos(1); // Initial set at 1px to enable upwards scrolling
    }
}

function scrollUpdate(){
    if(!disableScroll){
        scrollpos = getScrollPos();
        if(clonesHeight + scrollpos >= scrollheight){
            // Scroll back to top when we reach bottom
            setScrollPos(1);
            disableScroll = true;
        }else if (scrollpos <= 0){
            // Scroll to bottom when we reach the top
            setScrollPos(scrollheight - clonesHeight);
            disableScroll = true;
        }
    }
    if(disableScroll){
        // Disable scroll-jumping for a short period to avoid a flickering

        window.setTimeout(()=>{
            disableScroll = false;
        }, 40);
    }
}

function onLoad(){
    items.forEach(item => {
        const clone = item.cloneNode(true);
        menu.appendChild(clone);
        clone.classList.add('js-clone');
    });

    clones = menu.querySelectorAll('js.clone');

    reCalc();

    menu.addEventListener('scroll', () =>{
        window.requestAnimationFrame(scrollUpdate);
    }, false);

    window.addEventListener('resize', () => {
        window.requestAnimationFrame(reCalc);
    }, false)
}

window.onload = onLoad();



// infinitescroll() is called on the element that surrounds 
// the items you will be loading more of
$('#content').menu({

    navSelector  : "div.navigation",            
                   // selector for the paged navigation (it will be hidden)
    nextSelector : "div.navigation a:first",    
                   // selector for the NEXT link (to page 2)
    itemSelector : "#content div.post"          
                   // selector for all items you'll retrieve
  });