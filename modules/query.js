const QUERY = {
    SELECT_USERS: 'SELECT * FROM socialnetworkdb.users',
    CREATE_USER: 'INSERT INTO socialnetworkdb.users (username, pwhash) VALUES (?,?)',
    SELECT_USER: 'SELECT * FROM socialnetworkdb.users WHERE username=?',
    UPDATE_USER: 'UPDATE socialnetworkdb.users SET pwhash = ?, firstname = ?, email = ? WHERE username = ?',
    DELETE_USER: 'DELETE FROM socialnetowrkdb.users WHERE username=?',
}

export default QUERY;