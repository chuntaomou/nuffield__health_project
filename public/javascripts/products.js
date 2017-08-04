$(document).ready(function(){
	$("#search-products-button").click(function(e){
		var search_by=$('#s_Region option:selected').attr("id");
		var search_type=$("#s_Category option:selected").attr("id");
		var search_text=$("input#search-criteria").val();
		
		if(search_by==1){
			if(search_type==9){
				var query="SELECT * FROM [product].[Product] WHERE [Product Name] LIKE '%"+search_text+"%'";
			}else{
				var query="SELECT * FROM [product].[Product] WHERE [Product Type Id]="+search_type+" AND [Product Name] LIKE '%"+search_text+"%'";
			}
		}else{
			if(search_type==9){
				var query="SELECT * FROM [product].[Product] WHERE [Product Code] LIKE '%"+search_text+"%'";
			}else{
				var query="SELECT * FROM [product].[Product] WHERE [Product Type Id]="+search_type+" AND [Product Code] LIKE '%"+search_text+"%'";
			}
		}
		
		var data={};
		data.title="search products";
		data.message=query;
		
		$.ajax({
			type: 'POST',
			data: JSON.stringify(data),
			contentType: 'application/json',
			url: 'http://localhost:3000/searchproduct',
			success: function(data){
				console.log(JSON.stringify(data));
				$("#search-result-list").empty();
				for(var i=0;i<data.length;i++){
					$("#search-result-list").append("<div class='job result' style='border-bottom: 1px solid #e0dfe0; padding-left: 40px; padding-top: 30px; padding-bottom:30px;'><h3 class='title'>"+(data[i])["Product Name"]+"</h3><p class='info'><span>Product Id: "+(data[i])["Product Id"]+"</span><span class='seperator'>|</span><span>Product Code: "+(data[i])["Product Code"]+"</span><span class='seperator'>|</span><span>Product Label: "+(data[i])["Product Label"]+"</span></p><div class='action'><a href='/product-info#product-id:"+(data[i])["Product Id"]+"' class='button forward go'>View more details</a></div></div>");
				}
				
				$("button.update-filters").click(function(e){
		          //console.log("click update");
				  var update_type=$("#s_ContractType.filterSelect option:selected").attr("value");
				  var keyword=$("input#filter-search-criteria").val();
				  
				  if(update_type==9){
					  var query="select * from [temp] where [Product Name] like '%"+keyword+"%'";
				  }else{
					  var query="select * from [temp] where [Product Type Id]="+update_type+" and [Product Name] like '%"+keyword+"%'";
				  }
				  
				  var data={};
				  data.title="update search result";
				  data.message=query;
				  
				  $.ajax({
					  type: 'POST',
					  data: JSON.stringify(data),
					  contentType: 'application/json',
					  url: 'http://localhost:3000/updatesearchresult',
					  success: function(data){
						  //console.log(data);
						  $("#search-result-list").empty();
						  //$("#search-result-list").remove();
				          //$("#search-result-list.module-canvas").append("<div id='search-result-list' class='job-results-list'></div>");        
						  for(var i=0;i<data.length;i++){
							  $("#search-result-list").append("<div class='job result' style='border-bottom: 1px solid #e0dfe0; padding-left: 40px; padding-top: 30px; padding-bottom:30px;'><h3 class='title'>"+(data[i])["Product Name"]+"</h3><p class='info'><span>Product Id: "+(data[i])["Product Id"]+"</span><span class='seperator'>|</span><span>Product Code: "+(data[i])["Product Code"]+"</span><span class='seperator'>|</span><span>Product Label: "+(data[i])["Product Label"]+"</span></p><div class='action'><a href='#' class='button forward go'>View more details</a></div></div>");
						  }
					  }
				  });
	            });
	
	            $("button.clear-filters").click(function(e){
				  str=null;
		          $("input#filter-search-criteria").val(str);
	            });
			}
		});
	});
});
