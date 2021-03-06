var HIN;
if (!HIN)
	HIN = {};
HIN.ColorPicker = function(id) {
	colorPicker = this;
	this.array = [];	
	this.parendId = id;
	this.selectorOwner = $(id).find("#colorValue");
	this.selectorShowing = false;	
	this.defaultColors = [ '000000', '993300','333300', '000080', '333399', '333333', '800000', 'FF6600', '808000', '008000', '008080', '0000FF', '666699', '808080', 'FF0000', 'FF9900', '99CC00', '339966', '33CCCC', '3366FF', '800080', '999999', 'FF00FF', 'C3AB08', '103004', '00FF00', '00FFFF', '00CCFF', '993366', 'C0C0C0', 'FF99CC', 'FFCC99', '59667A' , 'AA2AFF', '99CCFF', 'FF1088'];

};
HIN.ColorPicker.prototype.pickColor = function(callback) {
	//alert("Html : "+colorPicker.selectorOwner);
	if ($(this).length > 0)
		buildSelector();
	return $(this).each( function(i) {
		buildPicker(this)
	});
	
	function buildPicker(element){
	    //build color picker
	    var control = $("<div class='color_picker'>&nbsp;</div>")
	   // control.css('background-color', $(element).val());
	    control.attr('id' , 'div_' + $(element).attr("id"));
	    // bind click event to color picker
	    control.bind("click", toggleSelector);
	    
	    // add the color picker section
	    $(element).after(control);
	    
	    // hide the input box
	    $(element).hide();
	  };
	  function buildSelector(){
		    var selector = $("<div id='color_selector' style='position: absolute; z-index: 1000;'></div>");
		     // add color pallete
		    
		     $.each(colorPicker.defaultColors, function(i){
			     
			      swatch = $("<div class='color_swatch'>&nbsp;</div>")
			      swatch.css("background-color", "#" + this);
			      swatch.bind("click", function(e){ changeColor($(this).css("background-color")) });
			      swatch.bind("mouseover", function(e){ 
			        $(this).css("border-color", "#598FEF"); 
			        $(colorPicker.selectorOwner).val(toHex($(this).css("background-color"))); 
			        $(colorPicker.selectorOwner).css("background-color",toHex($(this).css("background-color")))
			        $(colorPicker.selectorOwner).css("color",toHex($(this).css("background-color")))
			      }); 
			      swatch.bind("mouseout", function(e){ 
			        $(this).css("border-color", "#000");
			        $("input#color_value").val(toHex($(this).css("background-color")));
			      });
			      
			     swatch.appendTo(selector);
		     });
		     // add HEX value field
		     hex_field = $("<label for='colorValue'>Hex</label><input type='text' size='8' id='color_value'/>");
		     hex_field.bind("keydown", function(event){
		      if(event.keyCode == 13) {changeColor($(this).val());}
		      if(event.keyCode == 27) {toggleSelector()}
		     });
		     $("<div id='color_custom'></div>").append(hex_field).appendTo(selector);

		    // $("body").append(selector);
		     $(colorPicker.parendId).append(selector);
		    // selector.hide();
		     selector.show();
		    
		  };
		  function checkMouse(event){
			    //check the click was on selector itself or on selectorOwner
			    var selector = "div#color_selector";
			    var selectorParent = $(event.target).parents(selector).length;
			    if(event.target == $(selector)[0] || event.target == colorPicker.selectorOwner || selectorParent > 0) return
			    
			    hideSelector();   
			  };
			  
		function hideSelector(){
			    var selector = $("div#color_selector");
			    
			    $(document).unbind("mousedown", colorPicker.checkMouse);
			    selector.hide();
			    colorPicker.selectorShowing = false
			  };
			  
		function showSelector(){
			    var selector = $("div#color_selector");
			    
			    // alert($(selectorOwner).offset().top);
			    
			    selector.css({
			      top: $(colorPicker.selectorOwner).offset().top + ($(colorPicker.selectorOwner).outerHeight()),
			      left: $(colorPicker.selectorOwner).offset().left
			    }); 
			    hexColor = $(colorPicker.selectorOwner).prev("input").val();
			    $("input#color_value").val(hexColor);
			    selector.show();
			    
			    // bind close event handler
			    $(document).bind("mousedown", colorPicker.checkMouse);
			    colorPicker.selectorShowing = true 
			   };
			  
		function toggleSelector(event){
			    colorPicker.selectorOwner = $(colorPicker.selectorOwner).find("#colorValue");//"#colorValue"; 
			    colorPicker.selectorShowing ? hideSelector() : showSelector();
			  };
			  
		function changeColor(value){
			    if(selectedValue = toHex(value)){
			      $(colorPicker.selectorOwner).css("background-color", selectedValue);
			      $(colorPicker.selectorOwner).prev("input").val(selectedValue).change();
			    
			      // close the selector
			      hideSelector();    
			    }
			    if (callback) {
					callback(selectedValue);
				}
			  };
			  
			  // converts RGB string to HEX - inspired by
				// http://code.google.com/p/jquery-color-utils
		function toHex(color){
			    //valid HEX code is entered
			    if(color.match(/[0-9a-fA-F]{3}$/) || color.match(/[0-9a-fA-F]{6}$/)){
			      color = (color.charAt(0) == "#") ? color : ("#" + color);
			    }
			    //rgb color value is entered (by selecting a swatch)
			    else if(color.match(/^rgb\(([0-9]|[1-9][0-9]|[1][0-9]{2}|[2][0-4][0-9]|[2][5][0-5]),[ ]{0,1}([0-9]|[1-9][0-9]|[1][0-9]{2}|[2][0-4][0-9]|[2][5][0-5]),[ ]{0,1}([0-9]|[1-9][0-9]|[1][0-9]{2}|[2][0-4][0-9]|[2][5][0-5])\)$/)){
			      var c = ([parseInt(RegExp.$1),parseInt(RegExp.$2),parseInt(RegExp.$3)]);
			      
			      var pad = function(str){
			            if(str.length < 2){
			              for(var i = 0,len = 2 - str.length ; i<len ; i++){
			                str = '0'+str;
			              }
			            }
			            return str;
			      }

			      if(c.length == 3){
			        var r = pad(c[0].toString(16)),g = pad(c[1].toString(16)),b= pad(c[2].toString(16));
			        color = '#' + r + g + b;
			      }
			    }
			    else color = false;
			    
			    return color
			 };
	
};
HIN.ColorPicker.prototype.addColors = function(colorArray){
    colorPicker.defaultColors = colorPicker.defaultColors.concat(colorArray);
};