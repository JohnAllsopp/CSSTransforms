var stopsCount=1; //increment or decrement this to keep track of stops editors

function initialize(){
	createSliders();
	collapseJS.initialize(); //set up collapsable areas
	updateAnimation();
}

function createSliders(){
	
	//once the page loads, create sliders for the input elements
	//find elements with the class slider
	
	var theSliders= new Array;
	theSliders=document.querySelectorAll(".slider");
	
	var sliderMax=500;
	var sliderMin=-500;
	var sliderStep=1;
	var hideTheInput=false;
	
	for (var i=0; i < theSliders.length; i++) {
	//create a slider for each

	
		if(theSliders[i].id.indexOf('scale')!=-1){
			sliderMin=0;
			sliderMax=5;
			sliderStep=.1
			hideTheInput=false;
		}
		else if ((theSliders[i].id.indexOf('rotate')!=-1)|| (theSliders[i].id.indexOf('skew')!=-1)) {
			sliderMin=-360;
			sliderMax=360;
			sliderStep=1;
			hideTheInput=false;
		}

		else if ((theSliders[i].id.indexOf('origin')!=-1)) {
			sliderMin=0;
			sliderMax=100;
			sliderStep=1;
			hideTheInput=false;
		}

		else if ((theSliders[i].id.indexOf('perspective')!=-1)) {
			sliderMin=1;
			sliderMax=1500;
			sliderStep=1;
			hideTheInput=false;
		}
		
		else if ((theSliders[i].id.indexOf('duration')!=-1)) {
			sliderMin=0;
			sliderMax=10;
			sliderStep=.1;
			hideTheInput=false;
		}
		
		else {
			sliderMin=-500;
			sliderMax=500;
			sliderStep=1;
			hideTheInput=false;
		}

	
		fdSlider.createSlider({
		  		// Associate the slider with the form element 
			inp:theSliders[i],
			// Use the "tween to click point" animation
			animation:"tween",
			min: sliderMin,
			max: sliderMax,
			step: sliderStep,
			callbacks: {'change': [transformIt]},
			// callbacks: {'change': [theSliders[i].onchange]},
			classNames:"theSlider",
			hideInput: hideTheInput
		});
	

	}
	
	// blockUpdates(false);
	// updateTextProperties();
	
}


function transformIt() {
	
	var demoDiv=document.getElementById("demo");
	var codeDiv=document.getElementById("code");
	var resultsDiv=document.getElementById("demo-container");
	
	var theScale=document.getElementById("scale").value;
	var theZScale=document.getElementById("scaleZ").value;

	var theXRotation=document.getElementById("rotateX").value + "deg";
	var theYRotation=document.getElementById("rotateY").value + "deg";
	var theZRotation=document.getElementById("rotateZ").value + "deg";

	var theXTranslation=document.getElementById("translateX").value + "px";
	var theYTranslation=document.getElementById("translateY").value + "px";
	var theZTranslation=document.getElementById("translateZ").value + "px";

	var theXSkew=document.getElementById("skewX").value + "deg";
	var theYSkew=document.getElementById("skewY").value + "deg";

	var thePerspective=document.getElementById("perspective").value + "px";
	
	var theXOrigin=document.getElementById("originX").value + "%";
	var theYOrigin=document.getElementById("originY").value + "%";

	var perspectiveOriginX=document.getElementById("perspective-origin-x").value + "%";
	var perspectiveOriginY=document.getElementById("perspective-origin-y").value + "%";

	var thePerspectiveOrigin = perspectiveOriginX + " " + perspectiveOriginY;
	
	var theTimingFunction=document.getElementById("timing-function").value;
	var theDuration=document.getElementById("duration").value;
		
	var addPrefixes = document.querySelector('#addPrefixes').checked;
	var usePerspectiveFunction = document.querySelector('#perspectiveFunction').checked;

	var theCSS = "#demo {\n";
	
	if (theScale!==""){
		theTransform="scale("+theScale+")";
	}
	
	if (theZScale!==""){
		theTransform= theTransform + " scaleZ("+theZScale+")";
	}

	if (theXRotation!=="deg" && theXRotation!=="0deg"){
		theTransform=theTransform+" rotateX("+theXRotation+")";
	}

	if (theYRotation!=="deg" && theYRotation!=="0deg"){
		theTransform=theTransform+" rotateY("+theYRotation+")";
	}

	if (theZRotation!=="deg" && theZRotation!=="0deg"){
		theTransform=theTransform+" rotateZ("+theZRotation+")";
	}

	if (theXTranslation!=="px" && theXTranslation!=="0px"){
		theTransform=theTransform+" translateX("+theXTranslation+")";
	}

	if (theYTranslation!=="px" && theYTranslation!=="0px"){
		theTransform=theTransform+" translateY("+theYTranslation+")";
	}

	if (theZTranslation!=="px" && theZTranslation!=="0px"){
		theTransform=theTransform+" translateZ("+theZTranslation+")";
	}

	if (theXSkew!=="deg" && theXSkew!=="0deg"){
		theTransform=theTransform+" skewX("+theXSkew+")";
	}
	if (theYSkew!=="deg" && theYSkew!=="0deg"){
		theTransform=theTransform+" skewY("+theYSkew+")";
	}
	
	if (theYSkew!=="deg" && theYSkew!=="0deg"){
		theTransform=theTransform+" skewY("+theYSkew+")";
	}
	
	if (usePerspectiveFunction) {
		theTransform=theTransform+" perspective("+thePerspective+")";
	}
	
	else {
		var containerCSS = "perspective: " + thePerspective
	}
	
	
	if (demoDiv) {
		theOrigin=theXOrigin + " " + theYOrigin;
		demoDiv.style.webkitTransition="-webkit-transform " + theTimingFunction + " " + theDuration + "s";
		
		demoDiv.style.webkitTransformOrigin=theOrigin;
		demoDiv.style.MozTransformOrigin=theOrigin;
		demoDiv.style.oTransformOrigin=theOrigin;
		demoDiv.style.msTransformOrigin=theOrigin;
		demoDiv.style.transformOrigin=theOrigin;
		
		demoDiv.style.webkitTransform=theTransform;
		demoDiv.style.MozTransform=theTransform;
		demoDiv.style.oTransform=theTransform;
		demoDiv.style.msTransform=theTransform;
		demoDiv.style.transform=theTransform;
		
		if (!usePerspectiveFunction) {		
			//add perspective property to the container element
			resultsDiv.style.webkitPerspective=thePerspective;
			resultsDiv.style.mozPerspective=thePerspective;
			resultsDiv.style.oPerspective=thePerspective;
			resultsDiv.style.msPerspective=thePerspective;
			resultsDiv.style.perspective=thePerspective;
		}
		
		resultsDiv.style.webkitPerspectiveOrigin=thePerspectiveOrigin;
		resultsDiv.style.mozPerspectiveOrigin=thePerspectiveOrigin;
		resultsDiv.style.oPerspectiveOrigin=thePerspectiveOrigin;
		resultsDiv.style.msPerspectiveOrigin=thePerspectiveOrigin;
		resultsDiv.style.perspectiveOrigin=thePerspectiveOrigin;
		
		
		if (addPrefixes){
			theCSS = theCSS + "  -webkit-transform: " +theTransform + ";\n  -webkit-transform-origin: " + theOrigin; 
			theCSS = theCSS + ";\n  -moz-transform: " +theTransform + ";\n  -moz-transform-origin: "  + theOrigin; 
			theCSS = theCSS + ";\n  -o-transform: " +theTransform + ";\n  -o-transform-origin: "  + theOrigin; 
			theCSS = theCSS + ";\n  -ms-transform: " +theTransform + ";\n  -ms-transform-origin: "  + theOrigin
			theCSS = theCSS + "  transform: " +theTransform + ";\n  transform-origin: "  + theOrigin 
			+ "\n}";
			
			containerCSS = "\n#demo-container {"
			+  "\n  -webkit-perspective-origin: " + thePerspectiveOrigin
			+  ";\n  -moz-perspective-origin: " + thePerspectiveOrigin
			+  ";\n  -o-perspective-origin: " + thePerspectiveOrigin
			+  ";\n  -ms-perspective-origin: " + thePerspectiveOrigin
			+  ";\n  perspective-origin: " + thePerspectiveOrigin


			if (!usePerspectiveFunction){
				containerCSS = containerCSS + ";\n  -webkit-perspective: " + thePerspective 
				+  ";\n  -moz-perspective: " + thePerspective 
				+  ";\n  -o-perspective: " + thePerspective 
				+  ";\n  -ms-perspective: " + thePerspective 
				+  ";\n  perspective: " + thePerspective 
			}
			
			containerCSS = containerCSS + "\n}"

			
			
		}
		else {
			theCSS = theCSS + "  transform: " + theTransform + ";\n  transform-origin: "  + theOrigin + "\n}";
			containerCSS = "\n#demo-container {\n"
			+  "  perspective-origin: " + thePerspectiveOrigin
			
			if (!usePerspectiveFunction){
				containerCSS = containerCSS + ";\n  perspective: " + thePerspective + "\n}"
			}
			
			else {
				containerCSS = containerCSS + "\n}"
			}
		}
		
		codeDiv.textContent=theCSS + "\n" + containerCSS;
		}
}

function animateIt() {
	theTimingFunction=document.getElementById("timing-function").value;
	theDuration=document.getElementById("duration").value;
	
	demoDiv=document.getElementById("demo");
			
		clearIt();
		setTimeout("transformIt()", 50)
	
}

function updateAnimation() {
	theTimingFunction=document.getElementById("timing-function").value;
	theDuration=document.getElementById("duration").value;
	
	var demoDiv=document.getElementById("demo");
		
	demoDiv.style.webkitTransition="all " + theTimingFunction + " " + theDuration + "s";
	demoDiv.style.MozTransition="all " + theTimingFunction + " " + theDuration + "s";
	demoDiv.style.OTransition="all " + theTimingFunction + " " + theDuration + "s";
	demoDiv.style.msTransition="all " + theTimingFunction + " " + theDuration + "s";
	demoDiv.style.transition="all " + theTimingFunction + " " + theDuration + "s";		
}

function clearIt(){
	demoDiv.style.webkitTransition="";
	demoDiv.style.webkitTransition=""; 
 	demoDiv.style.webkitTransform="";
	demoDiv=document.getElementById("demo");
	
}


window.onload=initialize;