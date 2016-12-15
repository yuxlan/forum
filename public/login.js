jQuery(document).ready(function($){
	"use strict";
	var $form_modal = $('.user-modal'),
		$form_login = $form_modal.find('#login'),
		$form_signup = $form_modal.find('#signup'),
		$form_modal_tab = $('.switcher'),
		$tab_login = $form_modal_tab.children('li').eq(0).children('a'),
		$tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
		$login_nav = $('.login-nav');

	$login_nav.on('click', function(event){
		if( $(event.target).is($login_nav) ) {
			$(this).children('ul').toggleClass('is-visible');
		} else {
			$login_nav.children('ul').removeClass('is-visible');
			$form_modal.addClass('is-visible');	
			if($(event.target).is('.signup')){
				signup_selected();
				}else{
					login_selected();
					}
				}
	});
	
	$('.user-modal').on('click', function(event){
		if( $(event.target).is($form_modal) || $(event.target).is('.close-form') ) {
			$form_modal.removeClass('is-visible');
		}	
	});
	
	$(document).keyup(function(event){
    	if(event.which==='27'){
    		$form_modal.removeClass('is-visible');
	    }
    });


	$form_modal_tab.on('click', function(event) {
		event.preventDefault();
		if($(event.target).is($tab_login)){
			login_selected();
		}else{
			signup_selected();
		}
	});
	
	function login_selected(){
		$form_login.addClass('is-selected');
		$form_signup.removeClass('is-selected');
		$tab_login.addClass('selected');
		$tab_signup.removeClass('selected');
	}

	function signup_selected(){
		$form_login.removeClass('is-selected');
		$form_signup.addClass('is-selected');
		$tab_login.removeClass('selected');
		$tab_signup.addClass('selected');
	}

});
