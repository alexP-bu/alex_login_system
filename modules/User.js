class User{
    constructor(id, username, firstName, email){
        this.id = id;
        this.username = username;
        this.firstname = firstName;
        this.email = email;
        this.TIMESTAMP_RETRIEVED = new Date().toLocaleString();
    }
}