"use strict";
$(document).ready(function(){

	var tnav = $("#t-pnav").hide(); //設定手機畫面導覽列隱藏
	var ticon = $("#t-icon"); //設定icon區塊

	var smain = $("#smain"); //#pagemain右側區塊
	var gotop = $("#gotop"); //置頂icon

	var last = ""; //設定離視窗底部多少距離

	$(ticon).on("click",function(){
		tnav.slideToggle();
	})

	$(gotop).click(function(){
		$("html, body").animate({scrollTop:0},900);
		return false;
	})

	$(window).scroll(function(){
	//scrollTop = body-window，120是預留空間
	last = $("body").height() - $(window).height()- 200;
		if($(window).scrollTop() >= last){
			$(smain).hide();
		} else{
			$(smain).show();
		}
	})


	$(window).scroll(function(){
	//scrollTop = body-window，120是預留空間
	last = $("body").height() - $(window).height() - 500;
		if($(window).scrollTop() < last){
			$(gotop).show();
		} else{
			$(gotop).hide();
		}
	})
	
});