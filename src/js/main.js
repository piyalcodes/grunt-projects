 

// ################################
// ## the below is for carousel  ##
// ################################


 

 $(document).ready(function() {  
							
 
  localStorage.mSlider = "false";							 
  localStorage.sliderNo = 0;	 
 
  if($('#slide-btn').css("display") == "none") {		 
	  if(localStorage.mSlider == "false") {			 
		  localStorage.mSlider = "true";
		  mobileSlider();						
	  } 
  }	 					
	
	//constrcutor
	var SimpleGallery = function(options){
		 
	  this.renderToEl = null;
	   this.options = $.extend({
		  leftButton		: '.leftBtn',
		  rightButton		: 'rightBtn',
		  carouselName		: 'myCarousel',
		  dataGrid 			: '#gallery_data',
		  paddingSize 		: 5,
		  imageWidth		: 200,
		  numberOfImages 	: 0,		  
		  bgColor			: '#ffccdd',
		  bullets 			: "#bullets",
		  activeNumber 		: 0,
		  imagesPerScreen 	: 3
	  }, options); 
	 
	} 

	SimpleGallery.prototype = {
		
		init: function (galleryData) {				
			 	this.dataGrid();		 
		  },
		
		dataGrid: function() {	 
			
			if(localStorage.mSlider == "true") {
				this.options.paddingSize  = 0;
				this.options.imagesPerScreen = 1;
			}
	  		this.options.numberOfImages 	= parseInt($(this.options.dataGrid).find("li").length) ;			
			this.options.imageWidth 		= parseInt($(this.options.dataGrid).find("li img:first").width()) + parseInt(this.options.paddingSize);
			this.eventBind();
		},
		
		slideIt : function(direction, number, settings) {	
			 
			if(this.options.activeNumber != number ) { 
			
			
			
			if(direction == "NULL") {	if(Math.abs(this.options.activeNumber) > number) 	direction = "+"; else 	direction = "-";}	
			
			var moveSize = this.getMoveSize(direction, number, settings);
			var dataGrid = this.options.dataGrid;			
 			$(dataGrid).animate({'marginLeft': direction+'='+ moveSize +'px'}, 'slow');			
			this.updateBullets(direction, moveSize, settings);
			}
		},
		
		pointer: function() {
			 
		},
		getMoveSize : function(direction, number, settings) {
	
			var moveSize = 0;
			if(settings == "number") {
					if(Math.abs(this.options.activeNumber) == 0) {
						 
						moveSize = parseInt(Math.abs(number)) * parseInt(this.options.imageWidth);				
						this.options.activeNumber = "-"+parseInt(number) ;	
						 
					} else {
						
					 	var tmp = Math.abs(this.options.activeNumber) - parseInt(Math.abs(number) );
					 	moveSize = Math.abs(tmp)  * parseInt(this.options.imageWidth); 
						this.options.activeNumber = "-"+number;
						 
					}
					
			} else {
				
				if(direction == "+") {  
				
					if(parseInt(Math.abs(this.options.activeNumber)) + parseInt(this.options.imagesPerScreen) > parseInt(this.options.imagesPerScreen)) {
						this.options.activeNumber = parseInt(this.options.activeNumber) + parseInt(1);
						moveSize =  parseInt(this.options.imageWidth);					 
					}
					 
				} else {
				
					if(Math.abs(parseInt(this.options.activeNumber) - parseInt(this.options.imagesPerScreen) - parseInt(1)) <= parseInt(this.options.numberOfImages)) {
						this.options.activeNumber = parseInt(this.options.activeNumber) - parseInt(1); 
						moveSize =  parseInt(this.options.imageWidth);
					}
				}				
			}
			
			return moveSize;
			 
		},
		
		  
		
		generateBullets : function() { 
		 
			var bullets =  this.options.bullets;
			var bulletsData = "";
			var active = "";
			for(x=1; x<=parseInt(this.options.numberOfImages)-parseInt(this.options.imagesPerScreen)+parseInt(1);x++){
				x == 1 ? active = "active" : active = "";
 
				//bulletsData += "<li "+active+" ><a href='#' val='"+parseInt(x-1) +"'>"+x+"</a></li>";
				bulletsData += '<button class="btn btn-default '+active+'" type="button"  val="'+parseInt(x-1) +'">'+x+'</button>';
			}			 
			$(bullets).html(bulletsData);			
		},				
		updateBullets : function(direction, moveSize) { 
			 var number = this.options.imageWidth / moveSize;
			 var currentNumber = this.options.activeNumber;
			 if(direction == "+") {
				  var nextActive =  parseInt(number + currentNumber);
			 } else {
				  var nextActive =  parseInt(number - currentNumber);
			 }			
			 
		},
		
		eventBind : function() {
			
			var thisValues = this; 	
			 
			$(document).find(this.options.rightButton).click(function(){
				 												  
				thisValues.slideIt("+",1, "side");
				if($(thisValues.options.bullets + " button[class~='active']").index() > 0) {
					$(thisValues.options.bullets + " button[class~='active']").prev().addClass("active");
					$(thisValues.options.bullets + " button[class~='active']:last").removeClass("active");
				}
			});  
			 
			$(document).find(this.options.leftButton).click(function(){
				 										 
				thisValues.slideIt("-",1, "side");		
				if($(thisValues.options.bullets + " button[class~='active']").index() <= thisValues.options.numberOfImages-thisValues.options.imagesPerScreen-1) {
					$(thisValues.options.bullets + " button[class~='active']").next().addClass("active");
					$(thisValues.options.bullets + " button[class~='active']:first").removeClass("active");
				}
			});  
			this.generateBullets(); 	
			$(thisValues.options.bullets + " button").bind("click", function(){
				thisValues.slideIt("NULL",$(this).attr("val"), "number"); 
				$(thisValues.options.bullets + " button").removeClass("active");
				$(this).addClass("active");				
			});  			
			
			
		} 
	}
	 
	 
	 
	var galleryData = [{ url:"images/1.jpg", title:"Image 1", description:"Description of the image 1"}, { url:"images/2.jpg", title:"Image 2", description:"Description of the image 2"}, { url:"images/3.jpg", title:"Image 3", description:"Description of the image 3"}, { url:"images/4.jpg", title:"Image 4", description:"Description of the image 4"}, { url:"images/5.jpg", title:"Image 5", description:"Description of the image 5"}, { url:"images/6.jpg", title:"Image 6", description:"Description of the image 6"}, { url:"images/7.jpg", title:"Image 7", description:"Description of the image 7"}];
	
		var gallery = new SimpleGallery({
			leftButton: '.leftBtn'	,
			rightButton: '.rightBtn'	,
			dataGrid : '#gallery_data'	,
			numberOfImages : 25	,
			bullets : "#bullets"	
		});	 
		 gallery.init(galleryData); 
  

 }); 
 
 function mobileSlider() { 
	 var length = $( ".btn-group button").length;
	 
	if(localStorage.sliderNo == length) {
		localStorage.sliderNo = -1;
	}
	localStorage.sliderNo++;
	 $( ".btn-group button:eq("+localStorage.sliderNo+")").trigger( "click" );
	 
	setTimeout(function() { 
				mobileSlider();							 
			},1500);	 
	 
 }
 
 



 
 