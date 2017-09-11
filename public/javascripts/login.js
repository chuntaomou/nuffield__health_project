$(document).ready(function(e){
	$('.message a').click(function(){
       $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    });
/*	
	$("#login").click(function(e){
		var data={};
		data.username=$("input#login-user").val();
		data.password=$("input#login-pass").val();
		console.log(data);
		
		$.ajax({
			type: 'POST',
			data: JSON.stringify(data),
			contentType: 'application/json',
			url: '/log',
			success: function(data){
				console.log(data);
				
				if(data=="success"){
					console.log("asdf");
					location.href = '/';
				}else{
					alert("Sorry, wrong username or password");
				}
				
			}
		});
	});
*/	
	$("#create").click(function(e){
		var data={};
		var user=$("input#res-user").val();
		var pass=$("input#res-pass").val();
		var repass=$("input#res-repass").val();
		if((user=="")||(pass=="")||(repass=="")){
			alert("Some fields need to be filled")
		}else{
			if(pass!=repass){
				alert("Two passwords are not identical");
			}else{
				var data={};
				data.title="register user";
				data.message="insert into dbo.Admin (Username,Password) values ('"+user+"','"+pass+"')";
				$.ajax({
					type: 'POST',
					data: JSON.stringify(data),
					contentType: 'application/json',
					url: '/executequery',
					success: function(data){
						location.reload();
					}
				});
			}
		}
	});
	
	$("#login").click(function(e){
		var data={};
		data.username=$("input#login-user").val();
		data.password=$("input#login-pass").val();
		console.log(data);
		
		$.ajax({
			type: 'POST',
			data: JSON.stringify(data),
			contentType: 'application/json',
			url: '/log',
			success: function(data){
				console.log(data);
				location.href='/home';
			}
		});
	});
});