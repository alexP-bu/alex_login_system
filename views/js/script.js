$(document).ready(function () {

    $('.loginProfile').hide();

    $('.submitButton').click(function (e) { 
        e.preventDefault();
        if(($('.inputName').val().trim() != '')
        && ($('.inputPassword').val() != '')    ){
            var sendInfo = {
                username: $('.inputName').val(), 
                password: $('.inputPassword').val()
            };
            //ajax request to server
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/users",
                data: JSON.stringify(sendInfo),
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    $('.errorText').text("Account successfully created! Please log in.");
                    $('.errorText').css("color", "green");
                    $('.inputName').val("");
                    $('.inputPassword').val("");
                },
                error: function (response){
                    if(response.status == 400){
                        $('.errorText').text("Username already exists.");
                        $('.errorText').css("color", "red");
                    }else{
                        $('.errorText').text("Error creating account.");
                        $('.errorText').css("color", "red");
                    }
                }
            });
        }else{
            $('.errorText').text("Please enter all fields!");
            $('.errorText').css("color", "red");
        }
    });

    $('.loginTextClick').click(function (e) { 
        e.preventDefault();
        $('.inputName').val("");
        $('.inputPassword').val("");
        $('.newProfile').hide();
        $('.loginProfile').show();
    });

    $('.createTextClick').click(function (e) { 
        e.preventDefault();
        $('.invalidLoginText').text("");
        $('.loginProfile').hide();
        $('.newProfile').show();
        $('.inputName').val("");
        $('.inputPassword').val("");
    });
    
    $('.submitLoginButton').click(function (e) { 
        e.preventDefault();
        var sendInfo = {
            username: $('.enterName').val(),
            password: $('#inputPassword').val()
        };
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/users/login",
            data: {
                "username": sendInfo.username,
                "password": sendInfo.password
            },
            success: function (response) {
                console.log(response);
            },
            error: (error) => {
                if(error.status == 404){
                    $('.invalidLoginText').text('Username doesn\'t exist!');
                    $('.invalidLoginText').css('color', 'red');
                }else if(error.status = 400){
                    $('.invalidLoginText').text('Invalid password!');
                    $('.invalidLoginText').css('color', 'red');
                }
            }
        });
    });
    

    /* TODO DATABASE INTEGRATION
    $('.logoutTextClick').click(function (e) { 
        e.preventDefault();
        unsetProfileText();
        $('.profile').hide();
        $('.loginProfile').hide();
        $('.newProfile').show();
    });

    function setProfileText(account){
        $('.profileName').text(account.getName());
        $('.profileGender').text(account.getGender());
        $('.profilePassword').text(account.getPassword());
        $('.profileHydrated').text(account.getHydrated());
        $('.profileBreathing').text(account.getBreathing());
        $('.profileBooty').text(account.getBooty());
    }

    function unsetProfileText(){
        $('.profileName').text("");
        $('.profileGender').text("");
        $('.profilePassword').text("");
        $('.profileHydrated').text("");
        $('.profileBreathing').text("");
        $('.profileBooty').text("");
    }
    */
});
