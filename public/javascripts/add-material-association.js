$(document).ready(function(e){
	$("button#association-search-button.btn.btn-default").click(function(e){
		console.log("click");
		if($("input#modal-association-type-id").val()==""){
			alert("please select association type first");
		}else if($("input#modal-association-type-id").val()==1){
			var query="select * from [material].[Material] where [Material Name] like '%"+$("input#association-search").val()+"%'";
		}else if($("input#modal-association-type-id").val()==2){
			var query="select * from [material].[Material] where [Material Type Id]=4 and [Material Name] like '%"+$("input#association-search").val()+"%'";
		}else if($("input#modal-association-type-id").val()==3){
			var query="select * from [material].[Material] where [Material Type Id]=5 and [Material Name] like '%"+$("input#association-search").val()+"%'";
		}else if($("input#modal-association-type-id").val()==4){
			var query="select * from [material].[Material] where [Material Type Id]=6 and [Material Name] like '%"+$("input#association-search").val()+"%'";
		}else if($("input#modal-association-type-id").val()==5){
			var query="select * from [material].[Material] where [Material Type Id]=7 and [Material Name] like '%"+$("input#association-search").val()+"%'";
		}
		
		var data={};
		data.title="add association-search material";
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
					$("ul#modal-association-search-dropdown").append("<li><a class='modal-association-search-item' id='"+(data[i])["Material Id"]+"'>"+(data[i])["Material Name"]+"</a></li>");
				}
				
				if(!$("button.search-dropdown-toggle").is(':visible')){
						$("button.search-dropdown-toggle").toggle();
				}
				
				$("a.modal-association-search-item").click(function(e){
		            $("input#modal-association-child-material-id").val(e.target.id);
					$("input#association-child-material-name").val($(e.target).text());
	            });
			}
		});
	});
	
	$("#add-new-association").click(function(e){
		console.log(url);
		var query="insert into [material].[Material Association] ([Material Association Type Id],[Parent Material Id],[Child Material Id],[Material Association Valid From],[Material Association Valid To]) values ("+$("input#modal-association-type-id").val()+","+url+","+$("input#modal-association-child-material-id").val()+","+"'2010-01-01 00:00:00:000'"+","+"'9999-01-01 00:00:00:000'"+")";
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