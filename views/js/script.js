$(document).ready(function () {

    $('.loginProfile').hide();

    $('.submitButton').click(function (e) { 
        e.preventDefault();
        if(($('.inputName').val().trim() != '')
        && ($('.inputPassword').val() != '')    ){
            var sendInfo= {
                username: $('.inputName').val(), 
                password: $('.inputPassword').val()
            };
            console.log(JSON.stringify(sendInfo));
            $('.inputName').val("");
            $('.inputPassword').val("");
            //ajax request here to server
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/users",
                data: JSON.stringify(sendInfo),
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    $('.errorText').text("Account successfully created! Please log in.");
                    $('.errorText').css("color", "green");
                },
                error: function (response){
                    $('.errorText').text("Error creating account. Username already exists");
                    $('.errorText').css("color", "red");
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
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/users/login",
            dataType: "application/json",
            data: JSON.stringify({username: $('.enterName').val() , password: $('.inputPassword').val()}),
            success: function (response) {
                console.log(response);
            },
            error: (error) => {
                console.log(error)
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
