$(document).ready(function(e){
	$("button#association-search-button.btn.btn-default").click(function(e){
		console.log("click");
		if($("input#modal-association-type-id").val()==""){
			alert("please select association type first");
		}else if($("input#modal-association-type-id").val()==1){
			var query="select * from [location].[Location] where [Location Name] like '%"+$("input#association-search").val()+"%'";
		}else if($("input#modal-association-type-id").val()==2){
			var query="select * from [location].[Location] where [Location Type Id]=6 and [Location Name] like '%"+$("input#association-search").val()+"%'";
		}else if($("input#modal-association-type-id").val()==3){
			var query="select * from [location].[Location] where [Location Type Id]=2 and [Location Name] like '%"+$("input#association-search").val()+"%'";
		}
		
		var data={};
		data.title="add association-search location";
		data.message=query;
		
		$.ajax({
			type:'POST',
		    data:JSON.stringify(data),
			contentType:'application/json',
			url:'/executequery',
			success:function(data){
				console.log(data);
				$("ul#modal-association-search-dropdown").empty();
				for(var i=0;i<data.length;i++){
					$("ul#modal-association-search-dropdown").append("<li><a class='modal-association-search-item' id='"+(data[i])["Location Id"]+"'>"+(data[i])["Location Name"]+"</a></li>");
				}
				
				if(!$("button.search-dropdown-toggle").is(':visible')){
						$("button.search-dropdown-toggle").toggle();
				}
				
				$("a.modal-association-search-item").click(function(e){
		            $("input#modal-association-child-location-id").val(e.target.id);
					$("input#association-child-location-name").val($(e.target).text());
	            });
			}
		});
	});
	
	$("#add-new-association").click(function(e){
		console.log(url);
		var query="insert into [location].[Location Association] ([Location Association Type Id],[Parent Location Id],[Child Location Id],[Location Association Valid From],[Location Association Valid To]) values ("+$("input#modal-association-type-id").val()+","+url+","+$("input#modal-association-child-location-id").val()+","+"'2010-01-01 00:00:00:000'"+","+"'9999-01-01 00:00:00:000'"+")";
	    console.log(query);
		
		var data={};
		data.title="add association";
		data.message=query;
		
		$.ajax({
			type:'POST',
		    data:JSON.stringify(data),
			contentType:'application/json',
			url:'/executequery',
			success:function(data){
				console.log("success");
				location.reload();
			}
		});
	});
});