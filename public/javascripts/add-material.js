$(document).ready(function(e){
  $("a.material-type-name").click(function(e){
	  console.log("click");
	  $("input#material-type-name").val($(e.target).text());
	  $("input#modal-material-type-id").val(e.target.id);
  });
  
  $("button#add-new-material").click(function(e){
	  //console.log("click");
	  if($("input#material-label").val()==""){
		  $("input#material-label").val("NULL");
	  }
	  if($("input#material-external-code").val()==""){
		  $("input#material-external-code").val("NULL");
	  }
	  if($("input#material-external-id").val()==""){
		  $("input#material-external-id").val("NULL");
	  }
	  if($("textarea#material-description").val()==""){
		  $("textarea#material-description").text("NULL");
	  }
	  
	  if($("input#material-name").val()==""){
		  alert("please input a name for material.");
	  }else if($("input#material-type-name").val()==""){
		  alert("please select a material type.");
	  }else if($("input#material-code").val()==""){
		  alert("please input a material code.");
	  }else if($("input#material-date-from").val()==""){
		  alert("please select a date for valid from.");
	  }else if($("input#material-date-to").val()==""){
		  alert("please select a date for valid to.");
	  }else{
		    var arr_from=($("input#material-date-from").val()).split('/');
			var arr_to=($("input#material-date-to").val()).split('/');
			
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
			
			var query="insert into [material].[Material] ([Material Type Id],[Material Name],[Material Code],[Material Label],[Material External Code],[Material External Id],[Material Description],[Material Valid From],[Material Valid To]) values ("+$("input#modal-material-type-id").val()+",'"+$("input#material-name").val()+"','"+$("input#material-code").val()+"','"+$("input#material-label").val()+"','"+$("input#material-external-code").val()+"','"+$("input#material-external-id").val()+"','"+$("textarea#material-description").text()+"','"+time_from+"','"+time_to+"')";
			var data={};
			data.title=$("input#material-name").val();
			data.message=query;
			
			$.ajax({
				type:'POST',
				data:JSON.stringify(data),
				contentType:'application/json',
				url:'/addmaterial',
				success:function(data){
					window.location.href ="/material-info#material-id:"+(data[0])["Material Id"];
			        //location.reload();
				}
			});
	  }
  });
});