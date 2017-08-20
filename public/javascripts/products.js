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
			//url: 'https://localhost:55555/searchproduct',
			url: '/searchproduct',
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
					$("#search-result-list").append("<div class='job result' style='border-bottom: 1px solid #e0dfe0; padding-left: 40px; padding-top: 30px; padding-bottom:30px;'><h3 class='title'>"+(data[i])["Product Name"]+"</h3><p class='info'><span>Product Id: "+(data[i])["Product Id"]+"</span><span class='seperator'>|</span><span>Product Code: "+(data[i])["Product Code"]+"</span><span class='seperator'>|</span><span>Product Label: "+(data[i])["Product Label"]+"</span><span class='seperator'>|</span><span><a id='"+(data[i])["Product Id"]+"' class='see-association'>See related products</a></span></p><div class='action'><a href='/product-info#product-id:"+(data[i])["Product Id"]+"' class='button forward go'>View more details</a></div></div><div id='"+(data[i])["Product Id"]+"' class='job result' style='border-bottom: 1px solid #e0dfe0; padding-left: 40px; padding-top: 30px; padding-bottom:30px; display:none;'></div>");
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
					  url: '/updatesearchresult',
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
					         $("#search-result-list").append("<div class='job result' style='border-bottom: 1px solid #e0dfe0; padding-left: 40px; padding-top: 30px; padding-bottom:30px;'><h3 class='title'>"+(data[i])["Product Name"]+"</h3><p class='info'><span>Product Id: "+(data[i])["Product Id"]+"</span><span class='seperator'>|</span><span>Product Code: "+(data[i])["Product Code"]+"</span><span class='seperator'>|</span><span>Product Label: "+(data[i])["Product Label"]+"</span><span class='seperator'>|</span><span><a id='"+(data[i])["Product Id"]+"' class='see-association'>See related products</a></span></p><div class='action'><a href='/product-info#product-id:"+(data[i])["Product Id"]+"' class='button forward go'>View more details</a></div></div><div id='"+(data[i])["Product Id"]+"' class='job result' style='border-bottom: 1px solid #e0dfe0; padding-left: 40px; padding-top: 30px; padding-bottom:30px; display:none;'></div>");
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
						  
						  $("a.see-association").click(function(e){
		                     var query="select b.* ,a1.[Product Name] as [Parent Product Name],a2.[Product Name] as [Child Product Name] from [product].[Product Association] as b left join [product].[Product] as a1 on a1.[Product Id]=b.[Parent Product Id] left join [product].[Product] as a2 on a2.[Product Id]=b.[Child Product Id] where b.[Parent Product Id]="+e.target.id+" or b.[Child Product Id]="+e.target.id;
				             var data={};
				             data.title="find related products";
				             data.message=query;
				   
				             $.ajax({
					           type: 'POST',
					           data: JSON.stringify(data),
					           contentType: 'application/json',
					           url: '/executequery',
					           success: function(data){
						         console.log(JSON.stringify(data));
						   
						         if(data.length==0){
							       $("#"+e.target.id+".job.result").toggle();
							       $("#"+e.target.id+".job.result").append("<h3 class='title'>No related product</h3>");
						         }else{
							       $("#"+e.target.id+".job.result").toggle();
							       for(var i=0;i<data.length;i++){
								     if((data[i])["Parent Product Id"]==e.target.id){
									   $("#"+e.target.id+".job.result").append("<h3 class='title'>Child Product of "+(data[i])["Parent Product Name"]+": "+(data[i])["Child Product Name"]+"</h3><p class='info'><span>Product Id: "+(data[i])["Child Product Id"]+"</span></p><div class='action'><a href='/product-info#product-id:"+(data[i])["Child Product Id"]+"' class='button forward go'>View more details</a></div>");
								     }else{
									   $("#"+e.target.id+".job.result").append("<h3 class='title'>Parent Product of "+(data[i])["Child Product Name"]+": "+(data[i])["Parent Product Name"]+"</h3><p class='info'><span>Product Id: "+(data[i])["Parent Product Id"]+"</span></p><div class='action'><a href='/product-info#product-id:"+(data[i])["Parent Product Id"]+"' class='button forward go'>View more details</a></div>");
								     }
							        }
						          }
					            }
				             });
	                       });
					    }
				   });
	            });
				
				$("a.see-association").click(function(e){
		           var query="select b.* ,a1.[Product Name] as [Parent Product Name],a2.[Product Name] as [Child Product Name] from [product].[Product Association] as b left join [product].[Product] as a1 on a1.[Product Id]=b.[Parent Product Id] left join [product].[Product] as a2 on a2.[Product Id]=b.[Child Product Id] where b.[Parent Product Id]="+e.target.id+" or b.[Child Product Id]="+e.target.id;
				   var data={};
				   data.title="find related products";
				   data.message=query;
				   
				   $.ajax({
					   type: 'POST',
					   data: JSON.stringify(data),
					   contentType: 'application/json',
					   url: '/executequery',
					   success: function(data){
						   console.log(JSON.stringify(data));
						   
						   if(data.length==0){
							   $("#"+e.target.id+".job.result").toggle();
							   $("#"+e.target.id+".job.result").append("<h3 class='title'>No related product</h3>");
						   }else{
							   $("#"+e.target.id+".job.result").toggle();
							   for(var i=0;i<data.length;i++){
								   if((data[i])["Parent Product Id"]==e.target.id){
									   $("#"+e.target.id+".job.result").append("<h3 class='title'>Child Product of "+(data[i])["Parent Product Name"]+": "+(data[i])["Child Product Name"]+"</h3><p class='info'><span>Product Id: "+(data[i])["Child Product Id"]+"</span></p><div class='action'><a href='/product-info#product-id:"+(data[i])["Child Product Id"]+"' class='button forward go'>View more details</a></div>");
								   }else{
									   $("#"+e.target.id+".job.result").append("<h3 class='title'>Parent Product of "+(data[i])["Child Product Name"]+": "+(data[i])["Parent Product Name"]+"</h3><p class='info'><span>Product Id: "+(data[i])["Parent Product Id"]+"</span></p><div class='action'><a href='/product-info#product-id:"+(data[i])["Parent Product Id"]+"' class='button forward go'>View more details</a></div>");
								   }
							   }
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
				$("#search-result-list").append("<div class='job result' style='border-bottom: 1px solid #e0dfe0; padding-left: 40px; padding-top: 30px; padding-bottom:30px;'><h3 class='title'>"+(tempdata[i])["Product Name"]+"</h3><p class='info'><span>Product Id: "+(tempdata[i])["Product Id"]+"</span><span class='seperator'>|</span><span>Product Code: "+(tempdata[i])["Product Code"]+"</span><span class='seperator'>|</span><span>Product Label: "+(tempdata[i])["Product Label"]+"</span><span class='seperator'>|</span><span><a id='"+(tempdata[i])["Product Id"]+"' class='see-association'>See related products</a></span></p><div class='action'><a href='/product-info#product-id:"+(tempdata[i])["Product Id"]+"' class='button forward go'>View more details</a></div></div><div id='"+(tempdata[i])["Product Id"]+"' class='job result' style='border-bottom: 1px solid #e0dfe0; padding-left: 40px; padding-top: 30px; padding-bottom:30px; display:none;'></div>");
			}
		}else{
			$("#search-result-list").empty();
			var bottom=(pagenumber-1)*10;
            var top=pagenumber*10;
			for(var i=bottom;i<top;i++){
				$("#search-result-list").append("<div class='job result' style='border-bottom: 1px solid #e0dfe0; padding-left: 40px; padding-top: 30px; padding-bottom:30px;'><h3 class='title'>"+(tempdata[i])["Product Name"]+"</h3><p class='info'><span>Product Id: "+(tempdata[i])["Product Id"]+"</span><span class='seperator'>|</span><span>Product Code: "+(tempdata[i])["Product Code"]+"</span><span class='seperator'>|</span><span>Product Label: "+(tempdata[i])["Product Label"]+"</span><span class='seperator'>|</span><span><a id='"+(tempdata[i])["Product Id"]+"' class='see-association'>See related products</a></span></p><div class='action'><a href='/product-info#product-id:"+(tempdata[i])["Product Id"]+"' class='button forward go'>View more details</a></div></div><div id='"+(tempdata[i])["Product Id"]+"' class='job result' style='border-bottom: 1px solid #e0dfe0; padding-left: 40px; padding-top: 30px; padding-bottom:30px; display:none;'></div>");
			}
		}
		
		$("a.see-association").click(function(e){
		   var query="select b.* ,a1.[Product Name] as [Parent Product Name],a2.[Product Name] as [Child Product Name] from [product].[Product Association] as b left join [product].[Product] as a1 on a1.[Product Id]=b.[Parent Product Id] left join [product].[Product] as a2 on a2.[Product Id]=b.[Child Product Id] where b.[Parent Product Id]="+e.target.id+" or b.[Child Product Id]="+e.target.id;
		   var data={};
		   data.title="find related products";
		   data.message=query;
				   
		   $.ajax({
		      type: 'POST',
			  data: JSON.stringify(data),
			  contentType: 'application/json',
			  url: '/executequery',
			  success: function(data){
			     console.log(JSON.stringify(data));
						   
				 if(data.length==0){
				    $("#"+e.target.id+".job.result").toggle();
					$("#"+e.target.id+".job.result").append("<h3 class='title'>No related product</h3>");
				 }else{
					$("#"+e.target.id+".job.result").toggle();
				    for(var i=0;i<data.length;i++){
					   if((data[i])["Parent Product Id"]==e.target.id){
					      $("#"+e.target.id+".job.result").append("<h3 class='title'>Child Product of "+(data[i])["Parent Product Name"]+": "+(data[i])["Child Product Name"]+"</h3><p class='info'><span>Product Id: "+(data[i])["Child Product Id"]+"</span></p><div class='action'><a href='/product-info#product-id:"+(data[i])["Child Product Id"]+"' class='button forward go'>View more details</a></div>");
					   }else{
						  $("#"+e.target.id+".job.result").append("<h3 class='title'>Parent Product of "+(data[i])["Child Product Name"]+": "+(data[i])["Parent Product Name"]+"</h3><p class='info'><span>Product Id: "+(data[i])["Parent Product Id"]+"</span></p><div class='action'><a href='/product-info#product-id:"+(data[i])["Parent Product Id"]+"' class='button forward go'>View more details</a></div>");
					   }
					}
				 }
			  }
		    });
	    });
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
			url: '/searchproduct',
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
					$("#search-result-list").append("<div class='job result' style='border-bottom: 1px solid #e0dfe0; padding-left: 40px; padding-top: 30px; padding-bottom:30px;'><h3 class='title'>"+(data[i])["Product Name"]+"</h3><p class='info'><span>Product Id: "+(data[i])["Product Id"]+"</span><span class='seperator'>|</span><span>Product Code: "+(data[i])["Product Code"]+"</span><span class='seperator'>|</span><span>Product Label: "+(data[i])["Product Label"]+"</span><span class='seperator'>|</span><span><a id='"+(data[i])["Product Id"]+"' class='see-association'>See related products</a></span></p><div class='action'><a href='/product-info#product-id:"+(data[i])["Product Id"]+"' class='button forward go'>View more details</a></div></div><div id='"+(data[i])["Product Id"]+"' class='job result' style='border-bottom: 1px solid #e0dfe0; padding-left: 40px; padding-top: 30px; padding-bottom:30px; display:none;'></div>");
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
				
				$("a.see-association").click(function(e){
		           var query="select b.* ,a1.[Product Name] as [Parent Product Name],a2.[Product Name] as [Child Product Name] from [product].[Product Association] as b left join [product].[Product] as a1 on a1.[Product Id]=b.[Parent Product Id] left join [product].[Product] as a2 on a2.[Product Id]=b.[Child Product Id] where b.[Parent Product Id]="+e.target.id+" or b.[Child Product Id]="+e.target.id;
		           var data={};
		           data.title="find related products";
		           data.message=query;
				   
		           $.ajax({
		             type: 'POST',
			         data: JSON.stringify(data),
			         contentType: 'application/json',
			         url: '/executequery',
			         success: function(data){
			           console.log(JSON.stringify(data));
						   
				       if(data.length==0){
				         $("#"+e.target.id+".job.result").toggle();
					     $("#"+e.target.id+".job.result").append("<h3 class='title'>No related product</h3>");
				       }else{
					     $("#"+e.target.id+".job.result").toggle();
				         for(var i=0;i<data.length;i++){
					     if((data[i])["Parent Product Id"]==e.target.id){
					       $("#"+e.target.id+".job.result").append("<h3 class='title'>Child Product of "+(data[i])["Parent Product Name"]+": "+(data[i])["Child Product Name"]+"</h3><p class='info'><span>Product Id: "+(data[i])["Child Product Id"]+"</span></p><div class='action'><a href='/product-info#product-id:"+(data[i])["Child Product Id"]+"' class='button forward go'>View more details</a></div>");
					     }else{
						   $("#"+e.target.id+".job.result").append("<h3 class='title'>Parent Product of "+(data[i])["Child Product Name"]+": "+(data[i])["Parent Product Name"]+"</h3><p class='info'><span>Product Id: "+(data[i])["Parent Product Id"]+"</span></p><div class='action'><a href='/product-info#product-id:"+(data[i])["Parent Product Id"]+"' class='button forward go'>View more details</a></div>");
					      }
					     }
				       }
			         }
		           });
	            });
				
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
					  url: '/updatesearchresult',
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
					         $("#search-result-list").append("<div class='job result' style='border-bottom: 1px solid #e0dfe0; padding-left: 40px; padding-top: 30px; padding-bottom:30px;'><h3 class='title'>"+(data[i])["Product Name"]+"</h3><p class='info'><span>Product Id: "+(data[i])["Product Id"]+"</span><span class='seperator'>|</span><span>Product Code: "+(data[i])["Product Code"]+"</span><span class='seperator'>|</span><span>Product Label: "+(data[i])["Product Label"]+"</span><span class='seperator'>|</span><span><a id='"+(data[i])["Product Id"]+"' class='see-association'>See related products</a></span></p><div class='action'><a href='/product-info#product-id:"+(data[i])["Product Id"]+"' class='button forward go'>View more details</a></div></div><div id='"+(data[i])["Product Id"]+"' class='job result' style='border-bottom: 1px solid #e0dfe0; padding-left: 40px; padding-top: 30px; padding-bottom:30px; display:none;'></div>");
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
						  
						  $("a.see-association").click(function(e){
		                    var query="select b.* ,a1.[Product Name] as [Parent Product Name],a2.[Product Name] as [Child Product Name] from [product].[Product Association] as b left join [product].[Product] as a1 on a1.[Product Id]=b.[Parent Product Id] left join [product].[Product] as a2 on a2.[Product Id]=b.[Child Product Id] where b.[Parent Product Id]="+e.target.id+" or b.[Child Product Id]="+e.target.id;
		                    var data={};
		                    data.title="find related products";
		                    data.message=query;
				   
		                    $.ajax({
		                      type: 'POST',
			                  data: JSON.stringify(data),
			                  contentType: 'application/json',
			                  url: '/executequery',
			                  success: function(data){
			                    console.log(JSON.stringify(data));
						   
				                if(data.length==0){
				                  $("#"+e.target.id+".job.result").toggle();
					              $("#"+e.target.id+".job.result").append("<h3 class='title'>No related product</h3>");
				                }else{
					              $("#"+e.target.id+".job.result").toggle();
				                  for(var i=0;i<data.length;i++){
					                if((data[i])["Parent Product Id"]==e.target.id){
					                  $("#"+e.target.id+".job.result").append("<h3 class='title'>Child Product of "+(data[i])["Parent Product Name"]+": "+(data[i])["Child Product Name"]+"</h3><p class='info'><span>Product Id: "+(data[i])["Child Product Id"]+"</span></p><div class='action'><a href='/product-info#product-id:"+(data[i])["Child Product Id"]+"' class='button forward go'>View more details</a></div>");
					                }else{
						              $("#"+e.target.id+".job.result").append("<h3 class='title'>Parent Product of "+(data[i])["Child Product Name"]+": "+(data[i])["Parent Product Name"]+"</h3><p class='info'><span>Product Id: "+(data[i])["Parent Product Id"]+"</span></p><div class='action'><a href='/product-info#product-id:"+(data[i])["Parent Product Id"]+"' class='button forward go'>View more details</a></div>");
					                }
					              }
				                }
			                  }
		                    });
	                      });
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
