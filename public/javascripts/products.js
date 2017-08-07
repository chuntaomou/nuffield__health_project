$(document).ready(function(){
	var tempdata=null;
	var temptotalpage=0;
	var templeft=0;
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
				tempdata=data;
				console.log(JSON.stringify(data));
				$("#search-result-list").empty();
				
				var left=data.length%10;
				templeft=left;
				var totalpage=(data.length-left)/10+1;
				temptotalpage=totalpage;
				var length=0;
				if((totalpage==1)&&(left>0)){
					length=left;
                    console.log(length);
				}else{
					length=10;
                    console.log(length);
				}
				
				for(var i=0;i<length;i++){
					$("#search-result-list").append("<div class='job result' style='border-bottom: 1px solid #e0dfe0; padding-left: 40px; padding-top: 30px; padding-bottom:30px;'><h3 class='title'>"+(data[i])["Product Name"]+"</h3><p class='info'><span>Product Id: "+(data[i])["Product Id"]+"</span><span class='seperator'>|</span><span>Product Code: "+(data[i])["Product Code"]+"</span><span class='seperator'>|</span><span>Product Label: "+(data[i])["Product Label"]+"</span></p><div class='action'><a href='/product-info#product-id:"+(data[i])["Product Id"]+"' class='button forward go'>View more details</a></div></div>");
				}
				
				$("#pagination").pagination({
					items: data.length,
					itemsOnPage: 10,
					cssStyle: 'light-theme'
				});
				
				if(!$("#show-search-result").is(':visible')){
					//console.log("invisible");
					$("#show-search-result").toggle();
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
						  tempdata=data;
						  //console.log(data);
						  $("#search-result-list").empty();
						  
						  var left=data.length%10;
				          templeft=left;
				          var totalpage=(data.length-left)/10+1;
				          temptotalpage=totalpage;
				          var length=0;
				          if((totalpage==1)&&(left>0)){
					         length=left;
                             console.log(length);
				          }else{
					         length=10;
                             console.log(length);
				          }
				
				          for(var i=0;i<length;i++){
					         $("#search-result-list").append("<div class='job result' style='border-bottom: 1px solid #e0dfe0; padding-left: 40px; padding-top: 30px; padding-bottom:30px;'><h3 class='title'>"+(data[i])["Product Name"]+"</h3><p class='info'><span>Product Id: "+(data[i])["Product Id"]+"</span><span class='seperator'>|</span><span>Product Code: "+(data[i])["Product Code"]+"</span><span class='seperator'>|</span><span>Product Label: "+(data[i])["Product Label"]+"</span></p><div class='action'><a href='/product-info#product-id:"+(data[i])["Product Id"]+"' class='button forward go'>View more details</a></div></div>");
				          }
				
						  $("#pagination").pagination({
					        items: data.length,
					        itemsOnPage: 10,
					        cssStyle: 'light-theme'
				          });
				
				          if(!$("#show-search-result").is(':visible')){
					         //console.log("invisible");
					         $("#show-search-result").toggle();
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
	
	$(window).bind('hashchange',function(e){
		var anchor=JSON.stringify(document.location.hash);
        var temp1=anchor.replace('"','');
        var temp2=temp1.replace('"','');
        var pagenumberstring=temp2.replace('#page-','');
        var pagenumber=parseInt(pagenumberstring);
		
		if((pagenumber==temptotalpage)&&(left>0)){
			$("#search-result-list").empty();
			var bottom=(pagenumber-1)*10;
            var top=templeft+bottom;
			for(var i=bottom;i<top;i++){
				$("#search-result-list").append("<div class='job result' style='border-bottom: 1px solid #e0dfe0; padding-left: 40px; padding-top: 30px; padding-bottom:30px;'><h3 class='title'>"+(tempdata[i])["Product Name"]+"</h3><p class='info'><span>Product Id: "+(tempdata[i])["Product Id"]+"</span><span class='seperator'>|</span><span>Product Code: "+(tempdata[i])["Product Code"]+"</span><span class='seperator'>|</span><span>Product Label: "+(tempdata[i])["Product Label"]+"</span></p><div class='action'><a href='/product-info#product-id:"+(tempdata[i])["Product Id"]+"' class='button forward go'>View more details</a></div></div>");
			}
		}else{
			$("#search-result-list").empty();
			var bottom=(pagenumber-1)*10;
            var top=pagenumber*10;
			for(var i=bottom;i<top;i++){
				$("#search-result-list").append("<div class='job result' style='border-bottom: 1px solid #e0dfe0; padding-left: 40px; padding-top: 30px; padding-bottom:30px;'><h3 class='title'>"+(tempdata[i])["Product Name"]+"</h3><p class='info'><span>Product Id: "+(tempdata[i])["Product Id"]+"</span><span class='seperator'>|</span><span>Product Code: "+(tempdata[i])["Product Code"]+"</span><span class='seperator'>|</span><span>Product Label: "+(tempdata[i])["Product Label"]+"</span></p><div class='action'><a href='/product-info#product-id:"+(tempdata[i])["Product Id"]+"' class='button forward go'>View more details</a></div></div>");
			}
		}
	});
	
	$("a.product-type").click(function(e){
		console.log(e.target.id);
		var query="SELECT * FROM [product].[Product] WHERE [Product Type Id]="+e.target.id;
		
		var data={};
		data.title="search products";
		data.message=query;
		
		$.ajax({
			type: 'POST',
			data: JSON.stringify(data),
			contentType: 'application/json',
			url: 'http://localhost:3000/searchproduct',
			success: function(data){
				tempdata=data;
				console.log(JSON.stringify(data));
				$("#search-result-list").empty();
				
				var left=data.length%10;
				templeft=left;
				var totalpage=(data.length-left)/10+1;
				temptotalpage=totalpage;
				var length=0;
				if((totalpage==1)&&(left>0)){
					length=left;
                    console.log(length);
				}else{
					length=10;
                    console.log(length);
				}
				
				for(var i=0;i<length;i++){
					$("#search-result-list").append("<div class='job result' style='border-bottom: 1px solid #e0dfe0; padding-left: 40px; padding-top: 30px; padding-bottom:30px;'><h3 class='title'>"+(data[i])["Product Name"]+"</h3><p class='info'><span>Product Id: "+(data[i])["Product Id"]+"</span><span class='seperator'>|</span><span>Product Code: "+(data[i])["Product Code"]+"</span><span class='seperator'>|</span><span>Product Label: "+(data[i])["Product Label"]+"</span></p><div class='action'><a href='/product-info#product-id:"+(data[i])["Product Id"]+"' class='button forward go'>View more details</a></div></div>");
				}
				
				$("#pagination").pagination({
					items: data.length,
					itemsOnPage: 10,
					cssStyle: 'light-theme'
				});
				
				if(!$("#show-search-result").is(':visible')){
					//console.log("invisible");
					$("#show-search-result").toggle();
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
						  tempdata=data;
						  //console.log(data);
						  $("#search-result-list").empty();
						  
						  var left=data.length%10;
				          templeft=left;
				          var totalpage=(data.length-left)/10+1;
				          temptotalpage=totalpage;
				          var length=0;
				          if((totalpage==1)&&(left>0)){
					         length=left;
                             console.log(length);
				          }else{
					         length=10;
                             console.log(length);
				          }
				
				          for(var i=0;i<length;i++){
					         $("#search-result-list").append("<div class='job result' style='border-bottom: 1px solid #e0dfe0; padding-left: 40px; padding-top: 30px; padding-bottom:30px;'><h3 class='title'>"+(data[i])["Product Name"]+"</h3><p class='info'><span>Product Id: "+(data[i])["Product Id"]+"</span><span class='seperator'>|</span><span>Product Code: "+(data[i])["Product Code"]+"</span><span class='seperator'>|</span><span>Product Label: "+(data[i])["Product Label"]+"</span></p><div class='action'><a href='/product-info#product-id:"+(data[i])["Product Id"]+"' class='button forward go'>View more details</a></div></div>");
				          }
				
						  $("#pagination").pagination({
					        items: data.length,
					        itemsOnPage: 10,
					        cssStyle: 'light-theme'
				          });
				
				          if(!$("#show-search-result").is(':visible')){
					         //console.log("invisible");
					         $("#show-search-result").toggle();
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
