'use strict'

$(function () {
	// add event listener to submit button 
  	$('#santaslist').on('submit', function (e) {
		e.preventDefault();
		// toggle class for santa pic to transition on click
		$('#santa').toggleClass('spin');
		// call function to assign response to form values
		giftSelector();
	  });

	// add text to end of page with where to buy gifts
	$('body').append("*All of Santa's gifts can be bought from Uncommon Goods");
})

function giftSelector() {
	// change class for 'Santa Recommends' text to make it visible
	let header = $('#header');
	// only change class if hidden
	if (header.attr('class') === 'hidden'){
		header.toggleClass('hidden')
	} 

	// set up ajax request
	var ajaxRequest = new XMLHttpRequest();
	ajaxRequest.onreadystatechange = function(){
				
	if(ajaxRequest.readyState == 4){

	if(ajaxRequest.status == 200){
		var jsonObj = JSON.parse(ajaxRequest.responseText);

		// conditional statement to choose array based on form value
		let giftSelector = $('#gift-selector').val();
		if (giftSelector ==='Mom'){
			var giftsArray = jsonObj.mom;
		} else if (giftSelector === 'Dad') {
			var giftsArray = jsonObj.dad;
		} else if (giftSelector === 'Boyfriend'){
			var giftsArray = jsonObj.bf;
		} else if (giftSelector === 'Girlfriend') {
			var giftsArray = jsonObj.gf;
		}
		// call function to update page with array as parameter
		getGifts(giftsArray);			
	}

	else{
		console.log("Status error: " + ajaxRequest.status);
			}
	}
		else{
		console.log("Ignored readyState: " + ajaxRequest.readyState);
			}
	}
			// request json document
			ajaxRequest.open('GET', 'data.json');
			ajaxRequest.send();
}


function getGifts(giftsArray) {
	// loop through name class to update with product name from array
	$('.name').each(function(index){
		$(this).text(giftsArray[index].name) ;
	});
	// loop through gift class for images to update with new source from array
	$('.gift').each(function(index){
		$(this).attr('src', giftsArray[index].source) ;
	});
	// loop through gift class for images to update with alt text from array
	$('.gift').each(function(index){
		$(this).attr('alt', giftsArray[index].alt) ;
	});
	// loop through price class to update with product price from array
	$('.price').each(function(index){
		$(this).text(giftsArray[index].price) ;
	});	
}


