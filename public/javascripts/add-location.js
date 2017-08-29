$(document).ready(function(e){
  $("a.location-type-name").click(function(e){
	  console.log("click");
	  $("input#location-type-name").val($(e.target).text());
	  $("input#modal-location-type-id").val(e.target.id);
  });
  
  $("button#add-new-location").click(function(e){
	  //console.log("click");
	  if($("input#location-label").val()==""){
		  $("input#location-label").val("NULL");
	  }
	  if($("input#location-external-code").val()==""){
		  $("input#location-external-code").val("NULL");
	  }
	  if($("input#location-external-id").val()==""){
		  $("input#location-external-id").val("NULL");
	  }
	  if($("textarea#location-description").val()==""){
		  $("textarea#location-description").text("NULL");
	  }
	  
	  if($("input#location-name").val()==""){
		  alert("please input a name for location.");
	  }else if($("input#location-type-name").val()==""){
		  alert("please select a location type.");
	  }else if($("input#location-code").val()==""){
		  alert("please input a location code.");
	  }else if($("input#location-date-from").val()==""){
		  alert("please select a date for valid from.");
	  }else if($("input#location-date-to").val()==""){
		  alert("please select a date for valid to.");
	  }else{
		    var arr_from=($("input#location-date-from").val()).split('/');
			var arr_to=($("input#location-date-to").val()).split('/');
			
			if(arr_from.length==1){
				var time_from=arr_from[0];
			}else{
				if(arr_from[0].length==1){
				  var prefix="0";
				  arr_from[0]=prefix+arr_from[0];
			    }
			    if(arr_from[1].length==1){
				  var prefix="0";
				  arr_from[1]=prefix+arr_from[1];
			    }
			    var prefix="20";
			    arr_from[2]=prefix+arr_from[2];
			    var time_from=arr_from[2]+"-"+arr_from[0]+"-"+arr_from[1]+"T00:00:00.000Z";
			}
			
			if(arr_to.length==1){
				var time_to=arr_to[0];
			}else{
				if(arr_to[0].length==1){
				  var prefix="0";
				  arr_to[0]=prefix+arr_to[0];
			    }
			    if(arr_to[1].length==1){
				  var prefix="0";
				  arr_to[1]=prefix+arr_to[1];
			    }
			    var prefix="20";
			    arr_to[2]=prefix+arr_to[2];
			    var time_to=arr_to[2]+"-"+arr_to[0]+"-"+arr_to[1]+"T00:00:00.000Z";
			}
			
			var query="insert into [location].[Location] ([Location Type Id],[Location Name],[Location Code],[Location Label],[Location External Code],[Location External Id],[Location Description],[Location Valid From],[Location Valid To]) values ("+$("input#modal-location-type-id").val()+",'"+$("input#location-name").val()+"','"+$("input#location-code").val()+"','"+$("input#location-label").val()+"','"+$("input#location-external-code").val()+"','"+$("input#location-external-id").val()+"','"+$("textarea#location-description").text()+"','"+time_from+"','"+time_to+"')";
			var data={};
			data.title=$("input#location-name").val();
			data.message=query;
			
			$.ajax({
				type:'POST',
				data:JSON.stringify(data),
				contentType:'application/json',
				url:'/addlocation',
				success:function(data){
					window.location.href ="/location-info#location-id:"+(data[0])["Location Id"];
			        location.reload();
				}
			});
	  }
  });
});