//global variables using for pass search parent product result
var name="foo";
var id=0;
//////////////////////////////////////////////////////////////
var temp=null;
var tempdata=null;
var temptotalpage=0;
var templeft=0;
var url=window.location.hash;
url=url.replace("#location-id:","");
console.log(url);
var data={};
data.title="location id";
data.message=url;

$.ajax({
	type: 'POST',
	data: JSON.stringify(data),
	contentType: 'application/json',
	url: '/locationinfoid',
	success: function(data){
		tempdata=data;
		var locationtypeid=(data[0])["Location Type Id"];
		$("input#modal-location-type-id").val((data[0])["Location Type Id"]);
		//load association modal
		if(locationtypeid==2){
			$("ul#modal-association-dropdown").append("<li id='1'><a id='1' value='Site Hierarch' class='modal-association-type-item'>Site Hierarchy</a></li><li id='2'><a id='2' class='modal-association-type-item' value='Site to Cluster'>Site to Cluster</a></li>");
		}else if(locationtypeid==3){
			$("ul#modal-association-dropdown").append("<li id='1'><a id='1' value='Site Hierarch' class='modal-association-type-item'>Site Hierarchy</a></li><li id='3'><a id='3' class='modal-association-type-item' value='Cluster to Region'>Cluster to Region</a></li>");
		}else{
			$("ul#modal-association-dropdown").append("<li id='1'><a id='1' value='Site Hierarch' class='modal-association-type-item'>Site Hierarchy</a></li>");
		}
		
		initmap();
		//load general-info
		if((data[0])["Location Description"]==null){
			(data[0])["Location Description"]="No Record";
		}
		if((data[0])["Location External Code"]==null){
			(data[0])["Location External Code"]="No Record";
		}
		if((data[0])["Location External Id"]==null){
			(data[0])["Location External Id"]="No Record";
		}
		if((data[0])["Location Label"]==null){
			(data[0])["Location Label"]="No Record";
		}
		if((data[0])["Location Notes"]==null){
			(data[0])["Location Notes"]="No Record";
		}
		if((data[0])["Record Termination Datetime"]==null){
			(data[0])["Record Termination Datetime"]="No Record";
		}
		if((data[0])["Record Copy Creation Datetime"]==null){
			(data[0])["Record Copy Creation Datetime"]="No Record";
		}
		if((data[0])["Parent Location Name"]==null){
			(data[0])["Parent Location Name"]="No Record";
		}
		
		$("#Location-Name").append((data[0])["Location Name"]);
		$("#Location-Description").append((data[0])["Location Description"]);
		$("#Location-Code").append((data[0])["Location Code"]);
		$("#Location-External-Code").append((data[0])["Location External Code"]);
		$("#Location-External-Id").append((data[0])["Location External Id"]);
		$("#Parent-Location-Name").append((data[0])["Parent Location Name"]);
		$("#Location-Label").append((data[0])["Location Label"]);
		$("#Location-Notes").append((data[0])["Location Notes"]);
		$("#Location-Type-Name").append((data[0])["Location Type Name"]);
		var time=((data[0])["Location Valid From"]).split('T');
		$("#Location-Valid-From").append(time[0]);
		time=((data[0])["Location Valid To"]).split('T');
		$("#Location-Valid-To").append(time[0]);
		$("#Record-Creation-Datetime").append(((data[0])["Record Creation Datetime"])[0]);
		$("#Record-Termination-Datetime").append((data[0])["Record Termination Datetime"]);
		$("#Record-Copy-Creation-Datetime").append((data[0])["Record Copy Creation Datetime"]);
		$("#Location-Postcode").append((data[0])["Location Postcode"]);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
		//load location association
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
		$("#child-association").append("<div class='panel panel-default text-center'><div class='panel-heading'><h1>Association</h1></div><div class='panel-body'><input id='"+(data[0])["Child Association:Association Id"]+"' class='original-parent-location-id' style='display:none;'></input><input id='"+(data[0])["Child Association:Association Id"]+"' class='search-child-location-id' style='display:none;'></input><p id='"+(data[0])["Child Association:Association Id"]+"' class='association-type-id' style='display:none;'>"+(data[0])["Child Association:Association Type Id"]+"</p><label><strong>Association Type Name</strong></label><p id='"+(data[0])["Child Association:Association Id"]+"' class='association-id'>"+(data[0])["Child Association:Association Type Name"]+"</p><label><strong>Parent Location</strong></label><div id='Parent-Location-Name-"+(data[0])["Child Association:Association Id"]+"'><p id='"+(data[0])["Child Association:Association Id"]+"' class='parent-location-name'>"+(data[0])["Child Association:Parent Location Name"]+"</p><!-- --><input id='"+(data[0])["Child Association:Association Id"]+"' class='search-parent-location' style='width:110px; display:none;' placeholder='Search term...'></input><!-- --><button id='"+(data[0])["Child Association:Association Id"]+"' class='btn btn-default search-association-parent-location-button' style='min-width:35px; display:none;'><span id='"+(data[0])["Child Association:Association Id"]+"' class='glyphicon glyphicon-search'></span></button><div id='"+(data[0])["Child Association:Association Id"]+"' class='dropdown association' style='display:none;'><button id='menu2' class='btn btn-default dropdown-toggle' data-toggle='dropdown'>results<span class='caret'></span></button><ul id='"+(data[0])["Child Association:Association Id"]+"' class='dropdown-menu' style='height:200px; overflow-y:scroll; width:240px;' role='menu' aria-labelledby='menu2'></ul></div></div><label><strong>Child Location</strong></label><p id='"+(data[0])["Child Association:Association Id"]+"'>"+(data[0])["Child Association:Child Location Name"]+"</p><label for='association-date-from-"+(data[0])["Child Association:Association Id"]+"'><strong>Association Valid From</strong></label><p id='"+(data[0])["Child Association:Association Id"]+"' class='location-association-valid-from'>"+(data[0])["Child Association:Location Association Valid From"]+"</p><label for='association-date-to-"+(data[0])["Child Association:Association Id"]+"'><strong>Association Valid To</strong></label><p id='"+(data[0])["Child Association:Association Id"]+"' class='location-association-valid-to'>"+(data[0])["Child Association:Location Association Valid To"]+"</p></div><div class='panel-footer'><button id='"+(data[0])["Child Association:Association Id"]+"' class='btn btn-lg edit-association-info'>Edit</button><!-- --><button style='display:none;' id='"+(data[0])["Child Association:Association Id"]+"' class='btn btn-lg cancel-association-info'>Cancel</button><!-- --><button style='display:none;' id='"+(data[0])["Child Association:Association Id"]+"' class='btn btn-lg update-association-info'>Update</button></div></div>");
		$("input#"+(data[0])["Child Association:Association Id"]+".search-child-location-id").val((data[0])["Child Association:Parent Location Id"]);
	    $("input#"+(data[0])["Child Association:Association Id"]+".original-parent-location-id").val((data[0])["Child Association:Parent Location Id"]);
		}
		
		if((data[0])["Parent Association:Association Id"]!=null){
		for(var i=0;i<length;i++){
			$("#association-list").append("<div class='col-sm-4'><div class='panel panel-default text-center'><div class='panel-heading'><h1>Association</h1></div><div class='panel-body'><input id='"+(data[i])["Parent Association:Association Id"]+"' class='original-child-location-id' style='display:none;'></input><input id='"+(data[i])["Parent Association:Association Id"]+"' class='search-result-location-id' style='display:none;'></input><p id='"+(data[i])["Parent Association:Association Id"]+"' class='association-type-id' style='display:none;'>"+(data[i])["Parent Association:Association Type Id"]+"</p><label><strong>Association Type Name</strong></label><p id='"+(data[i])["Parent Association:Association Id"]+"' class='association-id'>"+(data[i])["Parent Association:Association Type Name"]+"</p><label><strong>Parent Location</strong></label><p id='"+(data[i])["Parent Association:Association Id"]+"' class='parent-location-name'>"+(data[i])["Parent Association:Parent Location Name"]+"</p><label><strong>Child Location</strong></label><div id='Child-Location-Name-"+(data[i])["Parent Association:Association Id"]+"'><p id='"+(data[i])["Parent Association:Association Id"]+"' class='child-location-name'>"+(data[i])["Parent Association:Child Location Name"]+"</p><!-- --><input id='"+(data[i])["Parent Association:Association Id"]+"' class='search-child-location' style='width:110px; display:none;' placeholder='Search term...'></input><!-- --><button id='"+(data[i])["Parent Association:Association Id"]+"' class='btn btn-default search-association-child-location-button' style='min-width:35px; display:none;'><span id='"+(data[i])["Parent Association:Association Id"]+"' class='glyphicon glyphicon-search'></span></button><div id='"+(data[i])["Parent Association:Association Id"]+"' class='dropdown association' style='display:none;'><button id='menu1' class='btn btn-default dropdown-toggle' data-toggle='dropdown'>results<span class='caret'></span></button><ul id='"+(data[i])["Parent Association:Association Id"]+"' class='dropdown-menu' style='height: 200px; overflow-y:scroll; width: 240px;' role='menu' aria-labelledby='menu1'></ul></div></div><label for='association-date-from-"+(data[i])["Parent Association:Association Id"]+"'><strong>Association Valid From</strong></label><p id='"+(data[i])["Parent Association:Association Id"]+"' class='location-association-valid-from'>"+(data[i])["Parent Association:Location Association Valid From"]+"</p><label for='association-date-to-"+(data[i])["Parent Association:Association Id"]+"'><strong>Association Valid To</strong></label><p id='"+(data[i])["Parent Association:Association Id"]+"' class='location-association-valid-to'>"+(data[0])["Parent Association:Location Association Valid To"]+"</p></div><div class='panel-footer'><button id='"+(data[i])["Parent Association:Association Id"]+"' class='btn btn-lg edit-parent-association-info'>Edit</button><!-- --><button style='display:none;' id='"+(data[i])["Parent Association:Association Id"]+"' value="+i+" class='btn btn-lg cancel-parent-association-info'>Cancel</button><!-- --><button style='display:none;' id='"+(data[i])["Parent Association:Association Id"]+"' class='btn btn-lg update-parent-association-info'>Update</button></div></div></div>");
		    $("input#"+(data[i])["Parent Association:Association Id"]+".search-result-location-id").val((data[i])["Parent Association:Child Location Id"]);
			$("input#"+(data[i])["Parent Association:Association Id"]+".original-child-location-id").val((data[i])["Parent Association:Child Location Id"]);
		}
		
		
		$("#association-pagination").pagination({
		  items: data.length,
		  itemsOnPage: 3,
		  cssStyle: 'light-theme'
        });
		}
/////////////////////////////////////////////////////////////////////////////////////////
		//triger edit button
		$(".edit-general-info").click(function(e){
			id=(data[0])["Parent Location Id"];
			var str=$("#Location-Code").text();
		    $("#Location-Code").replaceWith('<div><input id="input-Location-Code" style="width: 80%;"></input></div>');
		    $("#input-Location-Code").val(str);
			
			str=$("#Location-Name").text();
			$("#Location-Name").replaceWith('<div><input id="input-Location-Name" style="width: 80%;"></input></div>');
			$("#input-Location-Name").val(str);
			
			str=$("#Location-Description").text();
			$("#Location-Description").replaceWith('<div><textarea id="input-Location-Description" rows="10" cols="45"></textarea></div>');
            $("#input-Location-Description").text(str);
			
			str=$("#Location-External-Code").text();
			$("#Location-External-Code").replaceWith('<div><input id="input-Location-External-Code" style="width: 80%;"></input></div>');
		    $("#input-Location-External-Code").val(str);
			
			str=$("#Location-External-Id").text();
			$("#Location-External-Id").replaceWith('<div><input id="input-Location-External-Id" style="width: 80%;"></input></div>');
		    $("#input-Location-External-Id").val(str);
			
			str=$("#Parent-Location-Name").text();
			$("#Parent-Location-Name").replaceWith('<input id="input-Parent-Location-Name" style="width: 64%"></input>');
		    $("#input-Parent-Location-Name").val(str);
			
			str=$("#Location-Label").text();
			$("#Location-Label").replaceWith('<div><input id="input-Location-Label" style="width: 30%"></input></div>');
		    $("#input-Location-Label").val(str);
			
			str=$("#Location-Notes").text();
			$("#Location-Notes").replaceWith('<div><input id="input-Location-Notes" style="width: 30%"></input></div>');
		    $("#input-Location-Notes").val(str);
			
		    str=$("#Location-Valid-From").text();
			$("#Location-Valid-From").replaceWith('<input class="form-control" id="date-from" type="text" placeholder="" title="format : "/><div id="date-from-inline"></div>');
			$('#date-from').datepicker({theme:'green'});			
			$("#date-from").val(str);
			
			str=$("#Location-Valid-To").text();
			$("#Location-Valid-To").replaceWith('<input class="form-control" id="date-to" type="text" placeholder="" title="format : "/><div id="date-to-inline"></div>');
			$('#date-to').datepicker({theme:'green'});			
			$("#date-to").val(str);
			
            $(".cancel-general-info").toggle();
			$(".update-general-info").toggle();
			$(".edit-general-info").toggle();
			$("#view-tree-menu").toggle();
			$("#search-parent-location-form").toggle();
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
			
				var query="UPDATE [location].[Location] SET [Parent Location Id]="+id+",[Location Name]='"+$("#input-Location-Name").val()+"',[Location Description]='"+$("#input-Location-Description").val()+"',[Location Code]='"+$("#input-Location-Code").val()+"',[Location External Code]='"+$("#input-Location-External-Code").val()+"',[Location External Id]='"+$("#input-Location-External-Id").val()+"',[Location Label]='"+$("#input-Location-Label").val()+"',[Location Notes]='"+$("#input-Location-Notes").val()+"',[Location Valid From]='"+time_from+"',[Location Valid To]='"+time_to+"' WHERE [Location Id]="+url;
			    console.log(query);
				var data={};
			    data.title="update query";
			    data.message=query;
			    $.ajax({
				   type:'POST',
				   data:JSON.stringify(data),
				   contentType:'application/json',
				   url:'/executequery',
				   success:function(data){
					  console.log(data);
					  location.reload();
				    }
			    });
		});
		
		//triger cancel button
		$("button.cancel-general-info").click(function(e){
			/*
			var str=(data[0])["Location Code"];
			$("#input-Location-Code").replaceWith('<p id="Location-Code" class="info-field"></p>');
			$("#Location-Code").text(str);
			
			//str=$("#input-Product-Name").val();
			str=(data[0])["Location Name"];
			$("#input-Location-Name").replaceWith('<p id="Location-Name" class="info-field"></p>');
			$("#Location-Name").text(str);
			
			//str=$("#input-Product-Description").val();
			str=(data[0])["Location Description"];
			$("#input-Location-Description").replaceWith('<p id="Location-Description" class="info-field"></p>');
			$("#Location-Description").text(str);
			
			//str=$("#input-Product-Label").val();
			str=(data[0])["Location Label"];
			$("#input-Location-Label").replaceWith('<p id="Location-Label" class="info-field"></p>');
			$("#Location-Label").text(str);
			
			//str=$("#input-Product-Notes").val();
			str=(data[0])["Location Notes"];
			$("#input-Location-Notes").replaceWith('<p id="Location-Notes" class="info-field"></p>');
			$("#Location-Notes").text(str);
			
			//str=$("#input-Product-External-Code").val();
			str=(data[0])["Location External Code"];
			$("#input-Location-External-Code").replaceWith('<p id="Location-External-Code" class="info-field"></p>');
			$("#Location-External-Code").text(str);
			
			//str=$("#input-Product-External-Id").val();
			str=(data[0])["Location External Id"];
			$("#input-Location-External-Id").replaceWith('<p id="Location-External-Id" class="info-field"></p>');
			$("#Location-External-Id").text(str);
			
			//str=$("#input-Parent-Product-Name").val();
			str=(data[0])["Parent Location Name"];
			$("#input-Parent-Location-Name").replaceWith('<p id="Parent-Location-Name" class="info-field"></p>');
			$("#Parent-Location-Name").text(str);
			
			//str=$("#date-from").val();
			str=(data[0])["Location Valid From"];
			$("#date-from").replaceWith('<p id="Location-Valid-From" class="info-field"></p>');
			$("#Location-Valid-From").text(str);
			
			//str=$("#date-to").val();
			str=(data[0])["Location Valid To"];
			$("#date-to").replaceWith('<p id="Location-Valid-To" class="info-field"></p>');
			$("#Location-Valid-To").text(str);
			
			$("a.datepicker-button.input-group-addon.green").remove();
			$(".datepicker-calendar.green").remove();
			
			$("span#search").toggle();
			$("#input-field-view-button").toggle();
			$(".update-general-info").toggle();
			$(".edit-general-info").toggle();
			$(".cancel-general-info").toggle();
			$("#view-tree-menu").toggle();
			$("#search-parent-product-form").toggle();
			*/
			location.reload();
		});
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
        //trigger edit-parent-association-info button
		$("button.edit-parent-association-info").click(function(e){
			console.log("click");
			var str=$("#"+e.target.id+".location-association-valid-from").text();
			$("#"+e.target.id+".location-association-valid-from").replaceWith('<input style="width:100%;" class="form-control" id="association-date-from-'+e.target.id+'" type="text" placeholder="" title="format : "/><div id="association-date-from-'+e.target.id+'"></div>');
			$("#association-date-from-"+e.target.id).datepicker({theme:'green'});
			$("#association-date-from-"+e.target.id).val(str);
			
			str=$("#"+e.target.id+".location-association-valid-to").text();
			$("#"+e.target.id+".location-association-valid-to").replaceWith('<input style="width:100%;" class="form-control" id="association-date-to-'+e.target.id+'" type="text" placeholder="" title="format : "/><div id="association-date-to-'+e.target.id+'"></div>');
			$("#association-date-to-"+e.target.id).datepicker({theme:'green'});
			$("#association-date-to-"+e.target.id).val(str);
			
			str=$("#"+e.target.id+".child-location-name").text();
			$("#"+e.target.id+".child-location-name").replaceWith('<input id="input-child-location-name-'+e.target.id+'" style="width: 40%;"></input>');
			$("#input-child-location-name-"+e.target.id).val(str);
			$("input#"+e.target.id+".search-child-location").toggle();
			$("button#"+e.target.id+".search-association-child-location-button").toggle();
			$("button#"+e.target.id+".edit-parent-association-info").toggle();
			$("button#"+e.target.id+".update-parent-association-info").toggle();
			$("button#"+e.target.id+".cancel-parent-association-info").toggle();
	    });
		
		//trigger edit association-info button
		$("button.edit-association-info").click(function(e){
			var str=$("#"+e.target.id+".location-association-valid-from").text();
			$("#"+e.target.id+".location-association-valid-from").replaceWith('<input style="width:100%;" class="form-control" id="association-date-from-'+e.target.id+'" type="text" placeholder="" title="format : "/><div id="association-date-from-'+e.target.id+'"></div>');
			$("#association-date-from-"+e.target.id).datepicker({theme:'green'});
			$("#association-date-from-"+e.target.id).val(str);
			
			str=$("#"+e.target.id+".location-association-valid-to").text();
			$("#"+e.target.id+".location-association-valid-to").replaceWith('<input style="width:100%;" class="form-control" id="association-date-to-'+e.target.id+'" type="text" placeholder="" title="format : "/><div id="association-date-to-'+e.target.id+'"></div>');
			$("#association-date-to-"+e.target.id).datepicker({theme:'green'});
			$("#association-date-to-"+e.target.id).val(str);
			
			str=$("#"+e.target.id+".parent-location-name").text();
			$("#"+e.target.id+".parent-location-name").replaceWith('<input id="input-parent-location-name-'+e.target.id+'" style="width: 40%;"></input>');
			$("#input-parent-location-name-"+e.target.id).val(str);
			$("input#"+e.target.id+".search-parent-location").toggle();
			$("button#"+e.target.id+".search-association-parent-location-button").toggle();
			$("button#"+e.target.id+".edit-association-info").toggle();
			$("button#"+e.target.id+".update-association-info").toggle();
			$("button#"+e.target.id+".cancel-association-info").toggle();
	    });
		
		//trigger cancel-parent-association-info button
		$("button.cancel-parent-association-info").click(function(e){
			console.log(e.target.id);
			var value=$(e.target).attr('value');
			$("input#association-date-to-"+e.target.id).replaceWith("<p style='margin-left:50px;' id='"+e.target.id+"' class='location-association-valid-to'></p>");
			$("#"+e.target.id+".location-association-valid-to").text((data[value])["Parent Association:Location Association Valid To"]);
			$("input#association-date-from-"+e.target.id).replaceWith("<p style='margin-left:50px;' id='"+e.target.id+"' class='location-association-valid-from'>"+(data[value])["Parent Association:Location Association Valid From"]+"</p>");
			$("input#input-child-location-name-"+e.target.id).replaceWith("<p id='"+e.target.id+"' class='child-location-name'>"+(data[value])["Parent Association:Child Location Name"]+"</p>");
			$("input#"+e.target.id+".search-child-location").toggle();
			$("button#"+e.target.id+".search-association-child-location-button").toggle();
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
			$("input#association-date-to-"+e.target.id).replaceWith("<p style='margin-left:50px;' id='"+e.target.id+"' class='location-association-valid-to'>"+(data[0])["Child Association:Location Association Valid To"]+"</p>");
			$("input#association-date-from-"+e.target.id).replaceWith("<p style='margin-left:50px;' id='"+e.target.id+"' class='location-association-valid-from'>"+(data[0])["Child Association:Location Association Valid From"]+"</p>");
			$("input#input-parent-location-name-"+e.target.id).replaceWith("<p id='"+e.target.id+"' class='parent-location-name'>"+(data[0])["Child Association:Parent Location Name"]+"</p>");
			$("input#"+e.target.id+".search-parent-location").toggle();
			$("button#"+e.target.id+".search-association-parent-location-button").toggle();
			$("a.datepicker-button.input-group-addon.green").remove();
			$(".datepicker-calendar.green").remove();
			if($("#"+e.target.id+".dropdown").is(':visible')){
				$("#"+e.target.id+".dropdown").toggle();
			}
			$("button#"+e.target.id+".edit-association-info").toggle();
			$("button#"+e.target.id+".update-association-info").toggle();
			$("button#"+e.target.id+".cancel-association-info").toggle();
		});
		
		//trigger search-parent-button
		$(".search-association-parent-location-button").click(function(e){
			var data={};
			if($("p#"+e.target.id+".association-type-id").text()==1){
				var query="select * from [location].[Location] where [Location Name] like '%"+$("input#"+e.target.id+".search-parent-location").val()+"%'";
			}else if($("p#"+e.target.id+".association-type-id").text()==2){
				var query="select * from [location].[Location] where [Location Type Id]=2 and [Location Name] like '%"+$("input#"+e.target.id+".search-parent-location").val()+"%'";
			}else if($("p#"+e.target.id+".association-type-id").text()==3){
				var query="select * from [location].[Location] where [Location Type Id]=3 and [Location Name] like '%"+$("input#"+e.target.id+".search-parent-location").val()+"%'";
			}
			data.title="search parent location for association";
			data.message=query;
			$.ajax({
				type:'POST',
				data:JSON.stringify(data),
				contentType:'application/json',
				url:'/executequery',
				success:function(data){
					$("ul#"+e.target.id+".dropdown-menu").empty();
					for(var i=0;i<data.length;i++){
						$("ul#"+e.target.id+".dropdown-menu").append('<li role="presentation"><a class="search-result-item" role="menuitem" tabindex="-1" id="'+e.target.id+'" value="'+(data[i])["Location Id"]+'">'+(data[i])["Location Name"]+'</a></li>');
					}
					if(!$("#"+e.target.id+".dropdown").is(':visible')){
						$("#"+e.target.id+".dropdown").toggle();
					}
					
					$("a.search-result-item").click(function(e){
						str=$(e.target).text();
						$("input#input-parent-location-name-"+e.target.id).val(str);
						$("input#"+e.target.id+".search-child-location-id").val($(e.target).attr("value"));
					});
				}
			});
		});
		
		//trigger search-child-button
		$(".search-association-child-location-button").click(function(e){
			var data={};
			if($("p#"+e.target.id+".association-type-id").text()==1){
				var query="select * from [location].[Location] where [Location Name] like '%"+$("input#"+e.target.id+".search-child-location").val()+"%'";
			}else if($("p#"+e.target.id+".association-type-id").text()==2){
				var query="select * from [location].[Location] where [Location Type Id]=6 and [Location Name] like '%"+$("input#"+e.target.id+".search-child-location").val()+"%'";
			}else if($("p#"+e.target.id+".association-type-id").text()==3){
				var query="select * from [location].[Location] where [Location Type Id]=2 and [Location Name] like '%"+$("input#"+e.target.id+".search-child-location").val()+"%'";
			}
			data.title="search child location for association";
			data.message=query;
			$.ajax({
				type:'POST',
				data:JSON.stringify(data),
				contentType:'application/json',
				url:'/executequery',
				success:function(data){
					console.log(JSON.stringify(data));
					$("ul#"+e.target.id+".dropdown-menu").empty();
					for(var i=0;i<data.length;i++){
						$("ul#"+e.target.id+".dropdown-menu").append('<li role="presentation"><a class="search-result-item" role="menuitem" tabindex="-1" id="'+e.target.id+'" value="'+(data[i])["Location Id"]+'">'+(data[i])["Location Name"]+'</a></li>');
					}
					if(!$("#"+e.target.id+".dropdown").is(':visible')){
						$("#"+e.target.id+".dropdown").toggle();
					}
					
					$("a.search-result-item").click(function(e){
						str=$(e.target).text();
						$("input#input-child-location-name-"+e.target.id).val(str);
						$("input#"+e.target.id+".search-result-location-id").val($(e.target).attr("value"));
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
			data.title="update parent location in association";
			var query="update [location].[Location Association] set [Parent Location Id]="+$("input#"+e.target.id+".search-child-location-id").val()+",[Location Association Valid From]='"+time_from+"',[Location Association Valid To]='"+time_to+"' where [Location Association Id]="+e.target.id;
			data.message=query;
			
			$.ajax({
				type:'POST',
				data:JSON.stringify(data),
				contentType:'application/json',
				url:'/executequery',
				success:function(data){
					console.log(data);
					location.reload();
				}
			});
		});
		
		//trigger update-parent-association-info button
		$("button.update-parent-association-info").click(function(e){
			console.log("click");
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
			var query1="update [location].[Location Association] set [Child Location Id]="+$("input#"+e.target.id+".search-result-location-id").val()+",[Location Association Valid From]='"+time_from+"',[Location Association Valid To]='"+time_to+"' where [Location Association Id]="+e.target.id;
			var query2="update [location].[Location] set [Parent Location Id]="+url+" where [Location Id]="+$("input#"+e.target.id+".search-result-location-id").val();
			var query3="update [location].[Location] set [Parent Location Id]=null where [Location Id]="+$("input#"+e.target.id+".original-child-location-id").val();
			arr.push(query1);
			arr.push(query2);
			arr.push(query3);
			data.message=arr;
			
			$.ajax({
				type:'POST',
				data:JSON.stringify(data),
				contentType:'application/json',
				url:'/executemultiupdatequery',
				success:function(data){
					console.log(data);
					location.reload();
				}
			});
		});
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
        $(".edit-google-map").click(function(e){
		   $(".edit-google-map").toggle();
		   $(".update-google-map").toggle();
		   $(".cancel-google-map").toggle();
		   $("#google-map-input-group").toggle();
	    });
		
		$("button#search-postcode").click(function(e){
			console.log("click");
			var str=$("#input-postcode").val();
			$("#map").empty();
			var map=new google.maps.Map(document.getElementById('map'),{
				zoom: 8,
				center: {lat: -34.397, lng: 150.644}
			});
			var geocoder = new google.maps.Geocoder();
			
			var address=str;
			geocoder.geocode({'address': address}, function(results, status){
				if (status === 'OK') {
					map.setCenter(results[0].geometry.location);
					var marker = new google.maps.Marker({
						map: map,
						position: results[0].geometry.location
					});
				} else {
					alert('Geocode was not successful for the following reason: ' + status);
				}
			});
            geocodeAddress(geocoder, map);
		});
		
		$(".update-google-map").click(function(e){
			var data={};
			data.title="update postcode";
			var query="update [location].[Location] set [Location Postcode]='"+$("#input-postcode").val()+"' where [Location Id]="+url;
			data.message=query;
			$.ajax({
				type:'POST',
				data:JSON.stringify(data),
				contentType:'application/json',
				url:'/executequery',
				success:function(data){
					console.log("success");
					location.reload();
				}
			});
		});
		
		$(".cancel-google-map").click(function(e){
			location.reload();
		});
		
		function initmap(){
			var map=new google.maps.Map(document.getElementById('map'),{
				zoom: 8,
				center: {lat: -34.397, lng: 150.644}
			});
			if((data[0])["Location Postcode"]!==null){
				console.log("here");
				var geocoder = new google.maps.Geocoder();
                geocodeAddress(geocoder, map);
			}
		}
		
		function geocodeAddress(geocoder, resultsMap){
			var address=(data[0])["Location Postcode"];
			geocoder.geocode({'address': address}, function(results, status) {
				if (status === 'OK') {
					resultsMap.setCenter(results[0].geometry.location);
					var marker = new google.maps.Marker({
						map: resultsMap,
						position: results[0].geometry.location
					});
				} else {
					alert('Geocode was not successful for the following reason: ' + status);
				}
			});
		}
		
		$("a.modal-association-type-item").click(function(e){
			$("input#modal-association-type-id").val(e.target.id);
			$("input#association-type-name").val($(e.target).text());
	    });	
	}
});
