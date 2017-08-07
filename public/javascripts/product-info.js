/*
$(function(){
	var treemenu=[{
  label: 'node1',
  children: [
    { label: 'child1' },
    { label: 'child2' }
  ]
  },{
  label: 'node2',
  children: [{
    label: 'child3' }
  ]
  }];
$("#tree").tree({
	data:treemenu
});
});
*/
//var treemenu = !{data};
//var treemenu = !{title};
//console.log(treemenu);

//global variables using for pass search parent product result
var name="foo";
var id=0;
//////////////////////////////////////////////////////////////
var temp=null;
var tempdata=null;
var temptotalpage=0;
var templeft=0;
var url=window.location.hash;
url=url.replace("#product-id:","");
console.log(url);
var data={};
data.title="product id";
data.message=url;
$.ajax({
	type: 'POST',
	data: JSON.stringify(data),
	contentType: 'application/json',
	url: 'http://localhost:3000/productinfoid',
	success: function(data){
		tempdata=data;
		//console.log("success");
		console.log(JSON.stringify(data));
		
		if((data[0])["Product Description"]==null){
			(data[0])["Product Description"]="No Record";
		}
		if((data[0])["Product External Code"]==null){
			(data[0])["Product External Code"]="No Record";
		}
		if((data[0])["Product External Id"]==null){
			(data[0])["Product External Id"]="No Record";
		}
		if((data[0])["Product Label"]==null){
			(data[0])["Product Label"]="No Record";
		}
		if((data[0])["Product Notes"]==null){
			(data[0])["Product Notes"]="No Record";
		}
		if((data[0])["Record Termination Datetime"]==null){
			(data[0])["Record Termination Datetime"]="No Record";
		}
		if((data[0])["Record Copy Creation Datetime"]==null){
			(data[0])["Record Copy Creation Datetime"]="No Record";
		}
		if((data[0])["Product Turn Around Time Days"]==null){
			(data[0])["Product Turn Around Time Days"]="No Record";
		}
		if((data[0])["Parent Product Name"]==null){
			(data[0])["Parent Product Name"]="No Record";
		}
		
		$("#Product-Name").append((data[0])["Product Name"]);
		$("#Product-Description").append((data[0])["Product Description"]);
		$("#Product-Code").append((data[0])["Product Code"]);
		$("#Product-External-Code").append((data[0])["Product External Code"]);
		$("#Product-External-Id").append((data[0])["Product External Id"]);
		$("#Parent-Product-Name").append((data[0])["Parent Product Name"]);
		$("#Product-Label").append((data[0])["Product Label"]);
		$("#Product-Notes").append((data[0])["Product Notes"]);
		$("#Product-Type-Name").append((data[0])["Product Type Name"]);
		$("#Product-Valid-From").append((data[0])["Product Valid From"]);
		$("#Product-Valid-To").append((data[0])["Product Valid To"]);
		$("#Record-Creation-Datetime").append(((data[0])["Record Creation Datetime"])[0]);
		$("#Record-Termination-Datetime").append((data[0])["Record Termination Datetime"]);
		$("#Product-Turn-Around-Time-Days").append((data[0])["Product Turn Around Time Days"]);
		$("#Record-Copy-Creation-Datetime").append((data[0])["Record Copy Creation Datetime"]);
		
		//load assoication-info
		var left=data.length%3;
		if(left==0){
			var totalpage=data.length/3;
			temptotalpage=totalpage;
		}else{
			var totalpage=data.length/3+1;
			temptotalpage=totalpage;
		}
		var length=0;
		if((totalpage==1)&&(left>0)){
			length=left;
			templeft=left;
		}else{
			length=3;
			templeft=left;
		}
		
		$("#child-association").append("<div class='panel panel-default text-center'><div class='panel-heading'><h1>Association</h1></div><div class='panel-body'><input id='"+(data[0])["Child Association:Association Id"]+"' class='original-parent-product-id'></input><input id='"+(data[0])["Child Association:Association Id"]+"' class='search-child-product-id'></input><p id='"+(data[0])["Child Association:Association Id"]+"' class='association-type-id'>"+(data[0])["Child Association:Association Type Id"]+"</p><label><strong>Association Type Name</strong></label><p id='"+(data[0])["Child Association:Association Id"]+"' class='association-id'>"+(data[0])["Child Association:Association Type Name"]+"</p><label><strong>Parent Product</strong></label><div id='Parent-Product-Name-"+(data[0])["Child Association:Association Id"]+"'><p id='"+(data[0])["Child Association:Association Id"]+"' class='parent-product-name'>"+(data[0])["Child Association:Parent Product Name"]+"</p><!-- --><input id='"+(data[0])["Child Association:Association Id"]+"' class='search-parent-product' style='width:110px; display:none;' placeholder='Search term...'></input><!-- --><button id='"+(data[0])["Child Association:Association Id"]+"' class='btn btn-default search-association-parent-child-product-button' style='min-width:35px; display:none;'><span id='"+(data[0])["Child Association:Association Id"]+"' class='glyphicon glyphicon-search'></span></button><div id='"+(data[0])["Child Association:Association Id"]+"' class='dropdown association' style='display:none;'></div></div><label><strong>Child Product</strong></label><p id='"+(data[0])["Child Association:Association Id"]+"'>"+(data[0])["Child Association:Child Product Name"]+"</p><label for='association-date-from-"+(data[0])["Child Association:Association Id"]+"'><strong>Association Valid From</strong></label><p id='"+(data[0])["Child Association:Association Id"]+"' class='product-association-valid-from'>"+(data[0])["Child Association:Product Association Valid From"]+"</p><label for='association-date-to-"+(data[0])["Child Association:Association Id"]+"'><strong>Association Valid To</strong></label><p id='"+(data[0])["Child Association:Association Id"]+"' class='product-association-valid-to'>"+(data[0])["Child Association:Product Association Valid To"]+"</p></div><div class='panel-footer'><button id='"+(data[0])["Child Association:Association Id"]+"' class='btn btn-lg edit-association-info'>Edit</button><!-- --><button id='"+(data[0])["Child Association:Association Id"]+"' class='btn btn-lg cancel-association-info'>Cancel</button><!-- --><button id='"+(data[0])["Child Association:Association Id"]+"' class='btn btn-lg update-association-info'>Update</button></div></div>");
		
		for(var i=0;i<length;i++){
			$("#association-list").append("<div class='col-sm-4'><div class='panel panel-default text-center'><div class='panel-heading'><h1>Association</h1></div><div class='panel-body'><input id='"+(data[i])["Parent Association:Association Id"]+"' class='original-child-product-id'></input><input id='"+(data[i])["Parent Association:Association Id"]+"' class='search-result-product-id'></input><p id='"+(data[i])["Parent Association:Association Id"]+"' class='association-type-id'>"+(data[i])["Parent Association:Association Type Id"]+"</p><label><strong>Association Type Name</strong></label><p id='"+(data[i])["Parent Association:Association Id"]+"' class='association-id'>"+(data[i])["Parent Association:Association Type Name"]+"</p><label><strong>Parent Product</strong></label><p id='"+(data[i])["Parent Association:Association Id"]+"' class='parent-product-name'>"+(data[i])["Parent Association:Parent Product Name"]+"</p><label><strong>Child Product</strong></label><div id='Child-Product-Name-"+(data[i])["Parent Association:Association Id"]+"'><p id='"+(data[i])["Parent Association:Association Id"]+"' class='child-product-name'>"+(data[i])["Parent Association:Child Product Name"]+"</p><!-- --><input id='"+(data[i])["Parent Association:Association Id"]+"' class='search-child-product' style='width:110px; display:none;' placeholder='Search term...'></input><!-- --><button id='"+(data[i])["Parent Association:Association Id"]+"' class='btn btn-default search-association-child-product-button' style='min-width:35px; display:none;'><span id='"+(data[i])["Parent Association:Association Id"]+"' class='glyphicon glyphicon-search'></span></button><div id='"+(data[i])["Parent Association:Association Id"]+"' class='dropdown association' style='display:none;'><button id='menu1' class='btn btn-default dropdown-toggle' data-toggle='dropdown'>results<span class='caret'></span></button><ul id='"+(data[i])["Parent Association:Association Id"]+"' class='dropdown-menu' style='height: 200px; overflow-y:scroll; width: 240px;' role='menu' aria-labelledby='menu1'></ul></div></div><label for='association-date-from-"+(data[i])["Parent Association:Association Id"]+"'><strong>Association Valid From</strong></label><p id='"+(data[i])["Parent Association:Association Id"]+"' class='product-association-valid-from'>"+(data[i])["Parent Association:Product Association Valid From"]+"</p><label for='association-date-to-"+(data[i])["Parent Association:Association Id"]+"'><strong>Association Valid To</strong></label><p id='"+(data[i])["Parent Association:Association Id"]+"' class='product-association-valid-to'>"+(data[0])["Parent Association:Product Association Valid To"]+"</p></div><div class='panel-footer'><button id='"+(data[i])["Parent Association:Association Id"]+"' class='btn btn-lg edit-association-info'>Edit</button><!-- --><button id='"+(data[i])["Parent Association:Association Id"]+"' class='btn btn-lg cancel-association-info'>Cancel</button><!-- --><button id='"+(data[i])["Parent Association:Association Id"]+"' class='btn btn-lg update-association-info'>Update</button></div></div></div>");
		    $("input#"+(data[i])["Parent Association:Association Id"]+".search-result-product-id").val((data[i])["Parent Association:Child Product Id"]);
			$("input#"+(data[i])["Parent Association:Association Id"]+".original-child-product-id").val((data[i])["Parent Association:Child Product Id"]);
		}
		
		$("#association-pagination").pagination({
		  items: data.length,
		  itemsOnPage: 3,
		  cssStyle: 'light-theme'
        });
		
		//load attribute-info
		temp=data;
		if(((data[0])["Product Attribute Type Name"])==null){
			console.log("No attribute");
			$("#9.card-media").toggle();
		}else{
		  for(var i=0;i<((data[0])["Product Attribute Type Name"]).length;i++){
			if(((data[0])["Product Attribute Type Name"])[i]!=null){
				if(i==0){
					$("#Product-Attribute-Type-Name1").append(((data[0])["Product Attribute Type Name"])[i]);
					$("#Product-Value-Text1").append(((data[0])["Product Value Text"])[i]);
					$("#Product-Attribute-Valid-From1").append(((data[0])["Product Attribute Valid From"])[i]);
					$("#Product-Attribute-Valid-To1").append(((data[0])["Product Attribute Valid To"])[i]);
					$("#1.card-media").toggle();
				}else if(i==1){
					$("#Product-Attribute-Type-Name2").append(((data[0])["Product Attribute Type Name"])[i]);
					$("#Product-Value-Text2").append(((data[0])["Product Value Text"])[i]);
					$("#Product-Attribute-Valid-From2").append(((data[0])["Product Attribute Valid From"])[i]);
					$("#Product-Attribute-Valid-To2").append(((data[0])["Product Attribute Valid To"])[i]);
					$("#2.card-media").toggle();
				}else if(i==2){
					$("#Product-Attribute-Type-Name3").append(((data[0])["Product Attribute Type Name"])[i]);
					$("#Product-Value-Text3").append(((data[0])["Product Value Text"])[i]);
					$("#Product-Attribute-Valid-From3").append(((data[0])["Product Attribute Valid From"])[i]);
					$("#Product-Attribute-Valid-To3").append(((data[0])["Product Attribute Valid To"])[i]);
					$("#3.card-media").toggle();
				}else if(i==3){
					$("#Product-Attribute-Type-Name4").append(((data[0])["Product Attribute Type Name"])[i]);
					$("#Product-Value-Text4").append(((data[0])["Product Value Text"])[i]);
					$("#Product-Attribute-Valid-From4").append(((data[0])["Product Attribute Valid From"])[i]);
					$("#Product-Attribute-Valid-To4").append(((data[0])["Product Attribute Valid To"])[i]);
					$("#4.card-media").toggle();
				}else if(i==4){
					$("#Product-Attribute-Type-Name5").append(((data[0])["Product Attribute Type Name"])[i]);
					$("#Product-Value-Text5").append(((data[0])["Product Value Text"])[i]);
					$("#Product-Attribute-Valid-From5").append(((data[0])["Product Attribute Valid From"])[i]);
					$("#Product-Attribute-Valid-To5").append(((data[0])["Product Attribute Valid To"])[i]);
					$("#5.card-media").toggle();
				}else if(i==5){
					$("#Product-Attribute-Type-Name6").append(((data[0])["Product Attribute Type Name"])[i]);
					$("#Product-Value-Text6").append(((data[0])["Product Value Text"])[i]);
					$("#Product-Attribute-Valid-From6").append(((data[0])["Product Attribute Valid From"])[i]);
					$("#Product-Attribute-Valid-To6").append(((data[0])["Product Attribute Valid To"])[i]);
					$("#6.card-media").toggle();
				}else if(i==6){
					$("#Product-Attribute-Type-Name7").append(((data[0])["Product Attribute Type Name"])[i]);
					$("#Product-Value-Text7").append(((data[0])["Product Value Text"])[i]);
					$("#Product-Attribute-Valid-From7").append(((data[0])["Product Attribute Valid From"])[i]);
					$("#Product-Attribute-Valid-To7").append(((data[0])["Product Attribute Valid To"])[i]);
					$("#7.card-media").toggle();
				}else if(i==7){
					$("#Product-Attribute-Type-Name8").append(((data[0])["Product Attribute Type Name"])[i]);
					$("#Product-Value-Text8").append(((data[0])["Product Value Text"])[i]);
					$("#Product-Attribute-Valid-From8").append(((data[0])["Product Attribute Valid From"])[i]);
					$("#Product-Attribute-Valid-To8").append(((data[0])["Product Attribute Valid To"])[i]);
					$("#8.card-media").toggle();
				}
			}
		  }
		}
		
		
		//triger edit button
		$(".edit-general-info").click(function(e){
			id=(data[0])["Parent Product Id"];
			var str=$("#Product-Code").text();
		    $("#Product-Code").replaceWith('<div><input id="input-Product-Code" style="width: 80%;"></input></div>');
		    $("#input-Product-Code").val(str);
			
			str=$("#Product-Name").text();
			$("#Product-Name").replaceWith('<div><input id="input-Product-Name" style="width: 80%;"></input></div>');
			$("#input-Product-Name").val(str);
			
			str=$("#Product-Description").text();
			$("#Product-Description").replaceWith('<div><textarea id="input-Product-Description" rows="10" cols="45"></textarea></div>');
            $("#input-Product-Description").text(str);
			
			str=$("#Product-External-Code").text();
			$("#Product-External-Code").replaceWith('<div><input id="input-Product-External-Code" style="width: 80%;"></input></div>');
		    $("#input-Product-External-Code").val(str);
			
			str=$("#Product-External-Id").text();
			$("#Product-External-Id").replaceWith('<div><input id="input-Product-External-Id" style="width: 80%;"></input></div>');
		    $("#input-Product-External-Id").val(str);
			
			str=$("#Parent-Product-Name").text();
			$("#Parent-Product-Name").replaceWith('<input id="input-Parent-Product-Name" style="width: 64%"></input>');
		    $("#input-Parent-Product-Name").val(str);
			
			str=$("#Product-Label").text();
			$("#Product-Label").replaceWith('<div><input id="input-Product-Label" style="width: 30%"></input></div>');
		    $("#input-Product-Label").val(str);
			
			str=$("#Product-Notes").text();
			$("#Product-Notes").replaceWith('<div><input id="input-Product-Notes" style="width: 30%"></input></div>');
		    $("#input-Product-Notes").val(str);

			str=$("#Product-Turn-Around-Time-Days").text();
			$("#Product-Turn-Around-Time-Days").replaceWith('<div><input id="input-Product-Turn-Around-Time-Days" style="width: 30%"></input></div>');
		    $("#input-Product-Turn-Around-Time-Days").val(str);
			
		    str=$("#Product-Valid-From").text();
			$("#Product-Valid-From").replaceWith('<input class="form-control" id="date-from" type="text" placeholder="" title="format : "/><div id="date-from-inline"></div>');
			$('#date-from').datepicker({theme:'green'});			
			$("#date-from").val(str);
			
			str=$("#Product-Valid-To").text();
			$("#Product-Valid-To").replaceWith('<input class="form-control" id="date-to" type="text" placeholder="" title="format : "/><div id="date-to-inline"></div>');
			$('#date-to').datepicker({theme:'green'});			
			$("#date-to").val(str);
			
            $(".cancel-general-info").toggle();
			$(".update-general-info").toggle();
			$(".edit-general-info").toggle();
			$("#view-tree-menu").toggle();
			$("#search-parent-product-form").toggle();
		});
		
		//triger view button
		$("#view-tree-menu").click(function(e){
			console.log("click");
		});
		
		//click on tree view
        $("span.jqtree-title.jqtree_common").click(function(e){
			console.log("click");
			var name=$(e.target).text();
			console.log(name);
		});		
		
		//triger update general-info button
		$(".btn.update-general-info").click(function(e){
			var arr_from=($("#date-from").val()).split('/');
			var arr_to=($("#date-to").val()).split('/');
			
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
			
			if($.isNumeric($("#input-Product-Turn-Around-Time-Days").val())){
				var query="UPDATE [product].[Product] SET [Parent Product Id]="+id+",[Product Name]='"+$("#input-Product-Name").val()+"',[Product Description]='"+$("#input-Product-Description").val()+"',[Product Code]='"+$("#input-Product-Code").val()+"',[Product External Code]='"+$("#input-Product-External-Code").val()+"',[Product External Id]='"+$("#input-Product-External-Id").val()+"',[Product Label]='"+$("#input-Product-Label").val()+"',[Product Notes]='"+$("#input-Product-Notes").val()+"',[Product Turn Around Time Days]='"+$("#input-Product-Turn-Around-Time-Days").val()+"',[Product Valid From]='"+time_from+"',[Product Valid To]='"+time_to+"' WHERE [Product Id]="+url;
			    console.log(query);
				var data={};
			    data.title="update query";
			    data.message=query;
			    $.ajax({
				   type:'POST',
				   data:JSON.stringify(data),
				   contentType:'application/json',
				   url:'http://localhost:3000/update-general-info',
				   success:function(data){
					  console.log(data);
					  location.reload();
				    }
			    });
			}else{
				alert("input for turn around time days should be inter!");
			}
		});
		
		//triger cancel button
		$("button.cancel-general-info").click(function(e){
			var str=(data[0])["Product Code"];
			$("#input-Product-Code").replaceWith('<p id="Product-Code" class="info-field"></p>');
			$("#Product-Code").text(str);
			
			//str=$("#input-Product-Name").val();
			str=(data[0])["Product Name"];
			$("#input-Product-Name").replaceWith('<p id="Product-Name" class="info-field"></p>');
			$("#Product-Name").text(str);
			
			//str=$("#input-Product-Description").val();
			str=(data[0])["Product Description"];
			$("#input-Product-Description").replaceWith('<p id="Product-Description" class="info-field"></p>');
			$("#Product-Description").text(str);
			
			//str=$("#input-Product-Turn-Around-Time-Days").val();
			str=(data[0])["Product Turn Around Time Days"];
			$("#input-Product-Turn-Around-Time-Days").replaceWith('<p id="Product-Turn-Around-Time-Days" class="info-field"></p>');
			$("#Product-Turn-Around-Time-Days").text(str);
			
			//str=$("#input-Product-Label").val();
			str=(data[0])["Product Label"];
			$("#input-Product-Label").replaceWith('<p id="Product-Label" class="info-field"></p>');
			$("#Product-Label").text(str);
			
			//str=$("#input-Product-Notes").val();
			str=(data[0])["Product Notes"];
			$("#input-Product-Notes").replaceWith('<p id="Product-Notes" class="info-field"></p>');
			$("#Product-Notes").text(str);
			
			//str=$("#input-Product-External-Code").val();
			str=(data[0])["Product External Code"];
			$("#input-Product-External-Code").replaceWith('<p id="Product-External-Code" class="info-field"></p>');
			$("#Product-External-Code").text(str);
			
			//str=$("#input-Product-External-Id").val();
			str=(data[0])["Product External Id"];
			$("#input-Product-External-Id").replaceWith('<p id="Product-External-Id" class="info-field"></p>');
			$("#Product-External-Id").text(str);
			
			//str=$("#input-Parent-Product-Name").val();
			str=(data[0])["Parent Product Name"];
			$("#input-Parent-Product-Name").replaceWith('<p id="Parent-Product-Name" class="info-field"></p>');
			$("#Parent-Product-Name").text(str);
			
			//str=$("#date-from").val();
			str=(data[0])["Product Valid From"];
			$("#date-from").replaceWith('<p id="Product-Valid-From" class="info-field"></p>');
			$("#Product-Valid-From").text(str);
			
			//str=$("#date-to").val();
			str=(data[0])["Product Valid To"];
			$("#date-to").replaceWith('<p id="Product-Valid-To" class="info-field"></p>');
			$("#Product-Valid-To").text(str);
			
			$("a.datepicker-button.input-group-addon.green").remove();
			$(".datepicker-calendar.green").remove();
			
			$("span#search").toggle();
			$("#input-field-view-button").toggle();
			$(".update-general-info").toggle();
			$(".edit-general-info").toggle();
			$(".cancel-general-info").toggle();
			$("#view-tree-menu").toggle();
			$("#search-parent-product-form").toggle();
		});
		
		//trigger attribute edit button
		$(".edit-attribute-info").click(function(e){
		  if(e.target.id==1){  
			  var str=$("#Product-Value-Text1").text();
			  $("#Product-Value-Text1").replaceWith('<div><input id="input-Product-Value-Text1" style="width: 80%;"></input></div>');
			  $("#input-Product-Value-Text1").val(str);
			  
			  str=$("#Product-Attribute-Valid-From1").text();
			  $("#Product-Attribute-Valid-From1").replaceWith('<input style="width:80%;" class="form-control" id="date1-from" type="text" placeholder="" title="format : "/><div id="date1-from-inline"></div>');
			  $('#date1-from').datepicker({theme:'green'});
			  $("#date1-from").val(str);
			  
			  str=$("#Product-Attribute-Valid-To1").text();
			  $("#Product-Attribute-Valid-To1").replaceWith('<input style="width:80%;" class="form-control" id="date1-to" type="text" placeholder="" title="format : "/><div id="date1-to-inline"></div>');
			  $('#date1-to').datepicker({theme:'green'});
			  $("#date1-to").val(str);
			  
			  $("button#1.edit-attribute-info").toggle();
			  $("button#1.add-attribute-info").toggle();
			  $("button#1.update-attribute-info").toggle();
			  $("button#1.cancel-attribute-info").toggle();
		  }else if(e.target.id==2){
			  var str=$("#Product-Value-Text2").text();
			  $("#Product-Value-Text2").replaceWith('<div><input id="input-Product-Value-Text2" style="width: 80%;"></input></div>');
			  $("#input-Product-Value-Text2").val(str);
			  
			  str=$("#Product-Attribute-Valid-From2").text();
			  $("#Product-Attribute-Valid-From2").replaceWith('<input style="width:80%;" class="form-control" id="date2-from" type="text" placeholder="" title="format : "/><div id="date2-from-inline"></div>');
			  $('#date2-from').datepicker({theme:'green'});
			  $("#date2-from").val(str);
			  
			  str=$("#Product-Attribute-Valid-To2").text();
			  $("#Product-Attribute-Valid-To2").replaceWith('<input style="width:80%;" class="form-control" id="date2-to" type="text" placeholder="" title="format : "/><div id="date2-to-inline"></div>');
			  $('#date2-to').datepicker({theme:'green'});
			  $("#date2-to").val(str);
			  
			  $("button#2.edit-attribute-info").toggle();
			  $("button#2.add-attribute-info").toggle();
			  $("button#2.update-attribute-info").toggle();
			  $("button#2.cancel-attribute-info").toggle();
		  }else if(e.target.id==3){
			  var str=$("#Product-Value-Text3").text();
			  $("#Product-Value-Text3").replaceWith('<div><input id="input-Product-Value-Text3" style="width: 80%;"></input></div>');
			  $("#input-Product-Value-Text3").val(str);
			  
			  str=$("#Product-Attribute-Valid-From3").text();
			  $("#Product-Attribute-Valid-From3").replaceWith('<input style="width:80%;" class="form-control" id="date3-from" type="text" placeholder="" title="format : "/><div id="date3-from-inline"></div>');
			  $('#date3-from').datepicker({theme:'green'});
			  $("#date3-from").val(str);
			  
			  str=$("#Product-Attribute-Valid-To3").text();
			  $("#Product-Attribute-Valid-To3").replaceWith('<input style="width:80%;" class="form-control" id="date3-to" type="text" placeholder="" title="format : "/><div id="date3-to-inline"></div>');
			  $('#date3-to').datepicker({theme:'green'});
			  $("#date3-to").val(str);
			  
			  $("button#3.edit-attribute-info").toggle();
			  $("button#3.add-attribute-info").toggle();
			  $("button#3.update-attribute-info").toggle();
			  $("button#3.cancel-attribute-info").toggle();
		  }else if(e.target.id==4){
			  var str=$("#Product-Value-Text4").text();
			  $("#Product-Value-Text4").replaceWith('<div><input id="input-Product-Value-Text4" style="width: 80%;"></input></div>');
			  $("#input-Product-Value-Text4").val(str);
			  
			  str=$("#Product-Attribute-Valid-From4").text();
			  $("#Product-Attribute-Valid-From4").replaceWith('<input style="width:80%;" class="form-control" id="date4-from" type="text" placeholder="" title="format : "/><div id="date4-from-inline"></div>');
			  $('#date4-from').datepicker({theme:'green'});
			  $("#date4-from").val(str);
			  
			  str=$("#Product-Attribute-Valid-To4").text();
			  $("#Product-Attribute-Valid-To4").replaceWith('<input style="width:80%;" class="form-control" id="date4-to" type="text" placeholder="" title="format : "/><div id="date4-to-inline"></div>');
			  $('#date4-to').datepicker({theme:'green'});
			  $("#date4-to").val(str);
			  
			  $("button#4.edit-attribute-info").toggle();
			  $("button#4.add-attribute-info").toggle();
			  $("button#4.update-attribute-info").toggle();
			  $("button#4.cancel-attribute-info").toggle();
		  }else if(e.target.id==5){
			  var str=$("#Product-Value-Text5").text();
			  $("#Product-Value-Text5").replaceWith('<div><input id="input-Product-Value-Text5" style="width: 80%;"></input></div>');
			  $("#input-Product-Value-Text5").val(str);
			  
			  str=$("#Product-Attribute-Valid-From5").text();
			  $("#Product-Attribute-Valid-From5").replaceWith('<input style="width:80%;" class="form-control" id="date5-from" type="text" placeholder="" title="format : "/><div id="date4-from-inline"></div>');
			  $('#date5-from').datepicker({theme:'green'});
			  $("#date5-from").val(str);
			  
			  str=$("#Product-Attribute-Valid-To5").text();
			  $("#Product-Attribute-Valid-To5").replaceWith('<input style="width:80%;" class="form-control" id="date5-to" type="text" placeholder="" title="format : "/><div id="date4-to-inline"></div>');
			  $('#date5-to').datepicker({theme:'green'});
			  $("#date5-to").val(str);
			  
			  $("button#5.edit-attribute-info").toggle();
			  $("button#5.add-attribute-info").toggle();
			  $("button#5.update-attribute-info").toggle();
			  $("button#5.cancel-attribute-info").toggle();
		  }else if(e.target.id==6){
			  var str=$("#Product-Value-Text6").text();
			  $("#Product-Value-Text6").replaceWith('<div><input id="input-Product-Value-Text6" style="width: 80%;"></input></div>');
			  $("#input-Product-Value-Text6").val(str);
			  
			  str=$("#Product-Attribute-Valid-From6").text();
			  $("#Product-Attribute-Valid-From6").replaceWith('<input style="width:80%;" class="form-control" id="date6-from" type="text" placeholder="" title="format : "/><div id="date4-from-inline"></div>');
			  $('#date6-from').datepicker({theme:'green'});
			  $("#date6-from").val(str);
			  
			  str=$("#Product-Attribute-Valid-To6").text();
			  $("#Product-Attribute-Valid-To6").replaceWith('<input style="width:80%;" class="form-control" id="date6-to" type="text" placeholder="" title="format : "/><div id="date4-to-inline"></div>');
			  $('#date6-to').datepicker({theme:'green'});
			  $("#date6-to").val(str);
			  
			  $("button#6.edit-attribute-info").toggle();
			  $("button#6.add-attribute-info").toggle();
			  $("button#6.update-attribute-info").toggle();
			  $("button#6.cancel-attribute-info").toggle();
		  }else if(e.target.id==7){
			  var str=$("#Product-Value-Text7").text();
			  $("#Product-Value-Text7").replaceWith('<div><input id="input-Product-Value-Text7" style="width: 80%;"></input></div>');
			  $("#input-Product-Value-Text7").val(str);
			  
			  str=$("#Product-Attribute-Valid-From7").text();
			  $("#Product-Attribute-Valid-From7").replaceWith('<input style="width:80%;" class="form-control" id="date7-from" type="text" placeholder="" title="format : "/><div id="date4-from-inline"></div>');
			  $('#date7-from').datepicker({theme:'green'});
			  $("#date7-from").val(str);
			  
			  str=$("#Product-Attribute-Valid-To7").text();
			  $("#Product-Attribute-Valid-To7").replaceWith('<input style="width:80%;" class="form-control" id="date7-to" type="text" placeholder="" title="format : "/><div id="date4-to-inline"></div>');
			  $('#date7-to').datepicker({theme:'green'});
			  $("#date7-to").val(str);
			  
			  $("button#7.edit-attribute-info").toggle();
			  $("button#7.add-attribute-info").toggle();
			  $("button#7.update-attribute-info").toggle();
			  $("button#7.cancel-attribute-info").toggle();
		  }else if(e.target.id==8){
			  var str=$("#Product-Value-Text8").text();
			  $("#Product-Value-Text8").replaceWith('<div><input id="input-Product-Value-Text8" style="width: 80%;"></input></div>');
			  $("#input-Product-Value-Text8").val(str);
			  
			  str=$("#Product-Attribute-Valid-From8").text();
			  $("#Product-Attribute-Valid-From8").replaceWith('<input style="width:80%;" class="form-control" id="date8-from" type="text" placeholder="" title="format : "/><div id="date4-from-inline"></div>');
			  $('#date8-from').datepicker({theme:'green'});
			  $("#date8-from").val(str);
			  
			  str=$("#Product-Attribute-Valid-To8").text();
			  $("#Product-Attribute-Valid-To8").replaceWith('<input style="width:80%;" class="form-control" id="date8-to" type="text" placeholder="" title="format : "/><div id="date4-to-inline"></div>');
			  $('#date8-to').datepicker({theme:'green'});
			  $("#date8-to").val(str);
			  
			  $("button#8.edit-attribute-info").toggle();
			  $("button#8.add-attribute-info").toggle();
			  $("button#8.update-attribute-info").toggle();
			  $("button#8.cancel-attribute-info").toggle();
		  }
	    });
		
		//trigger cancel attribute-info
		$(".cancel-attribute-info").click(function(e){
			if(e.target.id==1){
				//var str=$("#input-Product-Value-Text1").val();
				var str=((temp[0])["Product Value Text"])[0];
				$("#input-Product-Value-Text1").replaceWith('<p id="Product-Value-Text1" class="info-field"></p>');
				$("#Product-Value-Text1").text(str);
				
				//str=$("#date1-from").val();
				str=((temp[0])["Product Attribute Valid From"])[0];
				$("#date1-from").replaceWith('<p id="Product-Attribute-Valid-From1" class="info-field"></p>');
				$("#Product-Attribute-Valid-From1").text(str);
				
				//str=$("#date1-to").val();
				str=((temp[0])["Product Attribute Valid To"])[0];
				$("#date1-to").replaceWith('<p id="Product-Attribute-Valid-To1" class="info-field"></p>');
				$("#Product-Attribute-Valid-To1").text(str);
				
				$("button#1.edit-attribute-info").toggle();
				$("button#1.add-attribute-info").toggle();
			    $("button#1.update-attribute-info").toggle();
			    $("button#1.cancel-attribute-info").toggle();
			}else if(e.target.id==2){
				//var str=$("#input-Product-Value-Text2").val();
				var str=((temp[0])["Product Value Text"])[1];
				$("#input-Product-Value-Text2").replaceWith('<p id="Product-Value-Text2" class="info-field"></p>');
				$("#Product-Value-Text2").text(str);
				
				//str=$("#date2-from").val();
				str=((temp[0])["Product Attribute Valid From"])[1];
				$("#date2-from").replaceWith('<p id="Product-Attribute-Valid-From2" class="info-field"></p>');
				$("#Product-Attribute-Valid-From2").text(str);
				
				//str=$("#date2-to").val();
				str=((temp[0])["Product Attribute Valid To"])[1];
				$("#date2-to").replaceWith('<p id="Product-Attribute-Valid-To2" class="info-field"></p>');
				$("#Product-Attribute-Valid-To2").text(str);
				
				$("button#2.edit-attribute-info").toggle();
				$("button#2.add-attribute-info").toggle();
			    $("button#2.update-attribute-info").toggle();
			    $("button#2.cancel-attribute-info").toggle();
			}else if(e.target.id==3){
				//var str=$("#input-Product-Value-Text3").val();
				var str=((temp[0])["Product Value Text"])[2];
				$("#input-Product-Value-Text3").replaceWith('<p id="Product-Value-Text3" class="info-field"></p>');
				$("#Product-Value-Text3").text(str);
				
				//str=$("#date3-from").val();
				str=((temp[0])["Product Attribute Valid From"])[2];
				$("#date3-from").replaceWith('<p id="Product-Attribute-Valid-From3" class="info-field"></p>');
				$("#Product-Attribute-Valid-From3").text(str);
				
				//str=$("#date3-to").val();
				str=((temp[0])["Product Attribute Valid To"])[2];
				$("#date3-to").replaceWith('<p id="Product-Attribute-Valid-To3" class="info-field"></p>');
				$("#Product-Attribute-Valid-To3").text(str);
				
				$("button#3.edit-attribute-info").toggle();
				$("button#3.add-attribute-info").toggle();
			    $("button#3.update-attribute-info").toggle();
			    $("button#3.cancel-attribute-info").toggle();
			}else if(e.target.id==4){
				//var str=$("#input-Product-Value-Text4").val();
				var str=((temp[0])["Product Value Text"])[3];
				$("#input-Product-Value-Text4").replaceWith('<p id="Product-Value-Text4" class="info-field"></p>');
				$("#Product-Value-Text4").text(str);
				
				//str=$("#date4-from").val();
				str=((temp[0])["Product Attribute Valid From"])[3];
				$("#date4-from").replaceWith('<p id="Product-Attribute-Valid-From4" class="info-field"></p>');
				$("#Product-Attribute-Valid-From4").text(str);
				
				//str=$("#date4-to").val();
				str=((temp[0])["Product Attribute Valid To"])[3];
				$("#date4-to").replaceWith('<p id="Product-Attribute-Valid-To4" class="info-field"></p>');
				$("#Product-Attribute-Valid-To4").text(str);
				
				$("button#4.edit-attribute-info").toggle();
				$("button#4.add-attribute-info").toggle();
			    $("button#4.update-attribute-info").toggle();
			    $("button#4.cancel-attribute-info").toggle();
			}else if(e.target.id==5){
				//var str=$("#input-Product-Value-Text5").val();
				var str=((temp[0])["Product Value Text"])[4];
				$("#input-Product-Value-Text5").replaceWith('<p id="Product-Value-Text5" class="info-field"></p>');
				$("#Product-Value-Text5").text(str);
				
				//str=$("#date5-from").val();
				str=((temp[0])["Product Attribute Valid From"])[4];
				$("#date5-from").replaceWith('<p id="Product-Attribute-Valid-From5" class="info-field"></p>');
				$("#Product-Attribute-Valid-From5").text(str);
				
				//str=$("#date5-to").val();
				str=((temp[0])["Product Attribute Valid To"])[4];
				$("#date5-to").replaceWith('<p id="Product-Attribute-Valid-To5" class="info-field"></p>');
				$("#Product-Attribute-Valid-To5").text(str);
				
				$("button#5.edit-attribute-info").toggle();
				$("button#5.add-attribute-info").toggle();
			    $("button#5.update-attribute-info").toggle();
			    $("button#5.cancel-attribute-info").toggle();
			}else if(e.target.id==6){
				//var str=$("#input-Product-Value-Text6").val();
				var str=((temp[0])["Product Value Text"])[5];
				$("#input-Product-Value-Text6").replaceWith('<p id="Product-Value-Text6" class="info-field"></p>');
				$("#Product-Value-Text6").text(str);
				
				//str=$("#date6-from").val();
				str=((temp[0])["Product Attribute Valid From"])[5];
				$("#date6-from").replaceWith('<p id="Product-Attribute-Valid-From6" class="info-field"></p>');
				$("#Product-Attribute-Valid-From6").text(str);
				
				//str=$("#date6-to").val();
				str=((temp[0])["Product Attribute Valid To"])[5];
				$("#date6-to").replaceWith('<p id="Product-Attribute-Valid-To6" class="info-field"></p>');
				$("#Product-Attribute-Valid-To6").text(str);
				
				$("button#6.edit-attribute-info").toggle();
				$("button#6.add-attribute-info").toggle();
			    $("button#6.update-attribute-info").toggle();
			    $("button#6.cancel-attribute-info").toggle();
			}else if(e.target.id==7){
				//var str=$("#input-Product-Value-Text7").val();
				var str=((temp[0])["Product Value Text"])[6];
				$("#input-Product-Value-Text7").replaceWith('<p id="Product-Value-Text7" class="info-field"></p>');
				$("#Product-Value-Text7").text(str);
				
				//str=$("#date7-from").val();
				str=((temp[0])["Product Attribute Valid From"])[6];
				$("#date7-from").replaceWith('<p id="Product-Attribute-Valid-From7" class="info-field"></p>');
				$("#Product-Attribute-Valid-From7").text(str);
				
				//str=$("#date7-to").val();
				str=((temp[0])["Product Attribute Valid To"])[6];
				$("#date7-to").replaceWith('<p id="Product-Attribute-Valid-To7" class="info-field"></p>');
				$("#Product-Attribute-Valid-To7").text(str);
				
				$("button#7.edit-attribute-info").toggle();
				$("button#7.add-attribute-info").toggle();
			    $("button#7.update-attribute-info").toggle();
			    $("button#7.cancel-attribute-info").toggle();
			}else if(e.target.id==8){
				//var str=$("#input-Product-Value-Text8").val();
				var str=((temp[0])["Product Value Text"])[7];
				$("#input-Product-Value-Text8").replaceWith('<p id="Product-Value-Text8" class="info-field"></p>');
				$("#Product-Value-Text8").text(str);
				
				//str=$("#date8-from").val();
				str=((temp[0])["Product Attribute Valid From"])[7];
				$("#date8-from").replaceWith('<p id="Product-Attribute-Valid-From8" class="info-field"></p>');
				$("#Product-Attribute-Valid-From8").text(str);
				
				//str=$("#date8-to").val();
				str=((temp[0])["Product Attribute Valid To"])[7];
				$("#date8-to").replaceWith('<p id="Product-Attribute-Valid-To8" class="info-field"></p>');
				$("#Product-Attribute-Valid-To8").text(str);
				
				$("button#8.edit-attribute-info").toggle();
				$("button#8.add-attribute-info").toggle();
			    $("button#8.update-attribute-info").toggle();
			    $("button#8.cancel-attribute-info").toggle();
			}
			
			$("a.datepicker-button.input-group-addon.green").remove();
			$(".datepicker-calendar.green").remove();
		});
		
		//trigger update attribute-info button
		$(".update-attribute-info").click(function(e){
			if(e.target.id==1){
				var arr_from=($("#date1-from").val()).split('/');
			    var arr_to=($("#date1-to").val()).split('/');
			
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
				//console.log(query);
				var query="UPDATE [product].[Product Attribute] SET [Product Attribute Valid From]='"+$("#date1-from").val()+"',[Product Attribute Valid To]='"+$("#date1-to").val()+"',[Product Value Text]='"+$("#input-Product-Value-Text1").val()+"' WHERE [Product Attribute Id]="+((temp[0])["Product Attribute Id"])[0];
				var data={};
			    data.title="update attribute";
			    data.message=query;
				
			    $.ajax({
				   type:'POST',
				   data:JSON.stringify(data),
				   contentType:'application/json',
				   url:'http://localhost:3000/update-attribute-info',
				   success:function(data){
					  console.log(data);
					  location.reload();
				    }
			    });
			}else if(e.target.id==2){
				var arr_from=($("#date2-from").val()).split('/');
			    var arr_to=($("#date2-to").val()).split('/');
			
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
				//console.log(query);
				var query="UPDATE [product].[Product Attribute] SET [Product Attribute Valid From]='"+$("#date2-from").val()+"',[Product Attribute Valid To]='"+$("#date2-to").val()+"',[Product Value Text]='"+$("#input-Product-Value-Text2").val()+"' WHERE [Product Attribute Id]="+((temp[0])["Product Attribute Id"])[1];
				var data={};
			    data.title="update attribute";
			    data.message=query;
				
			    $.ajax({
				   type:'POST',
				   data:JSON.stringify(data),
				   contentType:'application/json',
				   url:'http://localhost:3000/update-attribute-info',
				   success:function(data){
					  console.log(data);
					  location.reload();
				    }
			    });
			}else if(e.target.id==3){
				var arr_from=($("#date3-from").val()).split('/');
			    var arr_to=($("#date3-to").val()).split('/');
			
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
				//console.log(query);
				var query="UPDATE [product].[Product Attribute] SET [Product Attribute Valid From]='"+$("#date3-from").val()+"',[Product Attribute Valid To]='"+$("#date3-to").val()+"',[Product Value Text]='"+$("#input-Product-Value-Text3").val()+"' WHERE [Product Attribute Id]="+((temp[0])["Product Attribute Id"])[2];
				var data={};
			    data.title="update attribute";
			    data.message=query;
				
			    $.ajax({
				   type:'POST',
				   data:JSON.stringify(data),
				   contentType:'application/json',
				   url:'http://localhost:3000/update-attribute-info',
				   success:function(data){
					  console.log(data);
					  location.reload();
				    }
			    });
			}else if(e.target.id==4){
				var arr_from=($("#date4-from").val()).split('/');
			    var arr_to=($("#date4-to").val()).split('/');
			
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
				//console.log(query);
				var query="UPDATE [product].[Product Attribute] SET [Product Attribute Valid From]='"+$("#date4-from").val()+"',[Product Attribute Valid To]='"+$("#date4-to").val()+"',[Product Value Text]='"+$("#input-Product-Value-Text4").val()+"' WHERE [Product Attribute Id]="+((temp[0])["Product Attribute Id"])[3];
				var data={};
			    data.title="update attribute";
			    data.message=query;
				
			    $.ajax({
				   type:'POST',
				   data:JSON.stringify(data),
				   contentType:'application/json',
				   url:'http://localhost:3000/update-attribute-info',
				   success:function(data){
					  console.log(data);
					  location.reload();
				    }
			    });
			}else if(e.target.id==5){
				var arr_from=($("#date5-from").val()).split('/');
			    var arr_to=($("#date5-to").val()).split('/');
			
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
				//console.log(query);
				var query="UPDATE [product].[Product Attribute] SET [Product Attribute Valid From]='"+$("#date5-from").val()+"',[Product Attribute Valid To]='"+$("#date5-to").val()+"',[Product Value Text]='"+$("#input-Product-Value-Text5").val()+"' WHERE [Product Attribute Id]="+((temp[0])["Product Attribute Id"])[4];
				var data={};
			    data.title="update attribute";
			    data.message=query;
				
			    $.ajax({
				   type:'POST',
				   data:JSON.stringify(data),
				   contentType:'application/json',
				   url:'http://localhost:3000/update-attribute-info',
				   success:function(data){
					  console.log(data);
					  location.reload();
				    }
			    });
			}else if(e.target.id==6){
				var arr_from=($("#date6-from").val()).split('/');
			    var arr_to=($("#date6-to").val()).split('/');
			
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
				//console.log(query);
				var query="UPDATE [product].[Product Attribute] SET [Product Attribute Valid From]='"+$("#date6-from").val()+"',[Product Attribute Valid To]='"+$("#date6-to").val()+"',[Product Value Text]='"+$("#input-Product-Value-Text6").val()+"' WHERE [Product Attribute Id]="+((temp[0])["Product Attribute Id"])[5];
				var data={};
			    data.title="update attribute";
			    data.message=query;
				
			    $.ajax({
				   type:'POST',
				   data:JSON.stringify(data),
				   contentType:'application/json',
				   url:'http://localhost:3000/update-attribute-info',
				   success:function(data){
					  console.log(data);
					  location.reload();
				    }
			    });
			}else if(e.target.id==7){
				var arr_from=($("#date7-from").val()).split('/');
			    var arr_to=($("#date7-to").val()).split('/');
			
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
				//console.log(query);
				var query="UPDATE [product].[Product Attribute] SET [Product Attribute Valid From]='"+$("#date7-from").val()+"',[Product Attribute Valid To]='"+$("#date7-to").val()+"',[Product Value Text]='"+$("#input-Product-Value-Text7").val()+"' WHERE [Product Attribute Id]="+((temp[0])["Product Attribute Id"])[6];
				var data={};
			    data.title="update attribute";
			    data.message=query;
				
			    $.ajax({
				   type:'POST',
				   data:JSON.stringify(data),
				   contentType:'application/json',
				   url:'http://localhost:3000/update-attribute-info',
				   success:function(data){
					  console.log(data);
					  location.reload();
				    }
			    });
			}else if(e.target.id==8){
				var arr_from=($("#date8-from").val()).split('/');
			    var arr_to=($("#date8-to").val()).split('/');
			
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
				//console.log(query);
				var query="UPDATE [product].[Product Attribute] SET [Product Attribute Valid From]='"+$("#date8-from").val()+"',[Product Attribute Valid To]='"+$("#date8-to").val()+"',[Product Value Text]='"+$("#input-Product-Value-Text8").val()+"' WHERE [Product Attribute Id]="+((temp[0])["Product Attribute Id"])[7];
				var data={};
			    data.title="update attribute";
			    data.message=query;
				
			    $.ajax({
				   type:'POST',
				   data:JSON.stringify(data),
				   contentType:'application/json',
				   url:'http://localhost:3000/update-attribute-info',
				   success:function(data){
					  console.log(data);
					  location.reload();
				    }
			    });
			}
		});
		
		//trigger edit-association-info button
		$("button.edit-association-info").click(function(e){
			var str=$("#"+e.target.id+".product-association-valid-from").text();
			$("#"+e.target.id+".product-association-valid-from").replaceWith('<input style="width:100%;" class="form-control" id="association-date-from-'+e.target.id+'" type="text" placeholder="" title="format : "/><div id="association-date-from-'+e.target.id+'"></div>');
			$("#association-date-from-"+e.target.id).datepicker({theme:'green'});
			$("#association-date-from-"+e.target.id).val(str);
			
			str=$("#"+e.target.id+".product-association-valid-to").text();
			$("#"+e.target.id+".product-association-valid-to").replaceWith('<input style="width:100%;" class="form-control" id="association-date-to-'+e.target.id+'" type="text" placeholder="" title="format : "/><div id="association-date-to-'+e.target.id+'"></div>');
			$("#association-date-to-"+e.target.id).datepicker({theme:'green'});
			$("#association-date-to-"+e.target.id).val(str);
			
			str=$("#"+e.target.id+".child-product-name").text();
			//$("#Child-Product-Name-"+e.target.id).empty();
			$("#"+e.target.id+".child-product-name").replaceWith('<input id="input-child-product-name-'+e.target.id+'" style="width: 40%;"></input>');
			$("#Child-Product-Name-"+e.target.id).append('<!-- --><input id="'+e.target.id+'" class="search-child-product" style="width:120px;" placeholder="Search term..."></input>');
			$("#input-child-product-name-"+e.target.id).val(str);
			$("input#"+e.target.id+".search-child-product").toggle();
			$("button#"+e.target.id+".search-association-child-product-button").toggle();
	    });
		
		//trigger search-button
		$(".search-association-child-product-button").click(function(e){
			var data={};
			if($("p#"+e.target.id+".association-type-id").text()==7){
				var query="select * from [product].[Product] where [Product Type Id]=1 and [Product Name] like '%"+$("input#"+e.target.id+".search-child-product").val()+"%'";
			}else if($("p#"+e.target.id+".association-type-id").text()==3){
				var query="select * from [product].[Product] where [Product Type Id]=1 and [Product Name] like '%"+$("input#"+e.target.id+".search-child-product").val()+"%'";
			}else if($("p#"+e.target.id+".association-type-id").text()==4){
				var query="select * from [product].[Product] where [Product Type Id]=2 and [Product Name] like '%"+$("input#"+e.target.id+".search-child-product").val()+"%'";
			}else if($("p#"+e.target.id+".association-type-id").text()==5){
				var query="select * from [product].[Product] where [Product Type Id]=3 and [Product Name] like '%"+$("input#"+e.target.id+".search-child-product").val()+"%'";
			}else if($("p#"+e.target.id+".association-type-id").text()==6){
				var query="select * from [product].[Product] where [Product Type Id]=6 and [Product Name] like '%"+$("input#"+e.target.id+".search-child-product").val()+"%'";
			}else if($("p#"+e.target.id+".association-type-id").text()==9){
				var query="select * from [product].[Product] where [Product Type Id]=1 and [Product Name] like '%"+$("input#"+e.target.id+".search-child-product").val()+"%'";
			}else{
				var query="select * from [product].[Product] where [Product Name] like '%"+$("input#"+e.target.id+".search-child-product").val()+"%'";
			}
			data.title="search child product for association";
			data.message=query;
			$.ajax({
				type:'POST',
				data:JSON.stringify(data),
				contentType:'application/json',
				url:'http://localhost:3000/executequery',
				success:function(data){
					console.log(JSON.stringify(data));
					$("ul#"+e.target.id+".dropdown-menu").empty();
					for(var i=0;i<data.length;i++){
						$("ul#"+e.target.id+".dropdown-menu").append('<li role="presentation"><a class="search-result-item" role="menuitem" tabindex="-1" id="'+e.target.id+'" value="'+(data[i])["Product Id"]+'">'+(data[i])["Product Name"]+'</a></li>');
					}
					if(!$("#"+e.target.id+".dropdown").is(':visible')){
						$("#"+e.target.id+".dropdown").toggle();
					}
					
					$("a.search-result-item").click(function(e){
						str=$(e.target).text();
						$("input#input-child-product-name-"+e.target.id).val(str);
						$("input#"+e.target.id+".search-result-product-id").val($(e.target).attr("value"));
					});
				}
			});
		});
		
		//trigger update-association-info button
		$("button.update-association-info").click(function(e){
			var arr_from=($("input#association-date-from-"+e.target.id).val()).split('/');
			var arr_to=($("input#association-date-to-"+e.target.id).val()).split('/');
			
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
			
			var data={};
			var arr=[];
			data.title="update query";
			var query1="update [product].[Product Association] set [Child Product Id]="+$("input#"+e.target.id+".search-result-product-id").val()+",[Product Association Valid From]='"+time_from+"',[Product Association Valid To]='"+time_to+"' where [Product Association Id]="+e.target.id;
			var query2="update [product].[Product] set [Parent Product Id]="+url+" where [Product Id]="+$("input#"+e.target.id+".search-result-product-id").val();
			var query3="update [product].[Product] set [Parent Product Id]=null where [Product Id]="+$("input#"+e.target.id+".original-child-product-id").val();
			arr.push(query1);
			arr.push(query2);
			arr.push(query3);
			data.message=arr;
			
			$.ajax({
				type:'POST',
				data:JSON.stringify(data),
				contentType:'application/json',
				url:'http://localhost:3000/executemultiupdatequery',
				success:function(data){
					console.log(data);
				}
			});
		});
		
		//trigger cancel-association-info button
		$("button.cancel-association-info").click(function(e){
			console.log("cancel");
		});
	}
});



$(window).bind('hashchange',function(e){
		var anchor=JSON.stringify(document.location.hash);
        var temp1=anchor.replace('"','');
        var temp2=temp1.replace('"','');
        var pagenumberstring=temp2.replace('#page-','');
        var pagenumber=parseInt(pagenumberstring);
		console.log(temptotalpage);
		console.log(pagenumber);

		if(((pagenumber+1)>temptotalpage)&&(templeft>0)){
			$("#association-list").empty();
			var bottom=(pagenumber-1)*3;
            var top=templeft+bottom;
			for(var i=bottom;i<top;i++){
				$("#association-list").append("<div class='col-sm-4'><div class='panel panel-default text-center'><div class='panel-heading'><h1>Association</h1></div><div class='panel-body'><p id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='association-type-id'>"+(tempdata[i])["Parent Association:Association Type Id"]+"</p><label><strong>Association Type Name</strong></label><p id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='association-id'>"+(tempdata[i])["Parent Association:Association Type Name"]+"</p><label><strong>Parent Product</strong></label><p id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='parent-product-name'>"+(tempdata[i])["Parent Association:Parent Product Name"]+"</p><label><strong>Child Product</strong></label><div id='Child-Product-Name-"+(tempdata[i])["Parent Association:Association Id"]+"'><p id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='child-product-name'>"+(tempdata[i])["Parent Association:Child Product Name"]+"</p><!-- --><span id='"+(tempdata[i])["Parent Association:Association Id"]+"' style='display:none;'><input id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='search-child-product' style='width:120px;' placeholder='Search term...'></input><!-- --><button class='btn btn-default search-association-child-product-button' style='min-width:35px;'><span class='glyphicon glyphicon-search'></span></button></span></div><label><strong>Association Valid From</strong></label><p id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='product-association-valid-from'>"+(tempdata[i])["Parent Association:Product Association Valid From"]+"</p><label><strong>Association Valid To</strong></label><p id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='product-association-valid-to'>"+(tempdata[i])["Parent Association:Product Association Valid To"]+"</p></div><div class='panel-footer'><button id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='btn btn-lg edit-association-info'>Edit</button></div></div></div>");
	        }
		}else{
			$("#association-list").empty();
			var bottom=(pagenumber-1)*3;
            var top=pagenumber*3;
			for(var i=bottom;i<top;i++){
				$("#association-list").append("<div class='col-sm-4'><div class='panel panel-default text-center'><div class='panel-heading'><h1>Association</h1></div><div class='panel-body'><p id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='association-type-id'>"+(tempdata[i])["Parent Association:Association Type Id"]+"</p><label><strong>Association Type Name</strong></label><p id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='association-id'>"+(tempdata[i])["Parent Association:Association Type Name"]+"</p><label><strong>Parent Product</strong></label><p id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='parent-product-name'>"+(tempdata[i])["Parent Association:Parent Product Name"]+"</p><label><strong>Child Product</strong></label><div id='Child-Product-Name-"+(tempdata[i])["Parent Association:Association Id"]+"'><p id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='child-product-name'>"+(tempdata[i])["Parent Association:Child Product Name"]+"</p><!-- --><span id='"+(tempdata[i])["Parent Association:Association Id"]+"' style='display:none;'><input id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='search-child-product' style='width:120px;' placeholder='Search term...'></input><!-- --><button class='btn btn-default search-association-child-product-button' style='min-width:35px;'><span class='glyphicon glyphicon-search'></span></button></span></div><label><strong>Association Valid From</strong></label><p id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='product-association-valid-from'>"+(tempdata[i])["Parent Association:Product Association Valid From"]+"</p><label><strong>Association Valid To</strong></label><p id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='product-association-valid-to'>"+(tempdata[i])["Parent Association:Product Association Valid To"]+"</p></div><div class='panel-footer'><button id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='btn btn-lg edit-association-info'>Edit</button></div></div></div>");
			}
		}
});


