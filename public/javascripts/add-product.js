$(document).ready(function(e){
  $("a.product-type-name").click(function(e){
	  console.log("click");
	  $("input#product-type-name").val($(e.target).text());
	  $("input#modal-product-type-id").val(e.target.id);
  });
  
  $("button#add-new-product").click(function(e){
	  //console.log("click");
	  if($("input#product-label").val()==""){
		  $("input#product-label").val("NULL");
	  }
	  if($("input#product-external-code").val()==""){
		  $("input#product-external-code").val("NULL");
	  }
	  if($("input#product-external-id").val()==""){
		  $("input#product-external-id").val("NULL");
	  }
	  if($("textarea#product-description").val()==""){
		  $("textarea#product-description").text("NULL");
	  }
	  
	  if($("input#product-name").val()==""){
		  alert("please input a name for product.");
	  }else if($("input#product-type-name").val()==""){
		  alert("please select a product type.");
	  }else if($("input#product-code").val()==""){
		  alert("please input a product code.");
	  }else if($.isNumeric($("input#product-turn-around-time-days").val())==false){
		  alert("turn around time days should be number.");
	  }else if($("input#product-date-from").val()==""){
		  alert("please select a date for valid from.");
	  }else if($("input#product-date-to").val()==""){
		  alert("please select a date for valid to.");
	  }else{
		    var arr_from=($("input#product-date-from").val()).split('/');
			var arr_to=($("input#product-date-to").val()).split('/');
			
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
			
			var query="insert into [product].[Product] ([Product Type Id],[Product Name],[Product Code],[Product Label],[Product External Code],[Product External Id],[Product Description],[Product Valid From],[Product Valid To],[Product Turn Around Time Days]) values ("+$("input#modal-product-type-id").val()+",'"+$("input#product-name").val()+"','"+$("input#product-code").val()+"','"+$("input#product-label").val()+"','"+$("input#product-external-code").val()+"','"+$("input#product-external-id").val()+"','"+$("textarea#product-description").text()+"','"+time_from+"','"+time_to+"',"+$("input#product-turn-around-time-days").val()+")";
			var data={};
			data.title=$("input#product-name").val();
			data.message=query;
			
			$.ajax({
				type:'POST',
				data:JSON.stringify(data),
				contentType:'application/json',
				url:'/addproduct',
				success:function(data){
					window.location.href ="/product-info#product-id:"+(data[0])["Product Id"];
			        //location.reload();
				}
			});
	  }
  });
});