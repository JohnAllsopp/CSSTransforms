//collapse all siblings other than this one
//use with a heading that is the first child element of a div
// assumes all siblings are block - could check but it's designed for a simple case

var collapseJS={
	
	initialize: function(){
	//add event listeners to all toggle containers
	
		return;
	
		var containers=document.querySelectorAll('.toggle-container');
	
		for (var i=0; i < containers.length; i++) {
				//containers[i].addEventListener("webkitTransitionEnd", collapseJS.changeHeightFinished)	
				//containers[i].addEventListener("MozTransitionEnd", collapseJS.changeHeightFinished)	
		};

	},

	toggle: function(element){
		//collapse if expanded and vv
		var nextSibling=element.nextElementSibling;
		if (nextSibling){
			var ht=nextSibling.style.height;
			if(nextSibling.style.maxHeight=="0px"){
				nextSibling.style.maxHeight='500px'; //will need to be taller for south 12
				element.className=""; //if we need classes on the collapsing element, we can use addClass/removeClass
				//indeed, this class change may not be required, I only use it to style the open/close disclosure arrows
			}
			
			else {
				nextSibling.style.maxHeight= "0px";
				element.className="closed";
			
			}
		}
	}	
}