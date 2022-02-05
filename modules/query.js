const QUERY = {
    SELECT_USERS: 'SELECT * FROM socialnetworkdb.users',
    CREATE_USER: 'INSERT INTO socialnetworkdb.users (username, pwhash, firstname, email) VALUES (?,?,?,?)',
    SELECT_USER: 'SELECT * FROM socialnetworkdb.users WHERE id=?',
    UPDATE_USER: 'UPDATE socialnetworkdb.users SET username = ?, pwhash = ?, firstname = ?, email = ? WHERE id = ?',
    DELETE_USER: 'DELETE FROM socialnetowrkdb.users WHERE id=?',
}

export default QUERY;