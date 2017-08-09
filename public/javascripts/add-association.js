$(document).ready(function(e){
	$("button#association-search-button.btn.btn-default").click(function(e){
		console.log("click");
		if($("input#modal-association-type-id").val()==""){
			alert("please select association type first");
		}else if($("input#modal-association-type-id").val()==3){
			var query="select * from [product].[Product] where [Product Type Id]=1 and [Product Name] like '%"+$("input#association-search").val()+"%'";
		}else if($("input#modal-association-type-id").val()==4){
			var query="select * from [product].[Product] where [Product Type Id]=2 and [Product Name] like '%"+$("input#association-search").val()+"%'";
		}else if($("input#modal-association-type-id").val()==5){
			var query="select * from [product].[Product] where [Product Type Id]=3 and [Product Name] like '%"+$("input#association-search").val()+"%'";
		}else if($("input#modal-association-type-id").val()==6){
			var query="select * from [product].[Product] where [Product Type Id]=7 and [Product Name] like '%"+$("input#association-search").val()+"%'";
		}else if($("input#modal-association-type-id").val()==7){
			var query="select * from [product].[Product] where [Product Type Id]=1 and [Product Name] like '%"+$("input#association-search").val()+"%'";
		}else if($("input#modal-association-type-id").val()==9){
			var query="select * from [product].[Product] where [Product Type Id]=1 and [Product Name] like '%"+$("input#association-search").val()+"%'";
		}else{
			var query="select * from [product].[Product] where [Product Name] like '%"+$("input#association-search").val()+"%'";
		}
		
		var data={};
		data.title="add association-search product";
		data.message=query;
		
		$.ajax({
			type:'POST',
		    data:JSON.stringify(data),
			contentType:'application/json',
			url:'http://localhost:3000/executequery',
			success:function(data){
				console.log(data);
				$("ul#modal-association-search-dropdown").empty();
				for(var i=0;i<data.length;i++){
					$("ul#modal-association-search-dropdown").append("<li><a class='modal-association-search-item' id='"+(data[i])["Product Id"]+"'>"+(data[i])["Product Name"]+"</a></li>");
				}
				
				if(!$("button.search-dropdown-toggle").is(':visible')){
						$("button.search-dropdown-toggle").toggle();
				}
				
				$("a.modal-association-search-item").click(function(e){
		            $("input#modal-association-child-product-id").val(e.target.id);
					$("input#association-child-product-name").val($(e.target).text());
	            });
			}
		});
	});
	
	$("#add-new-association").click(function(e){
		console.log(url);
		var query="insert into [product].[Product Association] ([Product Association Type Id],[Parent Product Id],[Child Product Id],[Product Association Valid From],[Product Association Valid To]) values ("+$("input#modal-association-type-id").val()+","+url+","+$("input#modal-association-child-product-id").val()+","+"'2010-01-01 00:00:00:000'"+","+"'9999-01-01 00:00:00:000'"+")";
	    console.log(query);
		
		var data={};
		data.title="add association";
		data.message=query;
		
		$.ajax({
			type:'POST',
		    data:JSON.stringify(data),
			contentType:'application/json',
			url:'http://localhost:3000/executequery',
			success:function(data){
				console.log("success");
				location.reload();
			}
		});
	});
});
