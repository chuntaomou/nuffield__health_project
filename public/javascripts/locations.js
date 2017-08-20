$(document).ready(function(){
	var tempdata=null;
	var temptotalpage=0;
	var templeft=0;
	var templength=0;
	$("#search-locations-button").click(function(e){
		var search_by=$('#s_Region option:selected').attr("id");
		var search_type=$("#s_Category option:selected").attr("id");
		var search_text=$("input#search-criteria").val();
		
		if(search_by==1){
			if(search_type==9){
				var query="SELECT * FROM [location].[Location] WHERE [Location Name] LIKE '%"+search_text+"%'";
			}else{
				var query="SELECT * FROM [location].[Location] WHERE [Location Type Id]="+search_type+" AND [Location Name] LIKE '%"+search_text+"%'";
			}
		}else{
			if(search_type==9){
				var query="SELECT * FROM [location].[Location] WHERE [Location Code] LIKE '%"+search_text+"%'";
			}else{
				var query="SELECT * FROM [location].[Location] WHERE [Location Type Id]="+search_type+" AND [Location Code] LIKE '%"+search_text+"%'";
			}
		}
		
		var data={};
		data.title="search locations";
		data.message=query;
		
		$.ajax({
			type: 'POST',
			data: JSON.stringify(data),
			contentType: 'application/json',
			url: '/searchlocation',
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
					templength=length;
                    console.log(length);
				}else{
					length=10;
					templength=length;
                    console.log(length);
				}
				
				for(var i=0;i<length;i++){
					$("#search-result-list").append("<div class='job result' style='border-bottom: 1px solid #e0dfe0; padding-left: 40px; padding-top: 30px; padding-bottom:30px;'><h3 class='title'>"+(data[i])["Location Name"]+"</h3><p class='info'><span>Location Id: "+(data[i])["Location Id"]+"</span><span class='seperator'>|</span><span>Location Code: "+(data[i])["Location Code"]+"</span><span class='seperator'>|</span><span>Location Label: "+(data[i])["Location Label"]+"</span></p><div class='action'><a href='/location-info#location-id:"+(data[i])["Location Id"]+"' class='button forward go'>View more details</a></div></div>");
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
					  var query="select * from [locationtemp] where [Location Name] like '%"+keyword+"%'";
				  }else{
					  var query="select * from [locationtemp] where [Location Type Id]="+update_type+" and [Location Name] like '%"+keyword+"%'";
				  }
				  
				  var data={};
				  data.title="update location search result";
				  data.message=query;
				  
				  $.ajax({
					  type: 'POST',
					  data: JSON.stringify(data),
					  contentType: 'application/json',
					  url: '/executequery',
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
							 templength=length;
                             console.log(length);
				          }else{
					         length=10;
							 templength=length;
                             console.log(length);
				          }
				
				          for(var i=0;i<length;i++){
					         $("#search-result-list").append("<div class='job result' style='border-bottom: 1px solid #e0dfe0; padding-left: 40px; padding-top: 30px; padding-bottom:30px;'><h3 class='title'>"+(data[i])["Location Name"]+"</h3><p class='info'><span>Location Id: "+(data[i])["Location Id"]+"</span><span class='seperator'>|</span><span>Location Code: "+(data[i])["Location Code"]+"</span><span class='seperator'>|</span><span>Location Label: "+(data[i])["Location Label"]+"</span></p><div class='action'><a href='/location-info#location-id:"+(data[i])["Location Id"]+"' class='button forward go'>View more details</a></div></div>");
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
				$("#search-result-list").append("<div class='job result' style='border-bottom: 1px solid #e0dfe0; padding-left: 40px; padding-top: 30px; padding-bottom:30px;'><h3 class='title'>"+(tempdata[i])["Location Name"]+"</h3><p class='info'><span>Location Id: "+(tempdata[i])["Location Id"]+"</span><span class='seperator'>|</span><span>Location Code: "+(tempdata[i])["Location Code"]+"</span><span class='seperator'>|</span><span>Location Label: "+(tempdata[i])["Location Label"]+"</span></p><div class='action'><a href='/location-info#location-id:"+(tempdata[i])["Location Id"]+"' class='button forward go'>View more details</a></div></div>");
			}
		}else{
			$("#search-result-list").empty();
			var bottom=(pagenumber-1)*10;
            var top=pagenumber*10;
			for(var i=bottom;i<top;i++){
				$("#search-result-list").append("<div class='job result' style='border-bottom: 1px solid #e0dfe0; padding-left: 40px; padding-top: 30px; padding-bottom:30px;'><h3 class='title'>"+(tempdata[i])["Location Name"]+"</h3><p class='info'><span>Location Id: "+(tempdata[i])["Location Id"]+"</span><span class='seperator'>|</span><span>Location Code: "+(tempdata[i])["Location Code"]+"</span><span class='seperator'>|</span><span>Loaction Label: "+(tempdata[i])["Location Label"]+"</span></p><div class='action'><a href='/location-info#location-id:"+(tempdata[i])["Location Id"]+"' class='button forward go'>View more details</a></div></div>");
			}
		}
	});
	
	$("a.product-type").click(function(e){
		console.log(e.target.id);
		var query="SELECT * FROM [location].[Location] WHERE [Location Type Id]="+e.target.id;
		
		var data={};
		data.title="search locations";
		data.message=query;
		
		$.ajax({
			type: 'POST',
			data: JSON.stringify(data),
			contentType: 'application/json',
			url: '/searchlocation',
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
					$("#search-result-list").append("<div class='job result' style='border-bottom: 1px solid #e0dfe0; padding-left: 40px; padding-top: 30px; padding-bottom:30px;'><h3 class='title'>"+(data[i])["Location Name"]+"</h3><p class='info'><span>Location Id: "+(data[i])["Location Id"]+"</span><span class='seperator'>|</span><span>Location Code: "+(data[i])["Location Code"]+"</span><span class='seperator'>|</span><span>Location Label: "+(data[i])["Location Label"]+"</span></p><div class='action'><a href='/location-info#location-id:"+(data[i])["Location Id"]+"' class='button forward go'>View more details</a></div></div>");
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
					  var query="select * from [locationtemp] where [Location Name] like '%"+keyword+"%'";
				  }else{
					  var query="select * from [locationtemp] where [Location Type Id]="+update_type+" and [Location Name] like '%"+keyword+"%'";
				  }
				  
				  var data={};
				  data.title="update location search result";
				  data.message=query;
				  
				  $.ajax({
					  type: 'POST',
					  data: JSON.stringify(data),
					  contentType: 'application/json',
					  url: '/executequery',
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
					         $("#search-result-list").append("<div class='job result' style='border-bottom: 1px solid #e0dfe0; padding-left: 40px; padding-top: 30px; padding-bottom:30px;'><h3 class='title'>"+(data[i])["Location Name"]+"</h3><p class='info'><span>Location Id: "+(data[i])["Location Id"]+"</span><span class='seperator'>|</span><span>Location Code: "+(data[i])["Location Code"]+"</span><span class='seperator'>|</span><span>Location Label: "+(data[i])["Location Label"]+"</span></p><div class='action'><a href='/location-info#location-id:"+(data[i])["Location Id"]+"' class='button forward go'>View more details</a></div></div>");
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
	
	function initmap(){
      var map=new google.maps.Map(document.getElementById('search-result-list'),{
        zoom: 6,
        center: {lat: -34.397, lng: 150.644}
      });
        var geocoder = new google.maps.Geocoder();
        geocodeAddress(geocoder, map);
    }
	
	function geocodeAddress(geocoder, resultsMap){
	  var address=[];
	  for(var i=0;i<tempdata.length;i++){
		  if((tempdata[i])["Location Postcode"]!=null){
			  address.push((tempdata[i])["Location Postcode"]);
		  }
	  }
      console.log(address.length);
	  if(address.length!=0){
		  console.log("not empty");
		  for(var i=0;i<10;i++){
            geocoder.geocode({'address': address[i]}, function(results, status) {
            if (status === 'OK') {
              resultsMap.setCenter(results[0].geometry.location);
              var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
              });
            } else {
              //alert('Geocode was not successful for the following reason: ' + status);
            }
          });
         }
	  }else{
		  var map=new google.maps.Map(document.getElementById('search-result-list'),{
            zoom: 12,
            center: {lat: -34.397, lng: 150.644}
          });
	  }
      
    }
	
	$("#map-view").click(function(e){
		console.log("click");
		$("#search-result-list").empty();
		initmap();
	});
	
	$("#list-view").click(function(e){
		console.log("click");
		$("#search-result-list").empty();
		for(var i=0;i<templength;i++){
			$("#search-result-list").append("<div class='job result' style='border-bottom: 1px solid #e0dfe0; padding-left: 40px; padding-top: 30px; padding-bottom:30px;'><h3 class='title'>"+(tempdata[i])["Location Name"]+"</h3><p class='info'><span>Location Id: "+(tempdata[i])["Location Id"]+"</span><span class='seperator'>|</span><span>Location Code: "+(tempdata[i])["Location Code"]+"</span><span class='seperator'>|</span><span>Loaction Label: "+(tempdata[i])["Location Label"]+"</span></p><div class='action'><a href='/location-info#location-id:"+(tempdata[i])["Location Id"]+"' class='button forward go'>View more details</a></div></div>");
		}
	});
});
