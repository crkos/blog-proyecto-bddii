const {getConnection} = require("../db/db");
const bcrypt = require("bcrypt");

class User {
    constructor(userId = null, name, first_ln, second_ln, email, password, table, role = 'user', avatar = null, avatar_public_id = null) {

        this._userId = userId;
        this._name = name;
        this._first_ln = first_ln;
        this._second_ln = second_ln;
        this._email = email;
        this._password = password;
        this._table = table;
        this._role = role;
        this._avatar = avatar;
        this._avatar_public_id = avatar_public_id;

    }

    static findById = async (id, table = 'usuario') => {
        const connection = await getConnection();

        const query = `SELECT * FROM ${table} WHERE userId= ?`;

        const [[user]] = await connection.execute(query, [id]);
        if (!user) return;
        return new User(user.userId, user.name, user.first_ln, user.second_ln, user.email, user.password, table, user.role, user.avatar, user.avatar_public_id);

    }

    static findByEmail = async (email, table = 'usuario') => {
        const connection = await getConnection();

        const query = `SELECT * FROM ${table} WHERE email= ?`;

        const [[user]] = await connection.execute(query, [email]);
        if (!user) return;
        return new User(user.userId, user.name, user.first_ln, user.second_ln, user.email, user.password, table, user.role, user.avatar, user.avatar_public_id);
    }

    comparePassword = async (password) => {

        return await bcrypt.compare(password, this._password);

    }

    getLastId = async () => {
        const connection = await getConnection();

        const query = `SELECT MAX(userId) AS LastID FROM ${this._table};`

        return connection.execute(query);

    }

    insert = async () => {
        const connection = await getConnection();

        const query = `INSERT INTO ${this._table}(name, first_ln, second_ln, email, password, role, avatar, avatar_public_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

        //SHA1 Tener mejor rendimiento que hacer esto ->.
        this._password = await bcrypt.hash(this._password, 10);

        return connection.execute(query, [this._name, this._first_ln, this._second_ln, this._email, this._password, this._role, this._avatar, this._avatar_public_id]);
    }

    get userId() {
        return this._userId;
    }

    set userId(value) {
        this._userId = value;
    }

    get table() {
        return this._table;
    }

    set table(value) {
        this._table = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get first_ln() {
        return this._first_ln;
    }

    set first_ln(value) {
        this._first_ln = value;
    }

    get second_ln() {
        return this._second_ln;
    }

    set second_ln(value) {
        this._second_ln = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    get role() {
        return this._role;
    }

    set role(value) {
        this._role = value;
    }

    get avatar() {
        return this._avatar;
    }

    set avatar(value) {
        this._avatar = value;
    }

    get avatar_public_id() {
        return this._avatar_public_id;
    }

    set avatar_public_id(value) {
        this._avatar_public_id = value;
    }

}

module.exports = User;