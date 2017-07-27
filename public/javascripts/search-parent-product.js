$(function(){
	$("#search-parent-product-button").click(function(e){
		var inputname=$("#search-input-parent-product").val();
		console.log("click");
		console.log(inputname);
		
		var data={};
		data.title="new-parent-product";
		data.message=inputname;
		$.ajax({
			type: 'POST',
			data: JSON.stringify(data),
			contentType: 'application/json',
			url: 'http://localhost:3000/search-parent-product',
			success: function(data){
				console.log(JSON.stringify(data));
				if(data.length>0){
					$(".item-in-list").remove();
					for(var i=0;i<data.length;i++){
						$("#search-result").append("<li class='item-in-list'><a>"+(data[i])["Product Name"]+"</a></li>");
					}
				}else{
					$(".item-in-list").remove();
					$("#search-result").append("<li class='item-in-list'><a>No Results</a></li>");
				}
				//$("#search-result").append();
			}
		});
		
	});
	
	$("#dropdown").on("click", function(e){
        e.preventDefault();
        if($(this).hasClass("open")) {
           $(this).removeClass("open");
           $(this).children("ul").slideUp("fast");
		   var name=$(e.target).text();
        } else {
           $(this).addClass("open");
           $(this).children("ul").slideDown("fast");
        }    
});
});