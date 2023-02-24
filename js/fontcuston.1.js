<<<<<<< HEAD
function randomChar() {
    var pool = "abcdefghijklmnopqrstuvwxyz0123456789";
    var arr = pool.split('');
    return arr[Math.floor(Math.random()*arr.length)]
}
function unmouseeheel(e) {
    e.stopPropagation();
    e.preventDefault();
    return false;
}
function getoffset(el){
    var box = el.getBoundingClientRect();
    return {
        top: box.top + window.pageYOffset - document.documentElement.clientTop,
        left: box.left + window.pageXOffset - document.documentElement.clientLeft
    }
}
function fadeIn(el,n,s,fn){
    var start = window.performance.now();
    var icur = Math.round(el.style.opacity) || 0;
    var speed = n-icur;
    (function tick(){
        var now =  window.performance.now() - start;
        //等速
        el.style.opacity = icur + ((now / s).toFixed(2)) * speed;
        if(now < s){
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 24);
        }else{
           if(fn){
               fn();
           }
        }
    })();
}
function random(option){
    var maxNum = option.t || 5;  
    var minNum = option.i || 1;  
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;  
}
function xmlHttpRequest(obj) {
  var type = obj.type || 'POST';  
  return new Promise(function(resolve, reject){
    var fd = new FormData(obj.el);
    var xhr = new XMLHttpRequest();
    xhr.open(type, obj.url,true);
    xhr.onload = function(){resolve(JSON.parse(xhr.responseText))};
    xhr.onerror = function(){reject(JSON.parse(xhr.statusText))};
    xhr.send(fd);
  });
};
function mousemoveMeterorite() {
    var obj = document.querySelectorAll('.space')[0];
    if(!obj){
        return;
    }
    obj.addEventListener('mousemove', function (e) {
        var obj = this ;
        window.requestAnimationFrame(function(){
           var moveFactor = 2;
           var mouseX = e.pageX;
           var mouseY = e.pageY;
           var windowWidth = document.body.clientWidth;
           var windowHeight = document.body.clientHeight;
           var percentX = ((0-((mouseX/windowWidth)*moveFactor)-(moveFactor/2)+moveFactor)/2).toFixed(2);
           var percentY = ((0-((mouseY/windowHeight)*moveFactor)-(moveFactor/2)+moveFactor)/2).toFixed(2);
           obj.style.transform = 'rotateX(' + percentY + 'deg' + ') rotateY(' + percentX + 'deg' + ') translateZ(0)';
       });
    })
}
function menu() {
    document.querySelectorAll('.menu')[0].addEventListener('click',function(){
        menufn(this);
    });
}
function menufn(obj) {
    var menuopen = obj.nextElementSibling;
    var linkAll = menuopen.querySelectorAll('a');
    var content = menuopen.querySelectorAll('.content')[0];
    init();
    function init() {
        for(var i=0;i<linkAll.length;i++){
            linkAll[i].style.opacity = '';
        }
        content.style.opacity ='0';
        document.addEventListener('mousewheel', unmouseeheel);
    }
    if(obj.classList.contains('active')){
        obj.classList.remove('active');
        init();
        fadeIn(menuopen,0,300,function(){
            menuopen.style.visibility = 'hidden';
            document.removeEventListener('mousewheel', unmouseeheel);
        });
    }else{
        menuopen.style.visibility = 'visible';
        fadeIn(menuopen,1,500,function() {
            obj.classList.add('active');
            content.style.opacity = '1';
            setTimeout(function(){
                //文字動畫
                (function time(i) {
                    if(i>linkAll.length-1){
                        return;
                    }
                    setTimeout(function(){
                        shuffleLetters(linkAll[i]);
                        time(i+1);
                    }, 100);
                })(0);
            }, 300);
        });
    }
}
function menuActive() {
    var gotoObj = document.querySelectorAll('.indexHeader .menuopen .goto');
    if(!gotoObj){
        return;
    }
    var fromTop = document.documentElement.scrollTop||document.body.scrollTop;
    for(var i=0; i<gotoObj.length;i++){
        gotoObj[i].classList.remove('active');
        var id = document.getElementById(gotoObj[i].getAttribute('href').slice(1));
        if(id.offsetTop < fromTop+10 && id.offsetTop+id.offsetHeight> fromTop){
            gotoObj[i].classList.add('active');
        }
    }
}
function gotoObj() {
    var gotos = document.querySelectorAll('.goto');
    var menu = document.querySelectorAll('.menu')[0];
    var timer = null;
    var isScroll = true;
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    for(var i=0;i<gotos.length;i++){
        gotos[i].addEventListener('click',function (e) {
            var self = this;
            e.preventDefault();
            //是否關閉nav
            if(menu.classList.contains('active')){
                menufn(menu);
            }

            cancelAnimationFrame(timer);
            timer = requestAnimationFrame(Animation);
            function Animation(){
                var number = 8;
                var scollTop = document.documentElement.scrollTop || document.body.scrollTop;
                var offsetTop = document.getElementById(self.getAttribute('href').slice(1)).offsetTop;
                var itarget = scollTop-offsetTop;
                var ispeed = itarget<0?Math.ceil(-itarget/number):Math.floor(-itarget/number);
                if(Math.abs(itarget)<1){
                    document.documentElement.scrollTop=document.body.scrollTop = offsetTop;
                }else{
                    document.documentElement.scrollTop=document.body.scrollTop = scollTop+ispeed;
                    timer = requestAnimationFrame(Animation);
                }
            };

            // clearInterval(timer);
            // timer = setInterval(function(){
            //     var number = 8;
            //     var scollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //     var offsetTop = document.getElementById(self.getAttribute('href').slice(1)).offsetTop;
            //     var itarget = scollTop-offsetTop;
            //     var ispeed = itarget<0?Math.ceil(-itarget/number):Math.floor(-itarget/number);
            //     if(Math.abs(itarget)<1){
            //         clearInterval(timer);
            //         document.documentElement.scrollTop=document.body.scrollTop = offsetTop;
            //     }else{
            //         isScroll = true;
            //         document.documentElement.scrollTop=document.body.scrollTop = scollTop+ispeed;
            //     }
            // },60);

        })
    }
    //判斷是否有滾動
    document.addEventListener("wheel",function (ev) {
        cancelAnimationFrame(timer);
    });
    document.addEventListener('touchstart',function (ev) {
        cancelAnimationFrame(timer);
    });

    // document.addEventListener("wheel",function (ev) {
    //     if(!isScroll){
    //         clearInterval(timer);
    //     }
    //     isScroll = false;
    // });
}
function shuffleLetters (obj) {
    if(obj.getAttribute('animated')){
        return true;
    }
    obj.setAttribute('animated','true');
    var str = obj.textContent.split(''),
        len = str.length;
    obj.textContent ='';
    obj.style.opacity = '1';
    (function shuffle(start){
        if(start>len){
            obj.setAttribute('animated','');
            return;
        }
        var strCopy = str.slice(0); // Fresh copy of the string
        for(var i=Math.max(start,0);i<len;i++){
            if( i < start+5){
                strCopy[i] = randomChar();
            }else{
                strCopy[i] = "";
            }
            // console.log('i '+ i);
            // console.log('start '+ start);
            // console.log('start+5 '+ (start*1+5*1));
            // console.log('letters '+ letters[i]);
            // console.log('strCopy '+ strCopy[letters[i]]);
        }
        // console.log(start+'次的循環 '+ strCopy.join(""));

        obj.textContent = strCopy.join("");
        setTimeout(function(){
            shuffle(start+1);
        },1000/30);
    })(-5);
}
function hoverText(obj) {
    var items =  document.querySelectorAll(obj.el);
    for(var i=0;i<items.length;i++){
        soundHover(items[i]);
        items[i].addEventListener('mouseover',obj.fn)
    }
}
function hoverParallx(){
    var hoverParallax = document.querySelectorAll('.hoverParallax');
    for(var i=0;i<hoverParallax.length;i++){
        var perspective = '500px',
            d =20,
            w = hoverParallax[i].offsetWidth,
            h = hoverParallax[i].offsetHeight,
            mw = w/2,
            mh = h/2;
        soundHover(hoverParallax[i]);    
        hoverParallax[i].addEventListener('mouseenter',function(e){
            var obj = this;
            obj.style.transition='.2s';
            var star = window.performance.now();
            (function time(argument) {
                var now = window.performance.now()-star;
                // console.log(now);
                if(now<200){
                    (window.requestAnimationFrame && requestAnimationFrame(time)) || setTimeout(time, 24);
                }else{
                    obj.style.transition='0s';
                }
            })();
        })
        hoverParallax[i].addEventListener('mousemove',function(e){
            sway(e,this);
        })
        hoverParallax[i].addEventListener('mouseleave',function(e){
            swayLeave(this);
        })
    }
    function sway(e,obj){
        var cursPosX = e.pageX - getoffset(obj).left,
            cursPosY = e.pageY - getoffset(obj).top,
            cursCenterX = mw - cursPosX,
            cursCenterY = mh - cursPosY;
        obj.style.transform='perspective(' + perspective + ') rotateX(' + (cursCenterY / d) + 'deg) rotateY(' + -(cursCenterX / d) + 'deg)';
    }
    function swayLeave(obj){
        obj.style.transform='rotateX(0deg) rotateY(0deg)';
        obj.style.transition='.6s';
    }
}
function seadEmail(argument) {
    document.querySelectorAll('#seadEmail')[0].addEventListener('submit', function (event) {
        event.preventDefault();
        var self = this;
        var email = self.querySelectorAll('#userMail')[0];
        var phone = self.querySelectorAll('#userPhone')[0];
        var number = self.querySelectorAll('#userNumber')[0];
        var name = self.querySelectorAll('#userName')[0];
        var text = self.querySelectorAll('#userText')[0];
        var error = self.querySelectorAll('.error')[0];
        var errortext=[];
        namefn(name);
        phonefn(phone);
        Emailfn(email);
        textfn(text);
        captchafn(number);
        function namefn(el) {
            el.style.borderColor='rgba(255,255,255,.5)';
            if(!el.value){
                el.style.borderColor='#0f8cee';
                errortext.push('名稱未填寫');
                return;
            }
            var phoneRegxp = /^[\u4e00-\u9fa5-A-Z-a-z]*$/; //中英文;
            if(!phoneRegxp.test(el.value)){
                el.style.borderColor='#0f8cee';
                errortext.push('名稱格式錯誤');
            }
        }
        function textfn(el) {
            el.style.borderColor='rgba(255,255,255,.5)';
            if(!el.value){
                el.style.borderColor='#0f8cee';
                errortext.push('敘述未填寫');
                return;
            }
            // var phoneRegxp = /^{3,300}$/; //中英文;
            // if(!phoneRegxp.test(el.value)){
            //     el.style.borderColor='#0f8cee';
            //     errortext.push('敘述格式錯誤');
            // }
        }
        function phonefn(el) {
            el.style.borderColor='rgba(255,255,255,.5)';
            if(!el.value){
                el.style.borderColor='#0f8cee';
                errortext.push('電話未填寫');
                return;
            }
            // var phoneRegxp = /^09[0-9]{2}-[0-9]{6}$/; //格式需為09XX-XXXXXX
            // var phoneRegxp = /(09[0-9]{2}-[0-9]{3}-[0-9]{3})|([0-9]{2}-[0-9]{6,8})$/; //範例:0912-111-111或06-7211111;
            var phoneRegxp = /^[0-9]{2}-[0-9]{6,8}$/; //範例:06-7211111;
            if(el.value.search(phoneRegxp)==-1){
                el.style.borderColor='#0f8cee';
                errortext.push('電話格式錯誤');
            }
        }
        function Emailfn(el) {
            el.style.borderColor='rgba(255,255,255,.5)';
            if(!el.value){
                el.style.borderColor='#0f8cee';
                errortext.push('信箱未填寫');
                return;
            }
            var emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
            if(el.value.search(emailRule)==-1){
                el.style.borderColor='#0f8cee';
                errortext.push('信箱格式錯誤');
            }
        }                  
        function captchafn(el) {
            el.style.borderColor='rgba(255,255,255,.5)';
            if(!el.value){
                el.style.borderColor='#0f8cee';
                errortext.push('驗證碼未填寫');
                sead();
                return;
            }

            //get
			requestServerCall({
		    	url:"./php/transfer.php",
		    	data: {
		    		act: "ifCaptcha",
		    		userNumber: el.value
		        },
		    	callback : function(data){
					if(!data.Result) {
	                    el.style.borderColor='#0f8cee';
	                    errortext.push('驗證碼錯誤');
	                }
	                sead();
		    	}
		    });

			//post
            // xmlHttpRequest({url:'./php/transfer.php?act=ifCaptcha',el:self}).then(function(data){
            // 	alert(data)
            //     if(!data.Result) {
            //         el.style.borderColor='#0f8cee';
            //         errortext.push('驗證碼錯誤');
            //     }
            //     sead();
            // })
        }
        function sead(argument) {
            if(errortext.length){
                error.innerHTML= errortext.join(',');
                errortext.length = 0;
                error.style.opacity='1';
                return;
            }
            error.innerHTML='資料傳輸中';

            //get
            requestServerCall({
		    	url:"./php/transfer.php",
		    	data: {
		    		act: "FormEmail",
		    		userName: name.value,
		    		userMail: email.value,
		    		userText: text.value,
		    		userPhone: phone.value
		        },
		    	callback : function(data){
	                var input = self.querySelectorAll('input');
	                var textarea = self.querySelectorAll('textarea');
	                error.style.opacity='1';
	                if(data.Result){
	                    for(var i=0; i<input.length;i++){
	                        value(input[i])
	                    }
	                    for(var i=0; i<textarea.length;i++){
	                        value(textarea[i])
	                    }
	                    function value(obj) {
	                        obj.value='';
	                    }
	                    error.innerHTML='信件已寄出';
	                    setTimeout(function(argument) {
	                        error.style.opacity='0';
	                        error.innerHTML='';
	                    },3000)
	                }else{
	                    error.innerHTML = '未發送請重寄或連絡我們(電話:02-2641-7909)';
	                }
		    	}
		    });

            //post	
            // xmlHttpRequest({url:'./php/transfer.php?act=FormEmail',el:self}).then(function(data){
            //     var Result = data.Result;
            //     var input = self.querySelectorAll('input');
            //     var textarea = self.querySelectorAll('textarea');
            //     error.style.opacity='1';
            //     if(Result){
            //         for(var i=0; i<input.length;i++){
            //             value(input[i])
            //         }
            //         for(var i=0; i<textarea.length;i++){
            //             value(textarea[i])
            //         }
            //         function value(obj) {
            //             obj.value='';
            //         }
            //         error.innerHTML='信件已寄出';
            //         setTimeout(function(argument) {
            //             error.style.opacity='0';
            //             error.innerHTML='';
            //         },3000)
            //     }else{
            //         error.innerHTML = '未發送請重寄或連絡我們(電話:02-2641-7909)';
            //     }
            // })
        }
    })
}
function getParam(el) {
    document.getElementById('imgCaptcha').src = './php/captchaPhp.php?'+Math.random();
}
function soundBg() {
    var url = "./audio/02.mp3",
        song = new Audio(url),
        obj = document.querySelectorAll('.indexHeader .sound')[0];
    song.play();
    song.loop=true;
    song.volume=0.1;
    obj.addEventListener('click',function(){
        if(this.classList.contains('active')){
            this.classList.remove('active');
            song.pause();
        }else{
            this.classList.add('active');
            song.play();
        }
    })
}
function soundHover(obj){
    var url = "./audio/text.mp3",
        song = new Audio(url);
        song.volume=0.1;
    obj.addEventListener('mouseenter',function(){
        song.play();
    })
}
function zoom(argument) {
    var zoom = document.querySelectorAll('.zoom')[0];
    zoom.addEventListener('click',function () {
        if (!document.fullscreenElement &&  !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
            zoom.classList.add('active');
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
            zoom.classList.remove('active');
        }
    })
}
function scrollLoad() {
    var scrollAnimation = document.querySelectorAll('.scrollAnimation');
    for(var i=0;i<scrollAnimation.length;i++){
        var scrollY = window.scrollY || window.pageYOffset;//IE
        var slideInAt = (scrollY + window.innerHeight) - scrollAnimation[i].offsetHeight/2;
        var offsetTop = getoffset(scrollAnimation[i]).top;
        var vBottom = offsetTop + scrollAnimation[i].offsetHeight ;
        var isShow = slideInAt > offsetTop;
        var isScroll = window.scrollY < vBottom;
        if(isShow){
            scrollAnimation[i].classList.add('active');
        }
    }
}
function showLoad() {
    var scrollAnimation = document.querySelectorAll('.scrollAnimation');
    for(var i=0;i<scrollAnimation.length;i++){
        scrollAnimation[i].classList.add('active');
    }
}
function scrollBgMeteorite(argument) {
    // var contentHeight =  document.body.scrollHeight-(document.body.clientHeight/2);
    var contentHeight =  document.body.scrollHeight-document.body.clientHeight;
    var cameraPerspective = 6000;
    var ratio = contentHeight - window.pageYOffset;
    var value = ((cameraPerspective / contentHeight )*ratio);
    var camera = document.querySelectorAll('.camera')[0];
    camera.style.perspective = value + 'px';
    // console.log('contentHeight'+contentHeight);
    // console.log('document.body.clientHeight'+document.body.clientHeight);
    // console.log('ratio'+ratio);
    // console.log('value'+value);
    // console.log(document.body.clientHeight);
    // console.log(window.pageYOffset);
    // if(value > 0){
    //     camera.style.perspective = value + 'px';
    // }else{
    //     camera.style.perspective = '1px';
    // }
    // console.log('document.body.scrollHeight '+document.body.scrollHeight);
    // console.log('document.body.clientHeight '+document.body.clientHeight/2);
    // console.log('contentHeight '+contentHeight);
    // console.log('window.pageYOffset '+window.pageYOffset);
    // console.log('cameraPerspective '+cameraPerspective);
    // console.log('cameraPerspective / contentHeight '+cameraPerspective / contentHeight);
    // console.log('ratio '+ratio);
}
function scrollShowChart(argument) {
    var slideInAt = (window.innerHeight/10) - window.scrollY;
    var scroll = document.querySelectorAll('.indexHeader .scroll')[0];
    if(slideInAt>1){
        scroll.style.opacity = 1;
    }else{
        scroll.style.opacity = 0;
    }
}
function scrollTop(){
    document.documentElement.scrollTop=document.body.scrollTop = 0;
}

function start(){
    //top
    scrollTop();
    //去到該目標
    gotoObj();
    //寄信
    seadEmail();
    //開頭動畫
    document.querySelectorAll('body')[0].classList.remove('active');
    //選單
    menu();
    menuActive();
    document.addEventListener('scroll', function () {
        menuActive();
    })

    //不是手機
    if (!/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
        //文字滑過動畫
        hoverText({
            el:'.indexHeader .menuopen li a',
            fn: function(){
                shuffleLetters(this);
            }
        })
        hoverText({
            el:'.indexService li',
            fn: function(){
                shuffleLetters(this.querySelectorAll('h3')[0]);
            }
        })
        hoverText({
            el:'.indexCooperation li',
            fn: function(){
                shuffleLetters(this.querySelectorAll('p')[0]);
            }
        })
        hoverText({
            el:'.indexFooter li a',
            fn: function(){
                shuffleLetters(this);
            }
        })
        //團隊視差
        hoverParallx();
        //背景聲音
        soundBg();
        //滑過聲音
        hoverText({
            el:'.indexCase .items a'
        });
        //全螢幕
        zoom();
        //移動隕石視差
        mousemoveMeterorite();
        document.addEventListener('scroll', function () {
            //滾動出現項目
            scrollLoad();
            //滾動隕石視差
            scrollBgMeteorite();
            //下滑圖示顯示
            scrollShowChart();
        })
    }else{
        //隱藏聲音圖示
        var soundNav = document.querySelectorAll('.indexHeader .soundNav')[0];
        soundNav.style.display = 'none';
        //出現項目
        showLoad();
    };
}
function caseLightbox(id){
    requestServerCall({
        url:"./php/transfer.php",
        data: {
            act: "caseOne",
            id: id
        },
        callback : function(data){
            var json = data.Data[0];
            var body = document.body;
            var obj = document.createElement('div');
            obj.classList.add('lightbox');
            obj.innerHTML ='<div class="box">\
               <div class="img"><img src="'+json.Cover1+'" alt=""></div>\
               <div class="lightboxTitle"><h4>'+json.Pname+'</h4></div>\
               <div class="lightboxText"><p>'+json.Content+'</p></div>\
               <div class="button button_color">關閉視窗</div>\
            </div>';
            body.appendChild(obj);
            obj.querySelectorAll('.button')[0].addEventListener('click',function(){
                obj.style.opacity='1';
                fadeIn(obj,0,400,function () {
                    obj.remove();
                })
            });
        }
    })
}
function param(obj) {
    var pairs = [];
    for(var name in obj) {
        var pair = encodeURIComponent(name) + '=' + 
                   encodeURIComponent(obj[name]);
        pairs.push(pair.replace('/%20/g', '+'));
    }
    return pairs.join('&');
}
function requestServerCall(option) {

	var body = document.body;
	var script = document.createElement("script");
	var data = option.data || {};
	var callbackName = 'fn' + requestServerCall.jsc ++;
	var url = option.url + '?' + param(data) + '&callback=' + callbackName;
	// 建立暫時的函式
	window[callbackName] = function (json){			
		option.callback(json);
	}

	script.type = 'text/javascript';
	script.setAttribute("src", url);
	body.appendChild(script);
    body.removeChild(script);

	// body.removeChild(script);
	// 跨瀏覽器處理 script 下載完成後的事件
    // script.onload = script.onreadystatechange = function() {
    //     if (!this.readyState ||
    //         this.readyState === "loaded" || 
    //         this.readyState === "complete") {
    //         this.onload = this.onreadystatechange = null;
    //        body.removeChild(this);
    //        // script 下載並執行完後移除暫時的函式
    //         window.callbackName = undefined;
    //         delete window.callbackName;
    //     }
    // };
}
requestServerCall.jsc = new Date().getTime();
window.onload=function() {start();} 








=======
function randomChar() {
    var pool = "abcdefghijklmnopqrstuvwxyz0123456789";
    var arr = pool.split('');
    return arr[Math.floor(Math.random() * arr.length)]
}

function unmouseeheel(e) {
    e.stopPropagation();
    e.preventDefault();
    return false;
}

function getoffset(el) {
    var box = el.getBoundingClientRect();
    return {
        top: box.top + window.pageYOffset - document.documentElement.clientTop,
        left: box.left + window.pageXOffset - document.documentElement.clientLeft
    }
}

function fadeIn(el, n, s, fn) {
    var start = window.performance.now();
    var icur = Math.round(el.style.opacity) || 0;
    var speed = n - icur;
    (function tick() {
        var now = window.performance.now() - start;
        //等速
        el.style.opacity = icur + ((now / s).toFixed(2)) * speed;
        if (now < s) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 24);
        } else {
            if (fn) {
                fn();
            }
        }
    })();
}

function random(option) {
    var maxNum = option.t || 5;
    var minNum = option.i || 1;
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

function xmlHttpRequest(obj) {
    var type = obj.type || 'POST';
    return new Promise(function(resolve, reject) {
        var fd = new FormData(obj.el);
        var xhr = new XMLHttpRequest();
        xhr.open(type, obj.url, true);
        xhr.onload = function() { resolve(JSON.parse(xhr.responseText)) };
        xhr.onerror = function() { reject(JSON.parse(xhr.statusText)) };
        xhr.send(fd);
    });
};

function mousemoveMeterorite() {
    var obj = document.querySelectorAll('.space')[0];
    if (!obj) {
        return;
    }
    obj.addEventListener('mousemove', function(e) {
        var obj = this;
        window.requestAnimationFrame(function() {
            var moveFactor = 2;
            var mouseX = e.pageX;
            var mouseY = e.pageY;
            var windowWidth = document.body.clientWidth;
            var windowHeight = document.body.clientHeight;
            var percentX = ((0 - ((mouseX / windowWidth) * moveFactor) - (moveFactor / 2) + moveFactor) / 2).toFixed(2);
            var percentY = ((0 - ((mouseY / windowHeight) * moveFactor) - (moveFactor / 2) + moveFactor) / 2).toFixed(2);
            obj.style.transform = 'rotateX(' + percentY + 'deg' + ') rotateY(' + percentX + 'deg' + ') translateZ(0)';
        });
    })
}

function menu() {
    document.querySelectorAll('.menu')[0].addEventListener('click', function() {
        menufn(this);
    });
}

function menufn(obj) {
    var menuopen = obj.nextElementSibling;
    var linkAll = menuopen.querySelectorAll('a');
    var content = menuopen.querySelectorAll('.content')[0];
    init();

    function init() {
        for (var i = 0; i < linkAll.length; i++) {
            linkAll[i].style.opacity = '';
        }
        content.style.opacity = '0';
        document.addEventListener('mousewheel', unmouseeheel);
    }
    if (obj.classList.contains('active')) {
        obj.classList.remove('active');
        init();
        fadeIn(menuopen, 0, 300, function() {
            menuopen.style.visibility = 'hidden';
            document.removeEventListener('mousewheel', unmouseeheel);
        });
    } else {
        menuopen.style.visibility = 'visible';
        fadeIn(menuopen, 1, 500, function() {
            obj.classList.add('active');
            content.style.opacity = '1';
            setTimeout(function() {
                //文字動畫
                (function time(i) {
                    if (i > linkAll.length - 1) {
                        return;
                    }
                    setTimeout(function() {
                        shuffleLetters(linkAll[i]);
                        time(i + 1);
                    }, 100);
                })(0);
            }, 300);
        });
    }
}

function menuActive() {
    var gotoObj = document.querySelectorAll('.indexHeader .menuopen .goto');
    if (!gotoObj) {
        return;
    }
    var fromTop = document.documentElement.scrollTop || document.body.scrollTop;
    for (var i = 0; i < gotoObj.length; i++) {
        gotoObj[i].classList.remove('active');
        var id = document.getElementById(gotoObj[i].getAttribute('href').slice(1));
        if (id.offsetTop < fromTop + 10 && id.offsetTop + id.offsetHeight > fromTop) {
            gotoObj[i].classList.add('active');
        }
    }
}

function gotoObj() {
    var gotos = document.querySelectorAll('.goto');
    var menu = document.querySelectorAll('.menu')[0];
    var timer = null;
    var isScroll = true;
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    for (var i = 0; i < gotos.length; i++) {
        gotos[i].addEventListener('click', function(e) {
            var self = this;
            e.preventDefault();
            //是否關閉nav
            if (menu.classList.contains('active')) {
                menufn(menu);
            }

            cancelAnimationFrame(timer);
            timer = requestAnimationFrame(Animation);

            function Animation() {
                var number = 8;
                var scollTop = document.documentElement.scrollTop || document.body.scrollTop;
                var offsetTop = document.getElementById(self.getAttribute('href').slice(1)).offsetTop;
                var itarget = scollTop - offsetTop;
                var ispeed = itarget < 0 ? Math.ceil(-itarget / number) : Math.floor(-itarget / number);
                if (Math.abs(itarget) < 1) {
                    document.documentElement.scrollTop = document.body.scrollTop = offsetTop;
                } else {
                    document.documentElement.scrollTop = document.body.scrollTop = scollTop + ispeed;
                    timer = requestAnimationFrame(Animation);
                }
            };

            // clearInterval(timer);
            // timer = setInterval(function(){
            //     var number = 8;
            //     var scollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //     var offsetTop = document.getElementById(self.getAttribute('href').slice(1)).offsetTop;
            //     var itarget = scollTop-offsetTop;
            //     var ispeed = itarget<0?Math.ceil(-itarget/number):Math.floor(-itarget/number);
            //     if(Math.abs(itarget)<1){
            //         clearInterval(timer);
            //         document.documentElement.scrollTop=document.body.scrollTop = offsetTop;
            //     }else{
            //         isScroll = true;
            //         document.documentElement.scrollTop=document.body.scrollTop = scollTop+ispeed;
            //     }
            // },60);

        })
    }
    //判斷是否有滾動
    document.addEventListener("wheel", function(ev) {
        cancelAnimationFrame(timer);
    });
    document.addEventListener('touchstart', function(ev) {
        cancelAnimationFrame(timer);
    });

    // document.addEventListener("wheel",function (ev) {
    //     if(!isScroll){
    //         clearInterval(timer);
    //     }
    //     isScroll = false;
    // });
}

function shuffleLetters(obj) {
    if (obj.getAttribute('animated')) {
        return true;
    }
    obj.setAttribute('animated', 'true');
    var str = obj.textContent.split(''),
        len = str.length;
    obj.textContent = '';
    obj.style.opacity = '1';
    (function shuffle(start) {
        if (start > len) {
            obj.setAttribute('animated', '');
            return;
        }
        var strCopy = str.slice(0); // Fresh copy of the string
        for (var i = Math.max(start, 0); i < len; i++) {
            if (i < start + 5) {
                strCopy[i] = randomChar();
            } else {
                strCopy[i] = "";
            }
            // console.log('i '+ i);
            // console.log('start '+ start);
            // console.log('start+5 '+ (start*1+5*1));
            // console.log('letters '+ letters[i]);
            // console.log('strCopy '+ strCopy[letters[i]]);
        }
        // console.log(start+'次的循環 '+ strCopy.join(""));

        obj.textContent = strCopy.join("");
        setTimeout(function() {
            shuffle(start + 1);
        }, 1000 / 30);
    })(-5);
}

function hoverText(obj) {
    var items = document.querySelectorAll(obj.el);
    for (var i = 0; i < items.length; i++) {
        soundHover(items[i]);
        items[i].addEventListener('mouseover', obj.fn)
    }
}

function hoverParallx() {
    var hoverParallax = document.querySelectorAll('.hoverParallax');
    for (var i = 0; i < hoverParallax.length; i++) {
        var perspective = '500px',
            d = 20,
            w = hoverParallax[i].offsetWidth,
            h = hoverParallax[i].offsetHeight,
            mw = w / 2,
            mh = h / 2;
        soundHover(hoverParallax[i]);
        hoverParallax[i].addEventListener('mouseenter', function(e) {
            var obj = this;
            obj.style.transition = '.2s';
            var star = window.performance.now();
            (function time(argument) {
                var now = window.performance.now() - star;
                // console.log(now);
                if (now < 200) {
                    (window.requestAnimationFrame && requestAnimationFrame(time)) || setTimeout(time, 24);
                } else {
                    obj.style.transition = '0s';
                }
            })();
        })
        hoverParallax[i].addEventListener('mousemove', function(e) {
            sway(e, this);
        })
        hoverParallax[i].addEventListener('mouseleave', function(e) {
            swayLeave(this);
        })
    }

    function sway(e, obj) {
        var cursPosX = e.pageX - getoffset(obj).left,
            cursPosY = e.pageY - getoffset(obj).top,
            cursCenterX = mw - cursPosX,
            cursCenterY = mh - cursPosY;
        obj.style.transform = 'perspective(' + perspective + ') rotateX(' + (cursCenterY / d) + 'deg) rotateY(' + -(cursCenterX / d) + 'deg)';
    }

    function swayLeave(obj) {
        obj.style.transform = 'rotateX(0deg) rotateY(0deg)';
        obj.style.transition = '.6s';
    }
}

function seadEmail(argument) {
    document.querySelectorAll('#seadEmail')[0].addEventListener('submit', function(event) {
        event.preventDefault();
        var self = this;
        var email = self.querySelectorAll('#userMail')[0];
        var phone = self.querySelectorAll('#userPhone')[0];
        var number = self.querySelectorAll('#userNumber')[0];
        var name = self.querySelectorAll('#userName')[0];
        var text = self.querySelectorAll('#userText')[0];
        var error = self.querySelectorAll('.error')[0];
        var errortext = [];
        namefn(name);
        phonefn(phone);
        Emailfn(email);
        textfn(text);
        captchafn(number);

        function namefn(el) {
            el.style.borderColor = 'rgba(255,255,255,.5)';
            if (!el.value) {
                el.style.borderColor = '#0f8cee';
                errortext.push('名稱未填寫');
                return;
            }
            var phoneRegxp = /^[\u4e00-\u9fa5-A-Z-a-z]*$/; //中英文;
            if (!phoneRegxp.test(el.value)) {
                el.style.borderColor = '#0f8cee';
                errortext.push('名稱格式錯誤');
            }
        }

        function textfn(el) {
            el.style.borderColor = 'rgba(255,255,255,.5)';
            if (!el.value) {
                el.style.borderColor = '#0f8cee';
                errortext.push('敘述未填寫');
                return;
            }
            // var phoneRegxp = /^{3,300}$/; //中英文;
            // if(!phoneRegxp.test(el.value)){
            //     el.style.borderColor='#0f8cee';
            //     errortext.push('敘述格式錯誤');
            // }
        }

        function phonefn(el) {
            el.style.borderColor = 'rgba(255,255,255,.5)';
            if (!el.value) {
                el.style.borderColor = '#0f8cee';
                errortext.push('電話未填寫');
                return;
            }
            // var phoneRegxp = /^09[0-9]{2}-[0-9]{6}$/; //格式需為09XX-XXXXXX
            // var phoneRegxp = /(09[0-9]{2}-[0-9]{3}-[0-9]{3})|([0-9]{2}-[0-9]{6,8})$/; //範例:0912-111-111或06-7211111;
            var phoneRegxp = /^[0-9]{2}-[0-9]{6,8}$/; //範例:06-7211111;
            if (el.value.search(phoneRegxp) == -1) {
                el.style.borderColor = '#0f8cee';
                errortext.push('電話格式錯誤');
            }
        }

        function Emailfn(el) {
            el.style.borderColor = 'rgba(255,255,255,.5)';
            if (!el.value) {
                el.style.borderColor = '#0f8cee';
                errortext.push('信箱未填寫');
                return;
            }
            var emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
            if (el.value.search(emailRule) == -1) {
                el.style.borderColor = '#0f8cee';
                errortext.push('信箱格式錯誤');
            }
        }

        function captchafn(el) {
            el.style.borderColor = 'rgba(255,255,255,.5)';
            if (!el.value) {
                el.style.borderColor = '#0f8cee';
                errortext.push('驗證碼未填寫');
                sead();
                return;
            }

            //get
            requestServerCall({
                url: "./php/transfer.php",
                data: {
                    act: "ifCaptcha",
                    userNumber: el.value
                },
                callback: function(data) {
                    if (!data.Result) {
                        el.style.borderColor = '#0f8cee';
                        errortext.push('驗證碼錯誤');
                    }
                    sead();
                }
            });

            //post
            // xmlHttpRequest({url:'./php/transfer.php?act=ifCaptcha',el:self}).then(function(data){
            // 	alert(data)
            //     if(!data.Result) {
            //         el.style.borderColor='#0f8cee';
            //         errortext.push('驗證碼錯誤');
            //     }
            //     sead();
            // })
        }

        function sead(argument) {
            if (errortext.length) {
                error.innerHTML = errortext.join(',');
                errortext.length = 0;
                error.style.opacity = '1';
                return;
            }
            error.innerHTML = '資料傳輸中';

            //get
            requestServerCall({
                url: "./php/transfer.php",
                data: {
                    act: "FormEmail",
                    userName: name.value,
                    userMail: email.value,
                    userText: text.value,
                    userPhone: phone.value
                },
                callback: function(data) {
                    var input = self.querySelectorAll('input');
                    var textarea = self.querySelectorAll('textarea');
                    error.style.opacity = '1';
                    if (data.Result) {
                        for (var i = 0; i < input.length; i++) {
                            value(input[i])
                        }
                        for (var i = 0; i < textarea.length; i++) {
                            value(textarea[i])
                        }

                        function value(obj) {
                            obj.value = '';
                        }
                        error.innerHTML = '信件已寄出';
                        setTimeout(function(argument) {
                            error.style.opacity = '0';
                            error.innerHTML = '';
                        }, 3000)
                    } else {
                        error.innerHTML = '未發送請重寄或連絡我們(電話:02-2641-7909)';
                    }
                }
            });

            //post	
            // xmlHttpRequest({url:'./php/transfer.php?act=FormEmail',el:self}).then(function(data){
            //     var Result = data.Result;
            //     var input = self.querySelectorAll('input');
            //     var textarea = self.querySelectorAll('textarea');
            //     error.style.opacity='1';
            //     if(Result){
            //         for(var i=0; i<input.length;i++){
            //             value(input[i])
            //         }
            //         for(var i=0; i<textarea.length;i++){
            //             value(textarea[i])
            //         }
            //         function value(obj) {
            //             obj.value='';
            //         }
            //         error.innerHTML='信件已寄出';
            //         setTimeout(function(argument) {
            //             error.style.opacity='0';
            //             error.innerHTML='';
            //         },3000)
            //     }else{
            //         error.innerHTML = '未發送請重寄或連絡我們(電話:02-2641-7909)';
            //     }
            // })
        }
    })
}

function getParam(el) {
    document.getElementById('imgCaptcha').src = './php/captchaPhp.php?' + Math.random();
}

function soundBg() {
    var url = "./audio/02.mp3",
        song = new Audio(url),
        obj = document.querySelectorAll('.indexHeader .sound')[0];
    song.play();
    song.loop = true;
    song.volume = 0.1;
    obj.addEventListener('click', function() {
        if (this.classList.contains('active')) {
            this.classList.remove('active');
            song.pause();
        } else {
            this.classList.add('active');
            song.play();
        }
    })
}

function soundHover(obj) {
    var url = "./audio/text.mp3",
        song = new Audio(url);
    song.volume = 0.1;
    obj.addEventListener('mouseenter', function() {
        song.play();
    })
}

function zoom(argument) {
    var zoom = document.querySelectorAll('.zoom')[0];
    zoom.addEventListener('click', function() {
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
            zoom.classList.add('active');
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
            zoom.classList.remove('active');
        }
    })
}

function scrollLoad() {
    var scrollAnimation = document.querySelectorAll('.scrollAnimation');
    for (var i = 0; i < scrollAnimation.length; i++) {
        var scrollY = window.scrollY || window.pageYOffset; //IE
        var slideInAt = (scrollY + window.innerHeight) - scrollAnimation[i].offsetHeight / 2;
        var offsetTop = getoffset(scrollAnimation[i]).top;
        var vBottom = offsetTop + scrollAnimation[i].offsetHeight;
        var isShow = slideInAt > offsetTop;
        var isScroll = window.scrollY < vBottom;
        if (isShow) {
            scrollAnimation[i].classList.add('active');
        }
    }
}

function showLoad() {
    var scrollAnimation = document.querySelectorAll('.scrollAnimation');
    for (var i = 0; i < scrollAnimation.length; i++) {
        scrollAnimation[i].classList.add('active');
    }
}

function scrollBgMeteorite(argument) {
    // var contentHeight =  document.body.scrollHeight-(document.body.clientHeight/2);
    var contentHeight = document.body.scrollHeight - document.body.clientHeight;
    var cameraPerspective = 6000;
    var ratio = contentHeight - window.pageYOffset;
    var value = ((cameraPerspective / contentHeight) * ratio);
    var camera = document.querySelectorAll('.camera')[0];
    camera.style.perspective = value + 'px';
    // console.log('contentHeight'+contentHeight);
    // console.log('document.body.clientHeight'+document.body.clientHeight);
    // console.log('ratio'+ratio);
    // console.log('value'+value);
    // console.log(document.body.clientHeight);
    // console.log(window.pageYOffset);
    // if(value > 0){
    //     camera.style.perspective = value + 'px';
    // }else{
    //     camera.style.perspective = '1px';
    // }
    // console.log('document.body.scrollHeight '+document.body.scrollHeight);
    // console.log('document.body.clientHeight '+document.body.clientHeight/2);
    // console.log('contentHeight '+contentHeight);
    // console.log('window.pageYOffset '+window.pageYOffset);
    // console.log('cameraPerspective '+cameraPerspective);
    // console.log('cameraPerspective / contentHeight '+cameraPerspective / contentHeight);
    // console.log('ratio '+ratio);
}

function scrollShowChart(argument) {
    var slideInAt = (window.innerHeight / 10) - window.scrollY;
    var scroll = document.querySelectorAll('.indexHeader .scroll')[0];
    if (slideInAt > 1) {
        scroll.style.opacity = 1;
    } else {
        scroll.style.opacity = 0;
    }
}

function scrollTop() {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
}

function start() {
    //top
    scrollTop();
    //去到該目標
    gotoObj();
    //寄信
    seadEmail();
    //開頭動畫
    document.querySelectorAll('body')[0].classList.remove('active');
    //選單
    menu();
    menuActive();
    document.addEventListener('scroll', function() {
        menuActive();
    })

    //不是手機
    if (!/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
        //文字滑過動畫
        hoverText({
            el: '.indexHeader .menuopen li a',
            fn: function() {
                shuffleLetters(this);
            }
        })
        hoverText({
            el: '.indexService li',
            fn: function() {
                shuffleLetters(this.querySelectorAll('h3')[0]);
            }
        })
        hoverText({
            el: '.indexCooperation li',
            fn: function() {
                shuffleLetters(this.querySelectorAll('p')[0]);
            }
        })
        hoverText({
                el: '.indexFooter li a',
                fn: function() {
                    shuffleLetters(this);
                }
            })
            //團隊視差
        hoverParallx();
        //背景聲音
        soundBg();
        //滑過聲音
        hoverText({
            el: '.indexCase .items a'
        });
        //全螢幕
        zoom();
        //移動隕石視差
        mousemoveMeterorite();
        document.addEventListener('scroll', function() {
            //滾動出現項目
            scrollLoad();
            //滾動隕石視差
            scrollBgMeteorite();
            //下滑圖示顯示
            scrollShowChart();
        })
    } else {
        //隱藏聲音圖示
        var soundNav = document.querySelectorAll('.indexHeader .soundNav')[0];
        soundNav.style.display = 'none';
        //出現項目
        showLoad();
    };
}

function caseLightbox(id) {
    requestServerCall({
        url: "./php/transfer.php",
        data: {
            act: "caseOne",
            id: id
        },
        callback: function(data) {
            var json = data.Data[0];
            var body = document.body;
            var obj = document.createElement('div');
            obj.classList.add('lightbox');
            obj.innerHTML = '<div class="box">\
               <div class="img"><img src="' + json.Cover1 + '" alt=""></div>\
               <div class="lightboxTitle"><h4>' + json.Pname + '</h4></div>\
               <div class="lightboxText"><p>' + json.Content + '</p></div>\
               <div class="button button_color">關閉視窗</div>\
            </div>';
            body.appendChild(obj);
            obj.querySelectorAll('.button')[0].addEventListener('click', function() {
                obj.style.opacity = '1';
                fadeIn(obj, 0, 400, function() {
                    obj.remove();
                })
            });
        }
    })
}

function param(obj) {
    var pairs = [];
    for (var name in obj) {
        var pair = encodeURIComponent(name) + '=' +
            encodeURIComponent(obj[name]);
        pairs.push(pair.replace('/%20/g', '+'));
    }
    return pairs.join('&');
}

function requestServerCall(option) {

    var body = document.body;
    var script = document.createElement("script");
    var data = option.data || {};
    var callbackName = 'fn' + requestServerCall.jsc++;
    var url = option.url + '?' + param(data) + '&callback=' + callbackName;
    // 建立暫時的函式
    window[callbackName] = function(json) {
        option.callback(json);
    }

    script.type = 'text/javascript';
    script.setAttribute("src", url);
    body.appendChild(script);
    body.removeChild(script);

    // body.removeChild(script);
    // 跨瀏覽器處理 script 下載完成後的事件
    // script.onload = script.onreadystatechange = function() {
    //     if (!this.readyState ||
    //         this.readyState === "loaded" || 
    //         this.readyState === "complete") {
    //         this.onload = this.onreadystatechange = null;
    //        body.removeChild(this);
    //        // script 下載並執行完後移除暫時的函式
    //         window.callbackName = undefined;
    //         delete window.callbackName;
    //     }
    // };
}
requestServerCall.jsc = new Date().getTime();
window.onload = function() { start(); }
>>>>>>> 1c3bb928d0236e641e08daca89864a7ce99fc1ce
