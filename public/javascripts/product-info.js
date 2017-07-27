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
		console.log("success");
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
		
		//triger edit button
		$(".btn.btn-primary.pull-right.edit-general-info").click(function(e){
			var str=$("#Product-Code").text();
		    $("#Product-Code").replaceWith('<input id="input-Product-Code"></input>');
		    $("#input-Product-Code").val(str);
			
			str=$("#Product-External-Code").text();
			$("#Product-External-Code").replaceWith('<input id="input-Product-External-Code"></input>');
		    $("#input-Product-External-Code").val(str);
			
			str=$("#Product-External-Id").text();
			$("#Product-External-Id").replaceWith('<input id="input-Product-External-Id"></input>');
		    $("#input-Product-External-Id").val(str);
			
			str=$("#Parent-Product-Id").text();
			$("#Parent-Product-Id").replaceWith('<input id="input-Parent-Product-Id" style="width: 30%"></input>');
		    $("#input-Parent-Product-Id").val(str);
			
			str=$("#Product-Label").text();
			$("#Product-Label").replaceWith('<input id="input-Product-Label" style="width: 30%"></input>');
		    $("#input-Product-Label").val(str);
			
			str=$("#Product-Notes").text();
			$("#Product-Notes").replaceWith('<input id="input-Product-Notes" style="width: 30%"></input>');
		    $("#input-Product-Notes").val(str);
			
			/*
			str=$("#Product-Valid-To").text();
			$("#Product-Valid-To").replaceWith('<input id="input-Product-Valid-To" style="width: 30%"></input>');
		    $("#input-Product-Valid-To").val(str);
			
			str=$("#Product-Valid-From").text();
			$("#Product-Valid-From").replaceWith('<input id="input-Product-Valid-From" style="width: 30%"></input>');
		    $("#input-Product-Valid-From").val(str);
			*/
			
			str=$("#Product-Valid-To").text();
			$("#Product-Valid-To").replaceWith('<input type="text" id="dt" placeholder="date picker"><div id="dd"></div>');
			
			str=$("#Product-Turn-Around-Time-Days").text();
			$("#Product-Turn-Around-Time-Days").replaceWith('<input id="input-Product-Turn-Around-Time-Days" style="width: 30%"></input>');
		    $("#input-Product-Turn-Around-Time-Days").val(str);
			
			$("#input-field-view-button").toggle();
			$(".btn.btn-primary.edit-general-info").toggle();
			$(".btn.btn-secondary.update-general-info").toggle();
			$(".btn.btn-danger.cancel-general-info").toggle();
		});
		
		//triger view button
		$("#view-tree-menu").click(function(e){
			console.log("click");
			window.location.replace("http://localhost:3000/load-tree-menu");
			$("#span-tree").toggle();
		});
		
		//click on tree view
        $("span.jqtree-title.jqtree_common").click(function(e){
			console.log("click");
			var name=$(e.target).text();
			console.log(name);
		});		
		
		//triger update button
		$(".btn.btn-secondary.pull-right.update-general-info").click(function(e){
			var update=[];
			var data={};
			data.title="Product Id";
			data.message=url;
			update.push(data);
			var data={};
			var str=$("#input-Product-Code").val();
			data.title="Product Code";
			data.message=str;
			update.push(data);
			$.ajax({
	            type: 'POST',
	            data: JSON.stringify(update),
	            contentType: 'application/json',
	            url: 'http://localhost:3000/update-general-info',
	            success: function(data){
					console.log(data);
				}
			});
		});
		
		//triger cancel button
		$(".cancel-general-info").click(function(e){
			var str=$("#input-Product-Code").val();
			$("#input-Product-Code").replaceWith('<p id="Product-Code" class="info-field"></p>');
			$("#Product-Code").text(str);
			
			str=$("#input-Product-External-Code").val();
			$("#input-Product-External-Code").replaceWith('<p id="Product-External-Code" class="info-field"></p>');
			$("#Product-External-Code").text(str);
			
			str=$("#input-Product-External-Id").val();
			$("#input-Product-External-Id").replaceWith('<p id="Product-External-Id" class="info-field"></p>');
			$("#Product-External-Id").text(str);
			
			str=$("#input-Parent-Product-Id").val();
			$("#input-Parent-Product-Id").replaceWith('<p id="Parent-Product-Id" class="info-field"></p>');
			$("#Parent-Product-Id").text(str);
			
			$("#input-field-view-button").toggle();
			$(".update-general-info").toggle();
			$(".edit-general-info").toggle();
			$(".cancel-general-info").toggle();
		});
		
		$('#dd').calendar({
           trigger: '#dt',
		   width: 280,
           height: 280,
           // z-inde property
           zIndex: 1,
           // offset
           offset: [0, 1],
           // custom CSS class
           customClass: '',
           // date or month
           view: 'date',
           // current date 
           date: new Date(),
           // date format
           format: 'yyyy/mm/dd',
           // start of week
           startWeek: 0,
           // day of the week
           weekArray: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
           // month
           monthArray: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
           selectedRang: null,
           data: null,
           label: '{d}\n{v}',
           prev: '&lt;',
           next: '&gt;',
           viewChange: $.noop,
           onSelected: function(view, date, value) {},
           onMouseenter: $.noop,
           onClose: $.noop
        });
		
		
	}
});
