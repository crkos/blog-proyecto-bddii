const {getConnection} = require("../db/db");
const {sendError} = require("../utils/helper");


class Resena {
    constructor(resenaId = null, title, content, created_at = null, edited_at = null, visible = true, usuarioId = null, bookId = null, table) {

        this._resenaId = resenaId;
        this._title = title;
        this._content = content;
        this._created_at = created_at;
        this._edited_at = edited_at;
        this._visible = visible;
        this._usuarioId = usuarioId;
        this._bookId = bookId;
        this._table = table;
    }

    static findById = async (resenaId, table = 'resena') => {
        const connection = await getConnection();

        const query = `SELECT * FROM ${table} WHERE resenaId= ?`;

        const [[resena]] = await connection.execute(query, [resenaId]);

        if(!resena) return;

        return new Resena(resena.resenaId, resena.title, resena.content, resena.created_at, resena.edited_at, resena.visible, resena.usuarioId, resena.bookId, table);
    }

    static getAllResenasFromLibro = async (libroId, table = 'resena') => {
        const connection = await getConnection();

        const query = `SELECT * FROM ${table} WHERE bookId = ?`;

        const [resenas] = await connection.execute(query, [libroId]);

        if(!resenas) return

        return resenas.map(resena => {
            return new Resena(resena.resenaId, resena.title, resena.content, resena.created_at, resena.edited_at, resena.visible, resena.usuarioId, resena.bookId, table)
        })


    }

    static getAll = async (table = 'resena') => {
        const connection = await getConnection();

        const query = `SELECT * FROM ${table}`;

        const [resenas] = await connection.execute(query);

        return resenas.map(resena => {
            return new Resena(resena.resenaId, resena.title, resena.content, resena.created_at, resena.edited_at, resena.visible, resena.usuarioId, resena.bookId, table);
        });

    }

    insert = async () => {
        const connection = await getConnection();

        const query = `INSERT INTO ${this._table}(title, content, visible, usuarioId, bookId) VALUES (?, ?, ?, ?, ?);`;

        return connection.execute(query, [this._title, this._content, this._visible, this._usuarioId, this._bookId]);

    }

    delete = async () => {
        const connection = await getConnection();

        const query =  `DELETE FROM ${this._table} WHERE resenaId=?`;

        return connection.execute(query, [this._resenaId]);

    }

    //Solo hacer update en title, content, visible, usuarioId y bookId no deberian ser actualizables
    update = async () => {
        const connection = await getConnection();

        const query = `UPDATE ${this._table} SET title= ?, content= ?, visible= ? WHERE resenaId= ?`;

        return connection.execute(query, [this._title, this._content, this._visible, this._resenaId]);
    }

    get table() {
        return this._table;
    }

    set table(value) {
        this._table = value;
    }

    get resenaId() {
        return this._resenaId;
    }

    set resenaId(value) {
        this._resenaId = value;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get content() {
        return this._content;
    }

    set content(value) {
        this._content = value;
    }

    get created_at() {
        return this._created_at;
    }

    set created_at(value) {
        this._created_at = value;
    }

    get edited_at() {
        return this._edited_at;
    }

    set edited_at(value) {
        this._edited_at = value;
    }

    get visible() {
        return this._visible;
    }

    set visible(value) {
        this._visible = value;
    }

    get usuarioId() {
        return this._usuarioId;
    }

    set usuarioId(value) {
        this._usuarioId = value;
    }

    get bookId() {
        return this._bookId;
    }

    set bookId(value) {
        this._bookId = value;
    }
}

module.exports = Resena;