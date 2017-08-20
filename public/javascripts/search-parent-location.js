$(function(){
	$("#search-parent-location-button").click(function(e){
		var inputname=$("#search-input-parent-location").val();
		console.log("click");
		console.log(inputname);
		
		var data={};
		data.title="new-parent-location";
		data.message=inputname;
		$.ajax({
			type: 'POST',
			data: JSON.stringify(data),
			contentType: 'application/json',
			url: 'https://localhost:55555/search-parent-location',
			success: function(data){
				console.log(JSON.stringify(data));
				if(data.length>0){
					$(".item-in-list").remove();
					for(var i=0;i<data.length;i++){
						$("#search-result").append("<li id='"+i+"' class='item-in-list'><a id='"+i+"'>"+(data[i])["Location Name"]+"</a></li>");
					}
				}else{
					$(".item-in-list").remove();
					$("#search-result").append("<li class='item-in-list'><a>No Results</a></li>");
				}
				//$("#search-result").append();
				$("span#search").toggle();
				
				$("#dropdown").on("click", function(e){
                  e.preventDefault();
                  if($(this).hasClass("open")) {
                    $(this).removeClass("open");
                    $(this).children("ul").slideUp("fast");
		            name=$(e.target).text();
		            //console.log(name);
		            id=(data[e.target.id])["Location Id"];
		            //console.log(id);
		            $("#input-Parent-Location-Name").val(name);
                  }else{
                    $(this).addClass("open");
                    $(this).children("ul").slideDown("fast");
                  }    
                });
			}
		});
		
	});
	
	
});