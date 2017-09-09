//global variables using for pass search parent product result
var name="foo";
var id=0;
//////////////////////////////////////////////////////////////
var temp=null;
var tempdata=null;
var temptotalpage=0;
var templeft=0;
var url=window.location.hash;
url=url.replace("#material-id:","");
console.log("asdfasdf:  "+url);
var data={};
data.title="material id";
data.message=url;
function removetime(date){
	var d=date.split("T");
	return d[0];
}
$.ajax({
	type: 'POST',
	data: JSON.stringify(data),
	contentType: 'application/json',
	url: '/materialinfoid',
	success: function(data){
		tempdata=data;
		var materialtypeid=(data[0])["Material Type Id"];
		$("input#modal-material-type-id").val((data[0])["Material Type Id"]);
		//load association modal
		if(materialtypeid==3){
			$("ul#modal-association-dropdown").append("<li id='1'><a id='1' value='Function Hierarchy' class='modal-association-type-item'>Function Hierarchy</a></li><li id='2'><a id='2' class='modal-association-type-item' value='Function Class to Function Group'>Function Class to Function Group</a></li>");
		}else if(materialtypeid==4){
			$("ul#modal-association-dropdown").append("<li id='1'><a id='1' value='Function Hierarchy' class='modal-association-type-item'>Function Hierarchy</a></li><li id='3'><a id='3' class='modal-association-type-item' value='Function Group to Function'>Function Group to Function</a></li>");
		}else if(materialtypeid==5){
			$("ul#modal-association-dropdown").append("<li id='1'><a id='1' value='Function Hierarchy' class='modal-association-type-item'>Function Hierarchy</a></li><li id='4'><a id='4' class='modal-association-type-item' value='Function to Category'>Function to Category</a></li>");
		}else if(materialtypeid==6){
			$("ul#modal-association-dropdown").append("<li id='1'><a id='1' value='Function Hierarchy' class='modal-association-type-item'>Function Hierarchy</a></li><li id='5'><a id='5' class='modal-association-type-item' value='Category to Catalogue Item'>Category to Catalogue Item</a></li>");
		}else{
			$("ul#modal-association-dropdown").append("<li id='1'><a id='1' value='Function Hierarchy' class='modal-association-type-item'>Function Hierarchy</a></li>");
		}

		//load general-info
		if((data[0])["Material Description"]==null){
			(data[0])["Material Description"]="No Record";
		}
		if((data[0])["Material External Code"]==null){
			(data[0])["Material External Code"]="No Record";
		}
		if((data[0])["Material External Id"]==null){
			(data[0])["Material External Id"]="No Record";
		}
		if((data[0])["Material Label"]==null){
			(data[0])["Material Label"]="No Record";
		}
		if((data[0])["Material Notes"]==null){
			(data[0])["Material Notes"]="No Record";
		}
		if((data[0])["Record Termination Datetime"]==null||(data[0])["Record Termination Datetime"]=="null"){
			$("#Record-Termination-Datetime").append("No Record");
		}
		if((data[0])["Record Copy Creation Datetime"]==null||(data[0])["Record Copy Creation Datetime"]=="null"){
			$("#Record-Copy-Creation-Datetime").append("No Record");
		}
		if((data[0])["Record Creation Datetime"]==null||(data[0])["Record Creation Datetime"]=="null"){
			$("#Record-Creation-Datetime").append("No Record");
		}
		if((data[0])["Parent Material Name"]==null){
			(data[0])["Parent Material Name"]="No Record";
		}
		
		$("#Material-Name").append((data[0])["Material Name"]);
		$("#Material-Description").append((data[0])["Material Description"]);
		$("#Material-Code").append((data[0])["Material Code"]);
		$("#Material-External-Code").append((data[0])["Material External Code"]);
		$("#Material-External-Id").append((data[0])["Material External Id"]);
		$("#Parent-Material-Name").append((data[0])["Parent Material Name"]);
		$("#Material-Label").append((data[0])["Material Label"]);
		$("#Material-Notes").append((data[0])["Material Notes"]);
		$("#Material-Type-Name").append((data[0])["Material Type Name"]);
		var time=((data[0])["Material Valid From"]).split('T');
		$("#Material-Valid-From").append(time[0]);
		time=((data[0])["Material Valid To"]).split('T');
		$("#Material-Valid-To").append(time[0]);
		//$("#Record-Creation-Datetime").append(((data[0])["Record Creation Datetime"])[0]);
		//$("#Record-Termination-Datetime").append((data[0])["Record Termination Datetime"]);
		//$("#Record-Copy-Creation-Datetime").append((data[0])["Record Copy Creation Datetime"]);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
		//load material association
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
		$("#child-association").append("<div class='panel panel-default text-center'><div class='panel-heading'><h1>Association</h1></div><div class='panel-body'><input id='"+(data[0])["Child Association:Association Id"]+"' class='original-parent-material-id' style='display:none;'></input><input id='"+(data[0])["Child Association:Association Id"]+"' class='search-child-material-id' style='display:none;'></input><p id='"+(data[0])["Child Association:Association Id"]+"' class='association-type-id' style='display:none;'>"+(data[0])["Child Association:Association Type Id"]+"</p><label><strong>Association Type Name</strong></label><p id='"+(data[0])["Child Association:Association Id"]+"' class='association-id'>"+(data[0])["Child Association:Association Type Name"]+"</p><label><strong>Parent Material</strong></label><div id='Parent-Material-Name-"+(data[0])["Child Association:Association Id"]+"'><a value='"+(data[0])["Child Association:Parent Material Id"]+"' id='"+(data[0])["Child Association:Association Id"]+"' class='parent-material-name'>"+(data[0])["Child Association:Parent Material Name"]+"</a><!-- --><input id='"+(data[0])["Child Association:Association Id"]+"' class='search-parent-material' style='width:110px; display:none;' placeholder='Search term...'></input><!-- --><button id='"+(data[0])["Child Association:Association Id"]+"' class='btn btn-default search-association-parent-material-button' style='min-width:35px; display:none;'><span id='"+(data[0])["Child Association:Association Id"]+"' class='glyphicon glyphicon-search'></span></button><div id='"+(data[0])["Child Association:Association Id"]+"' class='dropdown association' style='display:none;'><button id='menu2' class='btn btn-default dropdown-toggle' data-toggle='dropdown'>results<span class='caret'></span></button><ul id='"+(data[0])["Child Association:Association Id"]+"' class='dropdown-menu' style='height:200px; overflow-y:scroll; width:240px;' role='menu' aria-labelledby='menu2'></ul></div></div><label><strong>Child Material</strong></label><p id='"+(data[0])["Child Association:Association Id"]+"'>"+(data[0])["Child Association:Child Material Name"]+"</p><label for='association-date-from-"+(data[0])["Child Association:Association Id"]+"'><strong>Association Valid From</strong></label><p id='"+(data[0])["Child Association:Association Id"]+"' class='material-association-valid-from'>"+removetime((data[0])["Child Association:Material Association Valid From"])+"</p><label for='association-date-to-"+(data[0])["Child Association:Association Id"]+"'><strong>Association Valid To</strong></label><p id='"+(data[0])["Child Association:Association Id"]+"' class='material-association-valid-to'>"+removetime((data[0])["Child Association:Material Association Valid To"])+"</p></div><div class='panel-footer'><button id='"+(data[0])["Child Association:Association Id"]+"' class='btn btn-lg edit-association-info'>Edit</button><!-- --><button style='display:none;' id='"+(data[0])["Child Association:Association Id"]+"' class='btn btn-lg cancel-association-info'>Cancel</button><!-- --><button style='display:none;' id='"+(data[0])["Child Association:Association Id"]+"' class='btn btn-lg update-association-info'>Update</button></div></div>");
		$("input#"+(data[0])["Child Association:Association Id"]+".search-child-material-id").val((data[0])["Child Association:Parent Material Id"]);
	    $("input#"+(data[0])["Child Association:Association Id"]+".original-parent-material-id").val((data[0])["Child Association:Parent Material Id"]);
		}
		
		if((data[0])["Parent Association:Association Id"]!=null){
		for(var i=0;i<length;i++){
			$("#association-list").append("<div class='col-sm-4'><div class='panel panel-default text-center'><div class='panel-heading'><h1>Association</h1></div><div class='panel-body'><input id='"+(data[i])["Parent Association:Association Id"]+"' class='original-child-material-id' style='display:none;'></input><input id='"+(data[i])["Parent Association:Association Id"]+"' class='search-result-material-id' style='display:none;'></input><p id='"+(data[i])["Parent Association:Association Id"]+"' class='association-type-id' style='display:none;'>"+(data[i])["Parent Association:Association Type Id"]+"</p><label><strong>Association Type Name</strong></label><p id='"+(data[i])["Parent Association:Association Id"]+"' class='association-id'>"+(data[i])["Parent Association:Association Type Name"]+"</p><label><strong>Parent Material</strong></label><p id='"+(data[i])["Parent Association:Association Id"]+"' class='parent-material-name'>"+(data[i])["Parent Association:Parent Material Name"]+"</p><label><strong>Child Material</strong></label><div id='Child-Material-Name-"+(data[i])["Parent Association:Association Id"]+"'><a value='"+(data[i])["Parent Association:Child Material Id"]+"' id='"+(data[i])["Parent Association:Association Id"]+"' class='child-material-name'>"+(data[i])["Parent Association:Child Material Name"]+"</a><!-- --><input id='"+(data[i])["Parent Association:Association Id"]+"' class='search-child-material' style='width:110px; display:none;' placeholder='Search term...'></input><!-- --><button id='"+(data[i])["Parent Association:Association Id"]+"' class='btn btn-default search-association-child-material-button' style='min-width:35px; display:none;'><span id='"+(data[i])["Parent Association:Association Id"]+"' class='glyphicon glyphicon-search'></span></button><div id='"+(data[i])["Parent Association:Association Id"]+"' class='dropdown association' style='display:none;'><button id='menu1' class='btn btn-default dropdown-toggle' data-toggle='dropdown'>results<span class='caret'></span></button><ul id='"+(data[i])["Parent Association:Association Id"]+"' class='dropdown-menu' style='height: 200px; overflow-y:scroll; width: 240px;' role='menu' aria-labelledby='menu1'></ul></div></div><label for='association-date-from-"+(data[i])["Parent Association:Association Id"]+"'><strong>Association Valid From</strong></label><p id='"+(data[i])["Parent Association:Association Id"]+"' class='material-association-valid-from'>"+removetime((data[i])["Parent Association:Material Association Valid From"])+"</p><label for='association-date-to-"+(data[i])["Parent Association:Association Id"]+"'><strong>Association Valid To</strong></label><p id='"+(data[i])["Parent Association:Association Id"]+"' class='material-association-valid-to'>"+removetime((data[0])["Parent Association:Material Association Valid To"])+"</p></div><div class='panel-footer'><button id='"+(data[i])["Parent Association:Association Id"]+"' class='btn btn-lg edit-parent-association-info'>Edit</button><!-- --><button style='display:none;' id='"+(data[i])["Parent Association:Association Id"]+"' value="+i+" class='btn btn-lg cancel-parent-association-info'>Cancel</button><!-- --><button style='display:none;' id='"+(data[i])["Parent Association:Association Id"]+"' class='btn btn-lg update-parent-association-info'>Update</button></div></div></div>");
		    $("input#"+(data[i])["Parent Association:Association Id"]+".search-result-material-id").val((data[i])["Parent Association:Child Material Id"]);
			$("input#"+(data[i])["Parent Association:Association Id"]+".original-child-material-id").val((data[i])["Parent Association:Child Material Id"]);
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
			id=(data[0])["Parent Material Id"];
			var str=$("#Material-Code").text();
		    $("#Material-Code").replaceWith('<div><input id="input-Material-Code" style="width: 80%;"></input></div>');
		    $("#input-Material-Code").val(str);
			
			str=$("#Material-Name").text();
			$("#Material-Name").replaceWith('<div><input id="input-Material-Name" style="width: 80%;"></input></div>');
			$("#input-Material-Name").val(str);
			
			str=$("#Material-Description").text();
			$("#Material-Description").replaceWith('<div><textarea id="input-Material-Description" rows="10" cols="31"></textarea></div>');
            $("#input-Material-Description").text(str);
			
			str=$("#Material-External-Code").text();
			$("#Material-External-Code").replaceWith('<div><input id="input-Material-External-Code" style="width: 80%;"></input></div>');
		    $("#input-Material-External-Code").val(str);
			
			str=$("#Material-External-Id").text();
			$("#Material-External-Id").replaceWith('<div><input id="input-Material-External-Id" style="width: 80%;"></input></div>');
		    $("#input-Material-External-Id").val(str);
			
			str=$("#Parent-Material-Name").text();
			$("#Parent-Material-Name").replaceWith('<input id="input-Parent-Material-Name" style="width: 64%"></input>');
		    $("#input-Parent-Material-Name").val(str);
			
			str=$("#Material-Label").text();
			$("#Material-Label").replaceWith('<div><input id="input-Material-Label" style="width: 30%"></input></div>');
		    $("#input-Material-Label").val(str);
			
			str=$("#Material-Notes").text();
			$("#Material-Notes").replaceWith('<div><input id="input-Material-Notes" style="width: 30%"></input></div>');
		    $("#input-Material-Notes").val(str);
			
		    str=$("#Material-Valid-From").text();
			$("#Material-Valid-From").replaceWith('<input class="form-control" id="date-from" type="text" placeholder="" title="format : "/><div id="date-from-inline"></div>');
			$('#date-from').datepicker({theme:'green'});			
			$("#date-from").val(str);
			
			str=$("#Material-Valid-To").text();
			$("#Material-Valid-To").replaceWith('<input class="form-control" id="date-to" type="text" placeholder="" title="format : "/><div id="date-to-inline"></div>');
			$('#date-to').datepicker({theme:'green'});			
			$("#date-to").val(str);
			
            $(".cancel-general-info").toggle();
			$(".update-general-info").toggle();
			$(".edit-general-info").toggle();
			$("#view-tree-menu").toggle();
			$("#search-parent-material-form").toggle();
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
			
				var query="UPDATE [material].[Material] SET [Parent Material Id]="+id+",[Material Name]='"+$("#input-Material-Name").val()+"',[Material Description]='"+$("#input-Material-Description").val()+"',[Material Code]='"+$("#input-Material-Code").val()+"',[Material External Code]='"+$("#input-Material-External-Code").val()+"',[Material External Id]='"+$("#input-Material-External-Id").val()+"',[Material Label]='"+$("#input-Material-Label").val()+"',[Material Notes]='"+$("#input-Material-Notes").val()+"',[Material Valid From]='"+time_from+"',[Material Valid To]='"+time_to+"' WHERE [Material Id]="+url;
			    console.log(query);
				var postdata={};
				if((id!=0)&&(id!=(data[0])["Parent Material Id"])){
					postdata.title1=id;
					postdata.title2=url;
					postdata.message=query;
					$.ajax({
						type:'POST',
						data:JSON.stringify(postdata),
						contentType:'application/json',
						url:'/update-general-info-updatematerialass',
						success:function(data){
							console.log("data");
							location.reload();
						}
					});
				}else{
					postdata.title="update query";
			        postdata.message=query;
			        $.ajax({
				       type:'POST',
				       data:JSON.stringify(postdata),
				       contentType:'application/json',
				       url:'/executequery',
				       success:function(data){
					      console.log(data);
					      location.reload();
				        }
			        });
				}
		});
		
		//triger cancel button
		$("button.cancel-general-info").click(function(e){
			location.reload();
		});
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
        //trigger edit-parent-association-info button
		$("button.edit-parent-association-info").click(function(e){
			console.log("click");
			var str=$("#"+e.target.id+".material-association-valid-from").text();
			$("#"+e.target.id+".material-association-valid-from").replaceWith('<input style="width:100%;" class="form-control" id="association-date-from-'+e.target.id+'" type="text" placeholder="" title="format : "/><div id="association-date-from-'+e.target.id+'"></div>');
			$("#association-date-from-"+e.target.id).datepicker({theme:'green'});
			$("#association-date-from-"+e.target.id).val(str);
			
			str=$("#"+e.target.id+".material-association-valid-to").text();
			$("#"+e.target.id+".material-association-valid-to").replaceWith('<input style="width:100%;" class="form-control" id="association-date-to-'+e.target.id+'" type="text" placeholder="" title="format : "/><div id="association-date-to-'+e.target.id+'"></div>');
			$("#association-date-to-"+e.target.id).datepicker({theme:'green'});
			$("#association-date-to-"+e.target.id).val(str);
			
			str=$("#"+e.target.id+".child-material-name").text();
			$("#"+e.target.id+".child-material-name").replaceWith('<input id="input-child-material-name-'+e.target.id+'" style="width: 40%;"></input>');
			$("#input-child-material-name-"+e.target.id).val(str);
			$("input#"+e.target.id+".search-child-material").toggle();
			$("button#"+e.target.id+".search-association-child-material-button").toggle();
			$("button#"+e.target.id+".edit-parent-association-info").toggle();
			$("button#"+e.target.id+".update-parent-association-info").toggle();
			$("button#"+e.target.id+".cancel-parent-association-info").toggle();
	    });
		
		//trigger edit association-info button
		$("button.edit-association-info").click(function(e){
			var str=$("#"+e.target.id+".material-association-valid-from").text();
			$("#"+e.target.id+".material-association-valid-from").replaceWith('<input style="width:100%;" class="form-control" id="association-date-from-'+e.target.id+'" type="text" placeholder="" title="format : "/><div id="association-date-from-'+e.target.id+'"></div>');
			$("#association-date-from-"+e.target.id).datepicker({theme:'green'});
			$("#association-date-from-"+e.target.id).val(str);
			
			str=$("#"+e.target.id+".material-association-valid-to").text();
			$("#"+e.target.id+".material-association-valid-to").replaceWith('<input style="width:100%;" class="form-control" id="association-date-to-'+e.target.id+'" type="text" placeholder="" title="format : "/><div id="association-date-to-'+e.target.id+'"></div>');
			$("#association-date-to-"+e.target.id).datepicker({theme:'green'});
			$("#association-date-to-"+e.target.id).val(str);
			
			str=$("#"+e.target.id+".parent-material-name").text();
			$("#"+e.target.id+".parent-material-name").replaceWith('<input id="input-parent-material-name-'+e.target.id+'" style="width: 40%;"></input>');
			$("#input-parent-material-name-"+e.target.id).val(str);
			$("input#"+e.target.id+".search-parent-material").toggle();
			$("button#"+e.target.id+".search-association-parent-material-button").toggle();
			$("button#"+e.target.id+".edit-association-info").toggle();
			$("button#"+e.target.id+".update-association-info").toggle();
			$("button#"+e.target.id+".cancel-association-info").toggle();
	    });
		
		//trigger cancel-parent-association-info button
		$("button.cancel-parent-association-info").click(function(e){
			location.reload();
		});
		
		$("button.cancel-association-info").click(function(e){
			location.reload();
		});
		
		//trigger search-parent-button
		$(".search-association-parent-material-button").click(function(e){
			var data={};
			if($("p#"+e.target.id+".association-type-id").text()==1){
				var query="select * from [material].[Material] where [Material Name] like '%"+$("input#"+e.target.id+".search-parent-material").val()+"%'";
			}else if($("p#"+e.target.id+".association-type-id").text()==2){
				var query="select * from [material].[Material] where [Material Type Id]=2 and [Material Name] like '%"+$("input#"+e.target.id+".search-parent-material").val()+"%'";
			}else if($("p#"+e.target.id+".association-type-id").text()==3){
				var query="select * from [material].[Material] where [Material Type Id]=3 and [Material Name] like '%"+$("input#"+e.target.id+".search-parent-material").val()+"%'";
			}
			data.title="search parent material for association";
			data.message=query;
			$.ajax({
				type:'POST',
				data:JSON.stringify(data),
				contentType:'application/json',
				url:'/executequery',
				success:function(data){
					$("ul#"+e.target.id+".dropdown-menu").empty();
					for(var i=0;i<data.length;i++){
						$("ul#"+e.target.id+".dropdown-menu").append('<li role="presentation"><a class="search-result-item" role="menuitem" tabindex="-1" id="'+e.target.id+'" value="'+(data[i])["Material Id"]+'">'+(data[i])["Material Name"]+'</a></li>');
					}
					if(!$("#"+e.target.id+".dropdown").is(':visible')){
						$("#"+e.target.id+".dropdown").toggle();
					}
					
					$("a.search-result-item").click(function(e){
						str=$(e.target).text();
						$("input#input-parent-material-name-"+e.target.id).val(str);
						$("input#"+e.target.id+".search-child-material-id").val($(e.target).attr("value"));
					});
				}
			});
		});
		
		//trigger search-child-button
		$(".search-association-child-material-button").click(function(e){
			var data={};
			if($("p#"+e.target.id+".association-type-id").text()==1){
				var query="select * from [material].[Material] where [Material Name] like '%"+$("input#"+e.target.id+".search-child-material").val()+"%'";
			}else if($("p#"+e.target.id+".association-type-id").text()==2){
				var query="select * from [material].[Material] where [Material Type Id]=6 and [Material Name] like '%"+$("input#"+e.target.id+".search-child-material").val()+"%'";
			}else if($("p#"+e.target.id+".association-type-id").text()==3){
				var query="select * from [material].[Material] where [Material Type Id]=2 and [Material Name] like '%"+$("input#"+e.target.id+".search-child-material").val()+"%'";
			}
			data.title="search child material for association";
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
						$("ul#"+e.target.id+".dropdown-menu").append('<li role="presentation"><a class="search-result-item" role="menuitem" tabindex="-1" id="'+e.target.id+'" value="'+(data[i])["Material Id"]+'">'+(data[i])["Material Name"]+'</a></li>');
					}
					if(!$("#"+e.target.id+".dropdown").is(':visible')){
						$("#"+e.target.id+".dropdown").toggle();
					}
					
					$("a.search-result-item").click(function(e){
						str=$(e.target).text();
						$("input#input-child-material-name-"+e.target.id).val(str);
						$("input#"+e.target.id+".search-result-material-id").val($(e.target).attr("value"));
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
			data.title="update parent material in association";
			var query="update [material].[Material Association] set [Parent Material Id]="+$("input#"+e.target.id+".search-child-material-id").val()+",[Material Association Valid From]='"+time_from+"',[Material Association Valid To]='"+time_to+"' where [Material Association Id]="+e.target.id;
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
			var query1="update [material].[Material Association] set [Child Material Id]="+$("input#"+e.target.id+".search-result-material-id").val()+",[Material Association Valid From]='"+time_from+"',[Material Association Valid To]='"+time_to+"' where [Material Association Id]="+e.target.id;
			var query2="update [material].[Material] set [Parent Material Id]="+url+" where [Material Id]="+$("input#"+e.target.id+".search-result-material-id").val();
			var query3="update [material].[Material] set [Parent Material Id]=null where [Material Id]="+$("input#"+e.target.id+".original-child-material-id").val();
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
		$("a.modal-association-type-item").click(function(e){
			$("input#modal-association-type-id").val(e.target.id);
			$("input#association-type-name").val($(e.target).text());
	    });	
		
		$("a.child-material-name").click(function(e){
			window.location.href ="/material-info#material-id:"+$(e.target).attr('value');
			location.reload();
		});
		
		$("a.parent-material-name").click(function(e){
			window.location.href ="/material-info#material-id:"+$(e.target).attr('value');
			location.reload();
		});
	}
});
