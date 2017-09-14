$(document).ready(function(e){
	$('.message a').click(function(){
	   $("#login").toggle();
       $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
	   $("#create").toggle();
    });

	$("#create").click(function(e){
		var upperCase= new RegExp('[A-Z]');
        var lowerCase= new RegExp('[a-z]');
        var numbers = new RegExp('[0-9]');
		var data={};
		var user=$("input#res-user").val();
		var pass=$("input#res-pass").val();
		var repass=$("input#res-repass").val();
		if((user=="")||(pass=="")||(repass=="")){
			$(".inform").empty();
			$(".inform").append("Some fields need to be filled");
		}else{
			if(!($("input#res-pass").val().match(upperCase) && $("input#res-pass").val().match(lowerCase) && $("input#res-pass").val().match(numbers))){
			   console.log("failed");
			   $(".inform").empty();
			   $(".inform").append("Password should inlude at least on uppercase, lowercase, and number");
		    }else{
				if(pass!=repass){
				   $(".inform").empty();
			       $(".inform").append("Two passwords are not identical");
			    }else{
					var data={};
				    data.title=user;
				    data.message="insert into dbo.Admin (Username,Password) values ('"+user+"','"+pass+"')";
				    $.ajax({
					   type: 'POST',
					   data: JSON.stringify(data),
					   contentType: 'application/json',
					   url: '/res',
					   success: function(data){
						   console.log(data);
						   if(data=="success"){
							   location.reload();
						   }else{
							   $(".inform").empty();
			                   $(".inform").append("The username is already registered");
						   }
						  //location.reload();
					    }
				    });
				}
			}
		}
		/*
		if((user=="")||(pass=="")||(repass=="")){
			$(".inform").empty();
			$(".inform").append("Some fields need to be filled");
		}else{
			if(!($("input#res-pass").val().match(upperCase) && $("input#res-pass").val().match(lowerCase) && $("input#res-pass").val().match(numbers))){
			   console.log("failed");
			   $(".inform").empty();
			   $(".inform").append("Password should inlude at least on uppercase, lowercase, and number");
		    }else{
				if(pass!=repass){
				   $(".inform").empty();
			       $(".inform").append("Two passwords are not identical");
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
		}
		*/
	});
	
	$("#login").click(function(e){
		var data={};
		data.username=$("input#login-user").val();
		data.pass=$("input#login-pass").val();
		//console.log(data);
		
		$.ajax({
			type: 'POST',
			data: JSON.stringify(data),
			contentType: 'application/json',
			url: '/log',
			success: function(result){
				console.log(result);
				if(result=="success"){
					location.href='/home';
				}else{
					alert("Wrong username or password");
				}
			}
		});
	});
});