(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{134:function(t,i,s){"use strict";var e=s(85);s.n(e).a},135:function(t,i,s){(t.exports=s(3)(!1)).push([t.i,"#verticalScrollText .seamless-warp{height:100%;max-height:160px;overflow:hidden}#verticalScrollText .seamless-warp p{margin:0;padding:0;font-size:14px;height:32px}#verticalScrollText .seamless-warp div div{border-top:2px solid #ddd;height:256}\n",""])},159:function(t,i,s){"use strict";s.r(i);var e={name:"verticalScrollText",data:()=>({}),components:{nativeScroll:s(57).a},computed:{optionSwitch:()=>({autoPlay:!0,direction:1,limitMoveNum:0,step:1,waitTime:3500,singleHeight:34})}},o=(s(134),s(7)),h=Object(o.a)(e,(function(){var t=this.$createElement,i=this._self._c||t;return i("div",{attrs:{id:"verticalScrollText"}},[i("nativeScroll",{staticClass:"seamless-warp",attrs:{"class-option":this.optionSwitch}},[this._t("default")],2)],1)}),[],!1,null,null,null);i.default=h.exports},57:function(t,i,s){"use strict";s(54)();const e=s(55),o=s(56);var h={name:"nativeScroll",data:()=>({xPos:0,yPos:0,delay:0,copyHtml:"",height:0,width:0,realBoxWidth:0,reqFrame:null,singleWaitTime:null,isHover:!1}),props:{data:{type:Array,default:()=>[]},classOption:{type:Object,default:()=>({})}},computed:{leftSwitchState(){return this.xPos<0},rightSwitchState(){return Math.abs(this.xPos)<this.realBoxWidth-this.width},leftSwitchClass(){return this.leftSwitchState?"":this.options.switchDisabledClass},rightSwitchClass(){return this.rightSwitchState?"":this.options.switchDisabledClass},leftSwitch(){return{position:"absolute",margin:`${this.height/2}px 0 0 -${this.options.switchOffset}px`,transform:"translate(-100%,-50%)"}},rightSwitch(){return{position:"absolute",margin:`${this.height/2}px 0 0 ${this.options.switchOffset}px`,transform:"translateY(-50%)"}},float(){return this.options.direction>1?{float:"left",overflow:"hidden"}:{overflow:"hidden"}},pos(){return{transform:`translate(${this.xPos}px,${this.yPos}px)`,transition:`all ${this.ease||"ease-in"} ${this.delay}ms`,overflow:"hidden"}},defaultOption:()=>({step:1,limitMoveNum:5,hoverStop:!0,direction:1,openTouch:!0,singleHeight:0,singleWidth:0,waitTime:1e3,switchOffset:30,autoPlay:!0,switchSingleStep:134,switchDelay:400,switchDisabledClass:"disabled"}),options(){return o({},this.defaultOption,this.classOption)},moveSwitch(){return this.data.length<this.options.limitMoveNum},hoverStop(){return!this.options.autoPlay||!this.options.hoverStop||this.moveSwitch},canTouch(){return!this.options.openTouch||!this.options.autoPlay}},methods:{leftSwitchClick(){this.leftSwitchState&&(Math.abs(this.xPos)<this.options.switchSingleStep?this.xPos=0:this.xPos+=this.options.switchSingleStep)},rightSwitchClick(){this.rightSwitchState&&(this.realBoxWidth-this.width+this.xPos<this.options.switchSingleStep?this.xPos=this.width-this.realBoxWidth:this.xPos-=this.options.switchSingleStep)},_cancle(){cancelAnimationFrame(this.reqFrame||"")},touchStart(t){if(this.canTouch)return;let i,s=t.targetTouches[0];this.startPos={x:s.pageX,y:s.pageY},this.startPosY=this.yPos,this.startPosX=this.xPos,this.options.singleHeight&&this.options.singleWidth?(i&&clearTimeout(i),i=setTimeout(()=>{this._cancle()},this.options.waitTime+20)):this._cancle()},touchMove(t){if(this.canTouch||t.targetTouches.length>1||t.scale&&1!==t.scale)return;let i=t.targetTouches[0];this.endPos={x:i.pageX-this.startPos.x,y:i.pageY-this.startPos.y},event.preventDefault();let s=Math.abs(this.endPos.x)<Math.abs(this.endPos.y)?1:0;1===s&&this.options.direction<2?this.yPos=this.startPosY+this.endPos.y:0===s&&this.options.direction>1&&(this.xPos=this.startPosX+this.endPos.x)},touchEnd(){if(this.canTouch)return;let t,i=this.options.direction;if(this.delay=50,1===i)this.yPos>0&&(this.yPos=0);else if(0===i){let t=this.$refs.realBox.offsetHeight/2*-1;this.yPos<t&&(this.yPos=t)}else if(2===i)this.xPos>0&&(this.xPos=0);else if(3===i){let t=-1*this.$refs.slotList.offsetWidth;this.xPos<t&&(this.xPos=t)}t&&clearTimeout(t),t=setTimeout(()=>{this.delay=0,this._move()},this.delay)},enter(){this.hoverStop||(this.isHover=!0,this.singleWaitTime&&clearTimeout(this.singleWaitTime),this._cancle())},leave(){this.hoverStop||(this.isHover=!1,this._move())},_move(){this.isHover||(this._cancle(),this.reqFrame=requestAnimationFrame(function(){if(!this.$refs.realBox)return;let t=this.$refs.realBox.offsetHeight/2,i=this.$refs.slotList.offsetWidth,s=this.options.direction;1===s?(Math.abs(this.yPos)>=t&&(this.yPos=0),this.yPos-=this.options.step):0===s?(this.yPos>=0&&(this.yPos=-1*t),this.yPos+=this.options.step):2===s?(Math.abs(this.xPos)>=i&&(this.xPos=0),this.xPos-=this.options.step):3===s&&(this.xPos>=0&&(this.xPos=-1*i),this.xPos+=this.options.step),this.singleWaitTime&&clearTimeout(this.singleWaitTime),this.options.singleHeight?Math.abs(this.yPos)%this.options.singleHeight==0?this.singleWaitTime=setTimeout(()=>{this._move()},this.options.waitTime):this._move():this.options.singleWidth&&Math.abs(this.xPos)%this.options.singleWidth==0?this.singleWaitTime=setTimeout(()=>{this._move()},this.options.waitTime):this._move()}.bind(this)))},_initMove(){if(this.copyHtml="",this.moveSwitch)this._cancle(),this.yPos=this.xPos=0;else{let t;t&&clearTimeout(t),t=setTimeout(()=>{this.copyHtml=this.$refs.slotList.innerHTML},20),this._move()}}},mounted(){if(this.height=this.$refs.wrap.offsetHeight,this.width=this.$refs.wrap.offsetWidth,this.options.direction>1){let t;t=this.options.autoPlay?2:1,this.$refs.realBox.style.width=this.$refs.slotList.offsetWidth*t+"px",this.realBoxWidth=this.$refs.slotList.offsetWidth*t}if(!this.options.autoPlay)return this.ease="linear",void(this.delay=this.options.switchDelay);this._initMove()},watch:{data(t,i){e(t,i)||(this._cancle(),this._initMove())}},beforeDestroy(){this._cancle()}},a=s(7),l=Object(a.a)(h,(function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{ref:"wrap"},[s("div",{class:t.leftSwitchClass,style:t.leftSwitch,on:{click:t.leftSwitchClick}},[t._t("left-switch")],2),t._v(" "),s("div",{class:t.rightSwitchClass,style:t.rightSwitch,on:{click:t.rightSwitchClick}},[t._t("right-switch")],2),t._v(" "),s("div",{ref:"realBox",style:t.pos,on:{mouseenter:t.enter,mouseleave:t.leave,touchstart:t.touchStart,touchmove:t.touchMove,touchend:t.touchEnd}},[s("div",{ref:"slotList",style:t.float},[t._t("default")],2),t._v(" "),s("div",{style:t.float,domProps:{innerHTML:t._s(t.copyHtml)}})])])}),[],!1,null,null,null);i.a=l.exports},85:function(t,i,s){var e=s(2),o=s(135);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[t.i,o,""]]);var h={insert:"head",singleton:!1};e(o,h);t.exports=o.locals||{}}}]);
//# sourceMappingURL=13.bundle.76dd396870ecf33d7ee7.js.map