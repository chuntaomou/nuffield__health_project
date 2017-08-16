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
		//console.log(JSON.stringify(data));
		var producttypeid=(data[0])["Product Type Id"];
		$("input#modal-product-type-id").val((data[0])["Product Type Id"]);
		//load association-modal
		if(producttypeid==1){
			$("ul#modal-association-dropdown").append("<li id='1'><a id='1' value='Product Family Hierarch' class='modal-association-type-item'>Product Family Hierarchy</a></li><li id='2'><a id='2' class='modal-association-type-item' value='Product Brand Hierarchy'>Product Brand Hierarchy</a></li><li id='8'><a id='8' class='modal-association-type-item' value='Product Composition Hierarchy'>Product Composition Hierarchy</a></li><li id='9'><a id='9' class='modal-association-type-item' value='Product to Product Composition'>Product to Product Composition</a></li>");
		}else if(producttypeid==2){
			$("ul#modal-association-dropdown").append("<li id='1'><a id='1' value='Product Family Hierarch' class='modal-association-type-item'>Product Family Hierarchy</a></li><li id='2'><a id='2' class='modal-association-type-item' value='Product Brand Hierarchy'>Product Brand Hierarchy</a></li><li id='8'><a id='8' class='modal-association-type-item' value='Product Composition Hierarchy'>Product Composition Hierarchy</a></li><li id='3'><a id='3' class='modal-association-type-item' value='Product to Product Group'>Product to Product Group</a></li>");
		}else if(producttypeid==3){
			$("ul#modal-association-dropdown").append("<li id='1'><a id='1' value='Product Family Hierarch' class='modal-association-type-item'>Product Family Hierarchy</a></li><li id='2'><a id='2' class='modal-association-type-item' value='Product Brand Hierarchy'>Product Brand Hierarchy</a></li><li id='8'><a id='8' class='modal-association-type-item' value='Product Composition Hierarchy'>Product Composition Hierarchy</a></li><li id='4'><a id='4' class='modal-association-type-item' value='Product Group to Product Class'>Product Group to Product Class</a></li>");
		}else if(producttypeid==4){
			$("ul#modal-association-dropdown").append("<li id='1'><a id='1' value='Product Family Hierarch' class='modal-association-type-item'>Product Family Hierarchy</a></li><li id='2'><a id='2' class='modal-association-type-item' value='Product Brand Hierarchy'>Product Brand Hierarchy</a></li><li id='8'><a id='8' class='modal-association-type-item' value='Product Composition Hierarchy'>Product Composition Hierarchy</a></li><li id='5'><a id='5' class='modal-association-type-item' value='Product Class to Product Family'>Product Class to Product Family</a></li>");
		}else if(producttypeid==6){
			$("ul#modal-association-dropdown").append("<li id='1'><a id='1' value='Product Family Hierarch' class='modal-association-type-item'>Product Family Hierarchy</a></li><li id='2'><a id='2' class='modal-association-type-item' value='Product Brand Hierarchy'>Product Brand Hierarchy</a></li><li id='8'><a id='8' class='modal-association-type-item' value='Product Composition Hierarchy'>Product Composition Hierarchy</a></li><li id='6'><a id='6' class='modal-association-type-item' value='Product Sub Brand to Product Brand'>Product Sub Brand to Product Brand</a></li>");
		}else if(producttypeid==7){
			$("ul#modal-association-dropdown").append("<li id='1'><a id='1' value='Product Family Hierarch' class='modal-association-type-item'>Product Family Hierarchy</a></li><li id='2'><a id='2' class='modal-association-type-item' value='Product Brand Hierarchy'>Product Brand Hierarchy</a></li><li id='8'><a id='8' class='modal-association-type-item' value='Product Composition Hierarchy'>Product Composition Hierarchy</a></li><li id='7'><a id='7' class='modal-association-type-item' value='Product to Product Sub Brand'>Product to Product Sub Brand</a></li>");
		}
		
		//load general-info
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
			var totalpage=(data.length-left)/3+1;
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
		if((data[0])["Child Association:Association Id"]!=null){
		$("#child-association").append("<div class='panel panel-default text-center'><div class='panel-heading'><h1>Association</h1></div><div class='panel-body'><input id='"+(data[0])["Child Association:Association Id"]+"' style='display:none;' class='original-parent-product-id'></input><input id='"+(data[0])["Child Association:Association Id"]+"' style='display:none;' class='search-child-product-id'></input><p id='"+(data[0])["Child Association:Association Id"]+"' style='display:none;' class='association-type-id'>"+(data[0])["Child Association:Association Type Id"]+"</p><label><strong>Association Type Name</strong></label><p id='"+(data[0])["Child Association:Association Id"]+"' class='association-id'>"+(data[0])["Child Association:Association Type Name"]+"</p><label><strong>Parent Product</strong></label><div id='Parent-Product-Name-"+(data[0])["Child Association:Association Id"]+"'><p id='"+(data[0])["Child Association:Association Id"]+"' class='parent-product-name'>"+(data[0])["Child Association:Parent Product Name"]+"</p><!-- --><input id='"+(data[0])["Child Association:Association Id"]+"' class='search-parent-product' style='width:110px; display:none;' placeholder='Search term...'></input><!-- --><button id='"+(data[0])["Child Association:Association Id"]+"' class='btn btn-default search-association-parent-product-button' style='min-width:35px; display:none;'><span id='"+(data[0])["Child Association:Association Id"]+"' class='glyphicon glyphicon-search'></span></button><div id='"+(data[0])["Child Association:Association Id"]+"' class='dropdown association' style='display:none;'><button id='menu2' class='btn btn-default dropdown-toggle' data-toggle='dropdown'>results<span class='caret'></span></button><ul id='"+(data[0])["Child Association:Association Id"]+"' class='dropdown-menu' style='height:200px; overflow-y:scroll; width:240px;' role='menu' aria-labelledby='menu2'></ul></div></div><label><strong>Child Product</strong></label><p id='"+(data[0])["Child Association:Association Id"]+"'>"+(data[0])["Child Association:Child Product Name"]+"</p><label for='association-date-from-"+(data[0])["Child Association:Association Id"]+"'><strong>Association Valid From</strong></label><p id='"+(data[0])["Child Association:Association Id"]+"' class='product-association-valid-from'>"+(data[0])["Child Association:Product Association Valid From"]+"</p><label for='association-date-to-"+(data[0])["Child Association:Association Id"]+"'><strong>Association Valid To</strong></label><p id='"+(data[0])["Child Association:Association Id"]+"' class='product-association-valid-to'>"+(data[0])["Child Association:Product Association Valid To"]+"</p></div><div class='panel-footer'><button id='"+(data[0])["Child Association:Association Id"]+"' class='btn btn-lg edit-association-info'>Edit</button><!-- --><button style='display:none;' id='"+(data[0])["Child Association:Association Id"]+"' class='btn btn-lg cancel-association-info'>Cancel</button><!-- --><button style='display:none;' id='"+(data[0])["Child Association:Association Id"]+"' class='btn btn-lg update-association-info'>Update</button></div></div>");
		$("input#"+(data[0])["Child Association:Association Id"]+".search-child-product-id").val((data[0])["Child Association:Parent Product Id"]);
	    $("input#"+(data[0])["Child Association:Association Id"]+".original-parent-product-id").val((data[0])["Child Association:Parent Product Id"]);
		}
		
		if((data[0])["Parent Association:Association Id"]!=null){
		for(var i=0;i<length;i++){
			$("#association-list").append("<div class='col-sm-4'><div class='panel panel-default text-center'><div class='panel-heading'><h1>Association</h1></div><div class='panel-body'><input id='"+(data[i])["Parent Association:Association Id"]+"' class='original-child-product-id'></input><input id='"+(data[i])["Parent Association:Association Id"]+"' class='search-result-product-id'></input><p id='"+(data[i])["Parent Association:Association Id"]+"' class='association-type-id'>"+(data[i])["Parent Association:Association Type Id"]+"</p><label><strong>Association Type Name</strong></label><p id='"+(data[i])["Parent Association:Association Id"]+"' class='association-id'>"+(data[i])["Parent Association:Association Type Name"]+"</p><label><strong>Parent Product</strong></label><p id='"+(data[i])["Parent Association:Association Id"]+"' class='parent-product-name'>"+(data[i])["Parent Association:Parent Product Name"]+"</p><label><strong>Child Product</strong></label><div id='Child-Product-Name-"+(data[i])["Parent Association:Association Id"]+"'><p id='"+(data[i])["Parent Association:Association Id"]+"' class='child-product-name'>"+(data[i])["Parent Association:Child Product Name"]+"</p><!-- --><input id='"+(data[i])["Parent Association:Association Id"]+"' class='search-child-product' style='width:110px; display:none;' placeholder='Search term...'></input><!-- --><button id='"+(data[i])["Parent Association:Association Id"]+"' class='btn btn-default search-association-child-product-button' style='min-width:35px; display:none;'><span id='"+(data[i])["Parent Association:Association Id"]+"' class='glyphicon glyphicon-search'></span></button><div id='"+(data[i])["Parent Association:Association Id"]+"' class='dropdown association' style='display:none;'><button id='menu1' class='btn btn-default dropdown-toggle' data-toggle='dropdown'>results<span class='caret'></span></button><ul id='"+(data[i])["Parent Association:Association Id"]+"' class='dropdown-menu' style='height: 200px; overflow-y:scroll; width: 240px;' role='menu' aria-labelledby='menu1'></ul></div></div><label for='association-date-from-"+(data[i])["Parent Association:Association Id"]+"'><strong>Association Valid From</strong></label><p id='"+(data[i])["Parent Association:Association Id"]+"' class='product-association-valid-from'>"+(data[i])["Parent Association:Product Association Valid From"]+"</p><label for='association-date-to-"+(data[i])["Parent Association:Association Id"]+"'><strong>Association Valid To</strong></label><p id='"+(data[i])["Parent Association:Association Id"]+"' class='product-association-valid-to'>"+(data[0])["Parent Association:Product Association Valid To"]+"</p></div><div class='panel-footer'><button id='"+(data[i])["Parent Association:Association Id"]+"' class='btn btn-lg edit-parent-association-info'>Edit</button><!-- --><button style='display:none;' id='"+(data[i])["Parent Association:Association Id"]+"' value="+i+" class='btn btn-lg cancel-parent-association-info'>Cancel</button><!-- --><button style='display:none;' id='"+(data[i])["Parent Association:Association Id"]+"' class='btn btn-lg update-parent-association-info'>Update</button></div></div></div>");
		    $("input#"+(data[i])["Parent Association:Association Id"]+".search-result-product-id").val((data[i])["Parent Association:Child Product Id"]);
			$("input#"+(data[i])["Parent Association:Association Id"]+".original-child-product-id").val((data[i])["Parent Association:Child Product Id"]);
		}
		
		
		$("#association-pagination").pagination({
		  items: data.length,
		  itemsOnPage: 3,
		  cssStyle: 'light-theme'
        });
		}
		//load attribute-info
		temp=data;
		if(((data[0])["Product Attribute Id"])!=null){
		for(var i=0;i<((data[0])["Product Attribute Id"]).length;i++){
			if((((data[0])["Product Attribute Id"])[i])!=null){
				$("#attribute-list").append("<div class='col-sm-3'><div class='panel panel-default text-center'><div class='panel-heading'><h1>Attribute</h1></div><div class='panel-body'><label><strong>Attribute Type Name</strong></label><p id='"+((data[0])["Product Attribute Id"])[i]+"' class='product-attribute-type-name'>"+((data[0])["Product Attribute Type Name"])[i]+"</p><label><strong>Attribute Value</strong></label><p id='"+((data[0])["Product Attribute Id"])[i]+"' class='attribute-value'>"+((data[0])["Product Value Text"])[i]+"</p><label for='attribute-date-from-"+((data[0])["Product Attribute Id"])[i]+"'><strong>Attribute Valid From</strong></label><p id='"+((data[0])["Product Attribute Id"])[i]+"' class='product-attribute-valid-from'>"+((data[0])["Product Attribute Valid From"])[i]+"</p><label for='attribute-date-to-"+((data[0])["Product Attribute Id"])[i]+"'><strong>Attribute Valid To</strong></label><p id='"+((data[0])["Product Attribute Id"])[i]+"' class='product-attribute-valid-to'>"+((data[0])["Product Attribute Valid To"])[i]+"</p></div><div class='panel-footer'><button id='"+((data[0])["Product Attribute Id"])[i]+"' class='btn btn-lg edit-attribute-info'>Edit</button><!-- --><button style='display:none;' id='"+((data[0])["Product Attribute Id"])[i]+"' class='btn btn-lg cancel-attribute-info'>Cancel</button><!-- --><button style='display:none;' id='"+((data[0])["Product Attribute Id"])[i]+"' class='btn btn-lg update-attribute-info'>Update</button></div></div></div>");
			}
		}
		}
		
		//triger edit button
		$(".edit-general-info").click(function(e){
			id=(data[0])["Parent Product Id"];
			var str=$("#Product-Code").text();
		    $("#Product-Code").replaceWith('<input id="input-Product-Code" style="width: 80%;"></input>');
		    $("#input-Product-Code").val(str);
			
			str=$("#Product-Name").text();
			$("#Product-Name").replaceWith('<input id="input-Product-Name" style="width: 80%;"></input>');
			$("#input-Product-Name").val(str);
			
			str=$("#Product-Description").text();
			$("#Product-Description").replaceWith('<textarea id="input-Product-Description" rows="10" cols="45"></textarea>');
            $("#input-Product-Description").text(str);
			
			str=$("#Product-External-Code").text();
			$("#Product-External-Code").replaceWith('<input id="input-Product-External-Code" style="width: 80%;"></input>');
		    $("#input-Product-External-Code").val(str);
			
			str=$("#Product-External-Id").text();
			$("#Product-External-Id").replaceWith('<input id="input-Product-External-Id" style="width: 80%;"></input>');
		    $("#input-Product-External-Id").val(str);
			
			str=$("#Parent-Product-Name").text();
			$("#Parent-Product-Name").replaceWith('<input id="input-Parent-Product-Name" style="width: 64%"></input>');
		    $("#input-Parent-Product-Name").val(str);
			
			str=$("#Product-Label").text();
			$("#Product-Label").replaceWith('<input id="input-Product-Label" style="width: 30%"></input>');
		    $("#input-Product-Label").val(str);
			
			str=$("#Product-Notes").text();
			$("#Product-Notes").replaceWith('<input id="input-Product-Notes" style="width: 30%"></input>');
		    $("#input-Product-Notes").val(str);

			str=$("#Product-Turn-Around-Time-Days").text();
			$("#Product-Turn-Around-Time-Days").replaceWith('<input id="input-Product-Turn-Around-Time-Days" style="width: 30%"></input>');
		    $("#input-Product-Turn-Around-Time-Days").val(str);
			
		    str=$("#Product-Valid-From").text();
			$("#Product-Valid-From").replaceWith('<input class="form-control" id="date-from" type="text" placeholder="" title="format : "/>');
			$('#date-from').datepicker({theme:'green'});			
			$("#date-from").val(str);
			
			str=$("#Product-Valid-To").text();
			$("#Product-Valid-To").replaceWith('<input class="form-control" id="date-to" type="text" placeholder="" title="format : "/>');
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
			
			$("#label-of-product-valid-from").remove();
			$("#label-of-product-valid-to").remove();
			$("a.datepicker-button.input-group-addon.green").remove();
			$(".datepicker-calendar.green").remove();
			
			str=(data[0])["Product Valid From"];
			$("#general-info-col-1").append("<div id='label-of-product-valid-from'><label for='date-from'>Product Valid From</label><p id='Product-Valid-From' class='info-field'></p></div>");
			$("#Product-Valid-From").text(str);
			
			str=(data[0])["Product Valid To"];
			$("#general-info-col-1").append("<div id='label-of-product-valid-to'><label for='date-to'>Product Valid To</label><p id='Product-Valid-To' class='info-field'></p></div>");
			$("#Product-Valid-To").text(str);
			if($("span#search").is(":visible")){
				$("span#search").toggle();
			}
			$("#input-field-view-button").toggle();
			$(".update-general-info").toggle();
			$(".edit-general-info").toggle();
			$(".cancel-general-info").toggle();
			$("#search-parent-product-form").toggle();
		});
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////		
		//trigger attribute edit button
		$("button.edit-attribute-info").click(function(e){
			var str=$("p#"+e.target.id+".attribute-value").text();
			$("p#"+e.target.id+".attribute-value").replaceWith('<input id="input-attribute-value-'+e.target.id+'" style="width:80%;"></input>');
			$("#input-attribute-value-"+e.target.id).val(str);
			
			str=$("p#"+e.target.id+".product-attribute-valid-from").text();
			$("p#"+e.target.id+".product-attribute-valid-from").replaceWith('<input id="attribute-date-from-'+e.target.id+'" class="form-control"/><div id="date-from-'+e.target.id+'-inline"></div>');
			$("#attribute-date-from-"+e.target.id).datepicker({theme:"green"});
			$("#attribute-date-from-"+e.target.id).val(str);
			
			str=$("p#"+e.target.id+".product-attribute-valid-to").text();
			$("p#"+e.target.id+".product-attribute-valid-to").replaceWith('<input id="attribute-date-to-'+e.target.id+'" class="form-control"/><div id="date-to-'+e.target.id+'-inline"></div>');
			$("#attribute-date-to-"+e.target.id).datepicker({theme:"green"});
			$("#attribute-date-to-"+e.target.id).val(str);
			
			$("button.edit-attribute-info").toggle();
			$("button.update-attribute-info").toggle();
			$("button.cancel-attribute-info").toggle();
		});
		
		//trigger cancel attribute-info
		$("button.cancel-attribute-info").click(function(e){
			location.reload();
		});
		
		//trigger update attribute-info button
		$("button.update-attribute-info").click(function(e){
			var arr_from=($("input#attribute-date-from-"+e.target.id).val()).split('/');
			var arr_to=($("input#attribute-date-to-"+e.target.id).val()).split('/');
			
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
			
			var query="UPDATE [product].[Product Attribute] SET [Product Attribute Valid From]='"+$("input#attribute-date-from-"+e.target.id).val()+"',[Product Attribute Valid To]='"+$("input#attribute-date-to-"+e.target.id).val()+"',[Product Value Text]='"+$("input#input-attribute-value-"+e.target.id).val()+"' WHERE [Product Attribute Id]="+e.target.id;
			var data={};
			data.title="update attribute";
			data.message=query;
			
			$.ajax({
			  type:'POST',
			  data:JSON.stringify(data),
			  contentType:'application/json',
			  url:'http://localhost:3000/executequery',
			  success:function(data){
				console.log(data);
			    location.reload();
			  }
			});
		});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//trigger edit-parent-association-info button
		$("button.edit-parent-association-info").click(function(e){
			console.log("click");
			var str=$("#"+e.target.id+".product-association-valid-from").text();
			$("#"+e.target.id+".product-association-valid-from").replaceWith('<input style="width:100%;" class="form-control" id="association-date-from-'+e.target.id+'" type="text" placeholder="" title="format : "/><div id="association-date-from-'+e.target.id+'"></div>');
			$("#association-date-from-"+e.target.id).datepicker({theme:'green'});
			$("#association-date-from-"+e.target.id).val(str);
			
			str=$("#"+e.target.id+".product-association-valid-to").text();
			$("#"+e.target.id+".product-association-valid-to").replaceWith('<input style="width:100%;" class="form-control" id="association-date-to-'+e.target.id+'" type="text" placeholder="" title="format : "/><div id="association-date-to-'+e.target.id+'"></div>');
			$("#association-date-to-"+e.target.id).datepicker({theme:'green'});
			$("#association-date-to-"+e.target.id).val(str);
			
			str=$("#"+e.target.id+".child-product-name").text();
			$("#"+e.target.id+".child-product-name").replaceWith('<input id="input-child-product-name-'+e.target.id+'" style="width: 40%;"></input>');
			$("#input-child-product-name-"+e.target.id).val(str);
			$("input#"+e.target.id+".search-child-product").toggle();
			$("button#"+e.target.id+".search-association-child-product-button").toggle();
			$("button#"+e.target.id+".edit-parent-association-info").toggle();
			$("button#"+e.target.id+".update-parent-association-info").toggle();
			$("button#"+e.target.id+".cancel-parent-association-info").toggle();
	    });
		
		//trigger edit association-info button
		$("button.edit-association-info").click(function(e){
			var str=$("#"+e.target.id+".product-association-valid-from").text();
			$("#"+e.target.id+".product-association-valid-from").replaceWith('<input style="width:100%;" class="form-control" id="association-date-from-'+e.target.id+'" type="text" placeholder="" title="format : "/><div id="association-date-from-'+e.target.id+'"></div>');
			$("#association-date-from-"+e.target.id).datepicker({theme:'green'});
			$("#association-date-from-"+e.target.id).val(str);
			
			str=$("#"+e.target.id+".product-association-valid-to").text();
			$("#"+e.target.id+".product-association-valid-to").replaceWith('<input style="width:100%;" class="form-control" id="association-date-to-'+e.target.id+'" type="text" placeholder="" title="format : "/><div id="association-date-to-'+e.target.id+'"></div>');
			$("#association-date-to-"+e.target.id).datepicker({theme:'green'});
			$("#association-date-to-"+e.target.id).val(str);
			
			str=$("#"+e.target.id+".parent-product-name").text();
			$("#"+e.target.id+".parent-product-name").replaceWith('<input id="input-parent-product-name-'+e.target.id+'" style="width: 40%;"></input>');
			$("#input-parent-product-name-"+e.target.id).val(str);
			$("input#"+e.target.id+".search-parent-product").toggle();
			$("button#"+e.target.id+".search-association-parent-product-button").toggle();
			$("button#"+e.target.id+".edit-association-info").toggle();
			$("button#"+e.target.id+".update-association-info").toggle();
			$("button#"+e.target.id+".cancel-association-info").toggle();
	    });
		
		//trigger search-parent-button
		$(".search-association-parent-product-button").click(function(e){
			var data={};
			if($("p#"+e.target.id+".association-type-id").text()==7){
				var query="select * from [product].[Product] where [Product Type Id]=7 and [Product Name] like '%"+$("input#"+e.target.id+".search-parent-product").val()+"%'";
			}else if($("p#"+e.target.id+".association-type-id").text()==3){
				var query="select * from [product].[Product] where [Product Type Id]=2 and [Product Name] like '%"+$("input#"+e.target.id+".search-parent-product").val()+"%'";
			}else if($("p#"+e.target.id+".association-type-id").text()==4){
				var query="select * from [product].[Product] where [Product Type Id]=3 and [Product Name] like '%"+$("input#"+e.target.id+".search-parent-product").val()+"%'";
			}else if($("p#"+e.target.id+".association-type-id").text()==5){
				var query="select * from [product].[Product] where [Product Type Id]=4 and [Product Name] like '%"+$("input#"+e.target.id+".search-parent-product").val()+"%'";
			}else if($("p#"+e.target.id+".association-type-id").text()==6){
				var query="select * from [product].[Product] where [Product Type Id]=6 and [Product Name] like '%"+$("input#"+e.target.id+".search-parent-product").val()+"%'";
			}else if($("p#"+e.target.id+".association-type-id").text()==9){
				var query="select * from [product].[Product] where [Product Type Id]=1 and [Product Name] like '%"+$("input#"+e.target.id+".search-parent-product").val()+"%'";
			}else{
				var query="select * from [product].[Product] where [Product Name] like '%"+$("input#"+e.target.id+".search-parent-product").val()+"%'";
			}
			data.title="search parent product for association";
			data.message=query;
			$.ajax({
				type:'POST',
				data:JSON.stringify(data),
				contentType:'application/json',
				url:'http://localhost:3000/executequery',
				success:function(data){
					$("ul#"+e.target.id+".dropdown-menu").empty();
					for(var i=0;i<data.length;i++){
						$("ul#"+e.target.id+".dropdown-menu").append('<li role="presentation"><a class="search-result-item" role="menuitem" tabindex="-1" id="'+e.target.id+'" value="'+(data[i])["Product Id"]+'">'+(data[i])["Product Name"]+'</a></li>');
					}
					if(!$("#"+e.target.id+".dropdown").is(':visible')){
						$("#"+e.target.id+".dropdown").toggle();
					}
					
					$("a.search-result-item").click(function(e){
						str=$(e.target).text();
						$("input#input-parent-product-name-"+e.target.id).val(str);
						$("input#"+e.target.id+".search-child-product-id").val($(e.target).attr("value"));
					});
				}
			});
		});
		
		//trigger search-child-button
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
				var query="select * from [product].[Product] where [Product Type Id]=7 and [Product Name] like '%"+$("input#"+e.target.id+".search-child-product").val()+"%'";
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
			data.title="update parent produt in association";
			var query="update [product].[Product Association] set [Parent Product Id]="+$("input#"+e.target.id+".search-child-product-id").val()+",[Product Association Valid From]='"+time_from+"',[Product Association Valid To]='"+time_to+"' where [Product Association Id]="+e.target.id;
			data.message=query;
			
			$.ajax({
				type:'POST',
				data:JSON.stringify(data),
				contentType:'application/json',
				url:'http://localhost:3000/executequery',
				success:function(data){
					console.log(data);
					location.reload();
				}
			});
		});
		
		//trigger update-parent-association-info button
		$("button.update-parent-association-info").click(function(e){
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
					location.reload();
				}
			});
		});
		
		//trigger cancel-parent-association-info button
		$("button.cancel-parent-association-info").click(function(e){
			console.log(e.target.id);
			var value=$(e.target).attr('value');
			$("input#association-date-to-"+e.target.id).replaceWith("<p style='margin-left:50px;' id='"+e.target.id+"' class='product-association-valid-to'></p>");
			$("#"+e.target.id+".product-association-valid-to").text((data[value])["Parent Association:Product Association Valid To"]);
			$("input#association-date-from-"+e.target.id).replaceWith("<p style='margin-left:50px;' id='"+e.target.id+"' class='product-association-valid-from'>"+(data[value])["Parent Association:Product Association Valid From"]+"</p>");
			$("input#input-child-product-name-"+e.target.id).replaceWith("<p id='"+e.target.id+"' class='child-product-name'>"+(data[value])["Parent Association:Child Product Name"]+"</p>");
			$("input#"+e.target.id+".search-child-product").toggle();
			$("button#"+e.target.id+".search-association-child-product-button").toggle();
			$("a.datepicker-button.input-group-addon.green").remove();
			$(".datepicker-calendar.green").remove();
			if($("#"+e.target.id+".dropdown").is(':visible')){
				$("#"+e.target.id+".dropdown").toggle();
			}
			$("button#"+e.target.id+".edit-parent-association-info").toggle();
			$("button#"+e.target.id+".update-parent-association-info").toggle();
			$("button#"+e.target.id+".cancel-parent-association-info").toggle();
		});
		
		$("button.cancel-association-info").click(function(e){
			console.log(e.target.id);
			$("input#association-date-to-"+e.target.id).replaceWith("<p style='margin-left:50px;' id='"+e.target.id+"' class='product-association-valid-to'>"+(data[0])["Child Association:Product Association Valid To"]+"</p>");
			$("input#association-date-from-"+e.target.id).replaceWith("<p style='margin-left:50px;' id='"+e.target.id+"' class='product-association-valid-from'>"+(data[0])["Child Association:Product Association Valid From"]+"</p>");
			$("input#input-parent-product-name-"+e.target.id).replaceWith("<p id='"+e.target.id+"' class='parent-product-name'>"+(data[0])["Child Association:Parent Product Name"]+"</p>");
			$("input#"+e.target.id+".search-parent-product").toggle();
			$("button#"+e.target.id+".search-association-parent-product-button").toggle();
			$("a.datepicker-button.input-group-addon.green").remove();
			$(".datepicker-calendar.green").remove();
			if($("#"+e.target.id+".dropdown").is(':visible')){
				$("#"+e.target.id+".dropdown").toggle();
			}
			$("button#"+e.target.id+".edit-association-info").toggle();
			$("button#"+e.target.id+".update-association-info").toggle();
			$("button#"+e.target.id+".cancel-association-info").toggle();
		});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        $("a.modal-association-type-item").click(function(e){
			$("input#modal-association-type-id").val(e.target.id);
			$("input#association-type-name").val($(e.target).text());
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
				$("#association-list").append("<div class='col-sm-4'><div class='panel panel-default text-center'><div class='panel-heading'><h1>Association</h1></div><div class='panel-body'><input id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='original-child-product-id'></input><input id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='search-result-product-id'></input><p id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='association-type-id'>"+(tempdata[i])["Parent Association:Association Type Id"]+"</p><label><strong>Association Type Name</strong></label><p id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='association-id'>"+(tempdata[i])["Parent Association:Association Type Name"]+"</p><label><strong>Parent Product</strong></label><p id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='parent-product-name'>"+(tempdata[i])["Parent Association:Parent Product Name"]+"</p><label><strong>Child Product</strong></label><div id='Child-Product-Name-"+(tempdata[i])["Parent Association:Association Id"]+"'><p id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='child-product-name'>"+(tempdata[i])["Parent Association:Child Product Name"]+"</p><!-- --><input id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='search-child-product' style='width:110px; display:none;' placeholder='Search term...'></input><!-- --><button id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='btn btn-default search-association-child-product-button' style='min-width:35px; display:none;'><span id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='glyphicon glyphicon-search'></span></button><div id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='dropdown association' style='display:none;'><button id='menu1' class='btn btn-default dropdown-toggle' data-toggle='dropdown'>results<span class='caret'></span></button><ul id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='dropdown-menu' style='height: 200px; overflow-y:scroll; width: 240px;' role='menu' aria-labelledby='menu1'></ul></div></div><label for='association-date-from-"+(tempdata[i])["Parent Association:Association Id"]+"'><strong>Association Valid From</strong></label><p id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='product-association-valid-from'>"+(tempdata[i])["Parent Association:Product Association Valid From"]+"</p><label for='association-date-to-"+(tempdata[i])["Parent Association:Association Id"]+"'><strong>Association Valid To</strong></label><p id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='product-association-valid-to'>"+(tempdata[0])["Parent Association:Product Association Valid To"]+"</p></div><div class='panel-footer'><button id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='btn btn-lg edit-parent-association-info'>Edit</button><!-- --><button id='"+(tempdata[i])["Parent Association:Association Id"]+"' value="+i+" class='btn btn-lg cancel-parent-association-info'>Cancel</button><!-- --><button id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='btn btn-lg update-parent-association-info'>Update</button></div></div></div>");
		        $("input#"+(tempdata[i])["Parent Association:Association Id"]+".search-result-product-id").val((tempdata[i])["Parent Association:Child Product Id"]);
			    $("input#"+(tempdata[i])["Parent Association:Association Id"]+".original-child-product-id").val((tempdata[i])["Parent Association:Child Product Id"]);
			}				
		}else{
			$("#association-list").empty();
			var bottom=(pagenumber-1)*3;
            var top=pagenumber*3;
			for(var i=bottom;i<top;i++){
				$("#association-list").append("<div class='col-sm-4'><div class='panel panel-default text-center'><div class='panel-heading'><h1>Association</h1></div><div class='panel-body'><input id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='original-child-product-id'></input><input id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='search-result-product-id'></input><p id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='association-type-id'>"+(tempdata[i])["Parent Association:Association Type Id"]+"</p><label><strong>Association Type Name</strong></label><p id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='association-id'>"+(tempdata[i])["Parent Association:Association Type Name"]+"</p><label><strong>Parent Product</strong></label><p id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='parent-product-name'>"+(tempdata[i])["Parent Association:Parent Product Name"]+"</p><label><strong>Child Product</strong></label><div id='Child-Product-Name-"+(tempdata[i])["Parent Association:Association Id"]+"'><p id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='child-product-name'>"+(tempdata[i])["Parent Association:Child Product Name"]+"</p><!-- --><input id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='search-child-product' style='width:110px; display:none;' placeholder='Search term...'></input><!-- --><button id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='btn btn-default search-association-child-product-button' style='min-width:35px; display:none;'><span id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='glyphicon glyphicon-search'></span></button><div id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='dropdown association' style='display:none;'><button id='menu1' class='btn btn-default dropdown-toggle' data-toggle='dropdown'>results<span class='caret'></span></button><ul id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='dropdown-menu' style='height: 200px; overflow-y:scroll; width: 240px;' role='menu' aria-labelledby='menu1'></ul></div></div><label for='association-date-from-"+(tempdata[i])["Parent Association:Association Id"]+"'><strong>Association Valid From</strong></label><p id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='product-association-valid-from'>"+(tempdata[i])["Parent Association:Product Association Valid From"]+"</p><label for='association-date-to-"+(tempdata[i])["Parent Association:Association Id"]+"'><strong>Association Valid To</strong></label><p id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='product-association-valid-to'>"+(tempdata[0])["Parent Association:Product Association Valid To"]+"</p></div><div class='panel-footer'><button id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='btn btn-lg edit-parent-association-info'>Edit</button><!-- --><button id='"+(tempdata[i])["Parent Association:Association Id"]+"' value="+i+" class='btn btn-lg cancel-parent-association-info'>Cancel</button><!-- --><button id='"+(tempdata[i])["Parent Association:Association Id"]+"' class='btn btn-lg update-parent-association-info'>Update</button></div></div></div>");
		        $("input#"+(tempdata[i])["Parent Association:Association Id"]+".search-result-product-id").val((tempdata[i])["Parent Association:Child Product Id"]);
			    $("input#"+(tempdata[i])["Parent Association:Association Id"]+".original-child-product-id").val((tempdata[i])["Parent Association:Child Product Id"]);	        
			}
		}
});
