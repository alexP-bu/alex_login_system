const QUERY = {
    SELECT_USERS: 'SELECT * FROM users',
    CREATE_USER: 'INSERT INTO users(username, pwhash, firstname, email) VALUES(?,?,?,?)',
    SELECT_USER: 'SELECT * FROM users WHERE id=?',
    UPDATE_USER: 'UPDATE users SET username = ?, pwhash = ?, firstname = ?, email = ? WHERE id = ?',
    DELETE_USER: 'DELETE FROM users WHERE id=?',
}

export default QUERY;