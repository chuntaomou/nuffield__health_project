$(function(){
	$(".btn.btn-default.dropdown-toggle").click(function(e){
		if($(".btn.btn-default.dropdown-toggle").css("background-color")==="rgb(255, 255, 255)"){
			//console.log("clicked");
			$(".btn.btn-default.dropdown-toggle").css({"background-color":"red","color":"white"});
		}else{
			$(".btn.btn-default.dropdown-toggle").css({"background-color":"rgb(255, 255, 255)","color":"black"});
		}
	});
	
	$("#search_name").click(function(e){
		$("#search_input").attr("placeholder","Search product name...");
	});
	
	$("#search_code").click(function(e){
		$("#search_input").attr("placeholder","Search product code...");
	});
	
	$("#search_button").click(function(e){
		var input=$("#search_input").val();
		if($("#search_name").is(":checked")){
			var search_item="[Product Name]";
		}else if($("#search_code").is(":checked")){
			var search_item="[Product Code]";
		}
		var data={};
		$(".result-info").remove();
		data.title=search_item;
		data.message=input;
		$.ajax({
			type: 'POST',
			data: JSON.stringify(data),
			contentType: 'application/json',
			url: 'http://localhost:3000/searchproduct',
			success: function(data){
				$(".result-info").remove();
				console.log("success");
				
				//show type buttons
				var button_num=data[0].length;
				for(var i=0;i<button_num;i++){
					console.log(((data[0])[i])["Product Type Id"]);
					$("#type-button-col").append("<button class='btn btn-default search-type-button' id='"+((data[0])[i])['Product Type Id']+"'>"+((data[0])[i])['Product Type Name']+"</button>");
				}
				
				var current_type_id=((data[0])[0])["Product Type Id"];
				
				//show products table
				var product_num=data[1].length;
				for(var i=0;i<product_num;i++){
					var item=(data[1])[i];
					if(item["Product Type Id"]==current_type_id){
						$("#items-after-search").append("<tr>");
					    $("#items-after-search").append("<td class='result-info'>"+item["Product Type Id"]+"</td>");
					    $("#items-after-search").append("<td class='result-info'>"+item["Product Name"]+"</td>");
					    $("#items-after-search").append("<td class='result-info'>"+item["Product Valid From"]+"</td>");
					    $("#items-after-search").append("<td class='result-info'>"+item["Product Valid To"]+"</td>");
					    $("#items-after-search").append("<td class='result-info'><a class='btn btn-default to-product-info' id='"+item['Product Id']+"' href='/product-info#product-id:"+item['Product Id']+"'><span class='glyphicon glyphicon-pencil' style='width:60px;'></span>Edit</a></td>");
					    $("#items-after-search").append("</tr>");
					}
				}
				
				$(".btn.btn-default.search-type-button").click(function(e){
					$(".result-info").remove();
					var current_type_id=e.target.id;
					for(var i=0;i<product_num;i++){
						var item=(data[1])[i];
						if(item["Product Type Id"]==current_type_id){
							$("#items-after-search").append("<tr>");
					        $("#items-after-search").append("<td class='result-info'>"+item["Product Type Id"]+"</td>");
					        $("#items-after-search").append("<td class='result-info'>"+item["Product Name"]+"</td>");
					        $("#items-after-search").append("<td class='result-info'>"+item["Product Valid From"]+"</td>");
					        $("#items-after-search").append("<td class='result-info'>"+item["Product Valid To"]+"</td>");
					        $("#items-after-search").append("<td class='result-info'><a class='btn btn-default to-product-info' id='"+item['Product Id']+"' href='/product-info#product-id:"+item['Product Id']+"'><span class='glyphicon glyphicon-pencil' style='width:60px;'></span>Edit</a></td>");
					        $("#items-after-search").append("</tr>");
						}
					}
				});		
				$("#search-result-panel").show();
			}
		});
	});
	
	
	/*
	$("#search_button").click(function(e){
		var input=$("#search_input").val();
		if($("#search_name").is(":checked")){
			var search_item="[Product Name]";
		}else if($("#search_code").is(":checked")){
			var search_item="[Product Code]";
		}
		var data={};
		$(".result-info").remove();
		data.title=search_item;
		data.message=input;
		$.ajax({
			type: 'POST',
			data: JSON.stringify(data),
			contentType: 'application/json',
			url: 'http://localhost:3000/searchproduct',
			success: function(data){
				console.log("success");
				console.log(JSON.stringify(data));
				var left=data.length%20;
				var totalpage=(data.length-left)/20+1;
				var length=0;
				if((totalpage==1)&&(left>0)){
					length=left;
					console.log(length);
				}else{
					length=20;
					console.log(length);
				}
				for(var i=0;i<length;i++){
					var item=data[i];
					$("#items-after-search").append("<tr>");
					$("#items-after-search").append("<td class='result-info'>"+item["Product Code"]+"</td>");
					$("#items-after-search").append("<td class='result-info'>"+item["Product Name"]+"</td>");
					$("#items-after-search").append("<td class='result-info'>"+item["Product Valid From"]+"</td>");
					$("#items-after-search").append("<td class='result-info'>"+item["Product Valid To"]+"</td>");
					$("#items-after-search").append("<td class='result-info'><button class='btn btn-primary btn-xs' style='height:25px;'><span class='glyphicon glyphicon-pencil' style='width:60px;'></span></button></td>");
					$("#items-after-search").append("</tr>");
				}
				
				$(function(){
					$("#results-pagination").pagination({
						items: data.length,
						itemsOnPage: 20,
						cssStyle: 'light-theme'
					});
				});
				
				$(document).ready(function(){
			       $(window).bind('hashchange',function(e){
				      var anchor=JSON.stringify(document.location.hash);
				      var temp1=anchor.replace('"','');
                      var temp2=temp1.replace('"','');
                      var pagenumberstring=temp2.replace('#page-','');
                      var pagenumber=parseInt(pagenumberstring);
				      if((pagenumber==totalpage)&&(left>0)){
					     $(".result-info").remove();
					     var bottom=(pagenumber-1)*20;
                         var top=left+bottom;
					     for(var i=bottom;i<top;i++){
						     var item=data[i];
                             $("#items-after-search").append("<tr>");
                             $("#items-after-search").append("<td class='result-info'>"+item["Product Code"]+"</td>");
                             $("#items-after-search").append("<td class='result-info'>"+item["Product Name"]+"</td>");
                             $("#items-after-search").append("<td class='result-info'>"+item["Product Valid From"]+"</td>");
                             $("#items-after-search").append("<td class='result-info'>"+item["Product Valid To"]+"</td>");
                             $("#items-after-search").append("<td class='result-info'><button class='btn btn-primary btn-xs' style='height:25px;'><span class='glyphicon glyphicon-pencil' style='width:60px;'></span></button></td>");
                             $("#items-after-search").append("</tr>");
					        }
				        }else{
					         $(".result-info").remove();
                             var bottom=(pagenumber-1)*20;
                             var top=pagenumber*20;
                             for(var i=bottom;i<top;i++){
						         var item=data[i];
                                 $("#items-after-search").append("<tr>");
                                 $("#items-after-search").append("<td class='result-info'>"+item["Product Code"]+"</td>");
                                 $("#items-after-search").append("<td class='result-info'>"+item["Product Name"]+"</td>");
                                 $("#items-after-search").append("<td class='result-info'>"+item["Product Valid From"]+"</td>");
                                 $("#items-after-search").append("<td class='result-info'>"+item["Product Valid To"]+"</td>");
                                 $("#items-after-search").append("<td class='result-info'><button class='btn btn-primary btn-xs' style='height:25px;'><span class='glyphicon glyphicon-pencil' style='width:60px;'></span></button></td>");
                                 $("#items-after-search").append("</tr>");
					            }
				            }
			        });
		        });
				$("#search-result-panel").show();
			}
		});
	});
	*/
});