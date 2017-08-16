$(function(){
	$("#search-parent-material-button").click(function(e){
		var inputname=$("#search-input-parent-material").val();
		var data={};
		var query="SELECT [Material Name], [Material Id] FROM [material].[Material] WHERE [Material Name] LIKE '%"+inputname+"%'";
		data.title="new-parent-material";
		data.message=query;
		$.ajax({
			type: 'POST',
			data: JSON.stringify(data),
			contentType: 'application/json',
			url: 'http://localhost:3000/executequery',
			success: function(data){
				console.log(JSON.stringify(data));
				if(data.length>0){
					$(".item-in-list").remove();
					for(var i=0;i<data.length;i++){
						$("#search-result").append("<li id='"+i+"' class='item-in-list'><a id='"+i+"'>"+(data[i])["Material Name"]+"</a></li>");
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
		            id=(data[e.target.id])["Material Id"];
		            //console.log(id);
		            $("#input-Parent-Material-Name").val(name);
                  }else{
                    $(this).addClass("open");
                    $(this).children("ul").slideDown("fast");
                  }    
                });
			}
		});
		
	});
	
	
});