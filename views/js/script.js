$(document).ready(function () {

    $('.loginProfile').hide();
    $('.profile').hide();

    const accountsMap = new Map();

    $('.submitButton').click(function (e) { 
        e.preventDefault();
        if(($('.inputName').val().trim() != '')
        && ($('.inputHeight').val() != '')    ){
            var account = new Person($('.inputName').val(), $('.inputHeight').val(), $('.gender').find(":selected").text());
            accountsMap.set(account.getName(), account);
            $('.errorText').text("Account Created! Please log in.");
            $('.errorText').css("color", "green");
            $('.inputName').val("");
            $('.inputHeight').val("");
        }else{
            $('.errorText').text("Please enter all fields!");
            $('.errorText').css("color", "red");
        }
    });

    $('.loginTextClick').click(function (e) { 
        e.preventDefault();
        $('.errorText').text("");
        $('.newProfile').hide();
        $('.loginProfile').show();
        $('.enterName').val("");
    });

    $('.createTextClick').click(function (e) { 
        e.preventDefault();
        $('.invalidLoginText').text("");
        $('.loginProfile').hide();
        $('.newProfile').show();
        $('.inputName').val("");
        $('.inputHeight').val("");
    });

    $('.submitLoginButton').click(function (e) { 
        e.preventDefault();
        if(accountsMap.has($('.enterName').val())){
            let retrievedAccount = accountsMap.get($('.enterName').val());
            $('.newProfile').hide();
            $('.loginProfile').hide();
            setProfileText(retrievedAccount);
            $('.profile').show();
        }else{
            $('.invalidLoginText').text("No profile found with this name!");
            $('.invalidLoginText').css("color", "red");
        }
    });

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
        $('.profileHeight').text(account.getHeight());
        $('.profileHydrated').text(account.getHydrated());
        $('.profileBreathing').text(account.getBreathing());
        $('.profileBooty').text(account.getBooty());
    }

    function unsetProfileText(){
        $('.profileName').text("");
        $('.profileGender').text("");
        $('.profileHeight').text("");
        $('.profileHydrated').text("");
        $('.profileBreathing').text("");
        $('.profileBooty').text("");
    }
});

class Person{
    #name;
    #gender;
    #height;
    #hydrated;
    #breathing;
    #booty;

    constructor(name, height, gender){
        this.#name = name;
        this.#height = height;
        this.#gender = gender;
        if((this.#name.toLowerCase() == "karen") 
            && (this.#height == "163")
            && (this.#gender == 'Female')){
            this.#booty = true;
        }else{
            this.#booty = false;
        }
        this.#hydrated = true;
        this.#breathing = true;
    }

    getName(){
        return this.#name;
    }

    getHeight(){
        return this.#height;
    }

    getGender(){
        return this.#gender;
    }

    getHydrated(){
        if(this.#hydrated){
            return "Yes";
        }else{
            return "No";
        }
    }

    getBreathing(){
        if(this.#breathing){
            return "Yes";
        }else{
            return "No";
        }
    }

    getBooty(){
        if(this.#booty){
            return "Yes";
        }else{
            return "No";
        }
    }

};