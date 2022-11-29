const {getConnection} = require("../db/db");


class Comentario {
    constructor(comentarioId = null, content, created_at, usuarioId = null, resenaId = null, table = 'comentario') {
        this._comentarioId = comentarioId;
        this._content = content;
        this._created_at = created_at;
        this._usuarioId = usuarioId;
        this._resenaId = resenaId;
        this._table = table;
    }

    static findById = async (comentarioId, table = "comentario") => {
        const connection = await getConnection();

        const query = `SELECT * FROM ${table} WHERE comentarioId= ?`;

        const [[comentario]] = await connection.execute(query, [comentarioId]);

        if(!comentario) return;

        return new Comentario(comentario.comentarioId, comentario.content, comentario.created_at, comentario.usuarioId, comentario.resenaId)

    }

    static getAllComentario = async (table = "comentario") => {
        const connection = await getConnection();

        const query = `SELECT * FROM ${table}`;

        const [comentarios] = await connection.execute(query);

        return comentarios.map((comentario) => {
            return new Comentario(comentario.comentarioId, comentario.content, comentario.created_at, comentario.usuarioId, comentario.resenaId, table);
        });
    }

    static getAllComentarioById = async (resenaId ,table = "comentario") => {
        const connection = await getConnection();

        const query = `SELECT * FROM ${table} WHERE resenaId = ?`;

        const [comentarios] = await connection.execute(query, [resenaId]);

        return comentarios.map((comentario) => {
            return new Comentario(comentario.comentarioId, comentario.content, comentario.created_at, comentario.usuarioId, comentario.resenaId, table);
        });
    }

    static getAllComentarioFromUser = async (usuarioId, table = "comentario") => {
        const connection = await getConnection();

        const query = `SELECT * FROM ${table} WHERE usuarioId = ?`;

        const [comentarios] = await connection.execute(query, [usuarioId]);

        return comentarios.map(comentario => {
            return new Comentario(comentario.comentarioId, comentario.content, comentario.created_at, comentario.usuarioId, comentario.resenaId, table);
        });

    }

    insert = async () => {
        const connection = await getConnection();

        const query = `INSERT INTO ${this._table}(content, usuarioId, resenaId) VALUES(?, ?, ?)`;

        return connection.execute(query, [this._content, this._usuarioId, this._resenaId]);
    }


    update = async () => {
        const connection = await getConnection();

        const query = `UPDATE ${this._table} SET content = ? WHERE comentarioId= ?`;

        return connection.execute(query, [this._content, this._comentarioId]);
    }

    delete = async () => {
        const connection = await getConnection();

        const query = `DELETE FROM ${this._table} WHERE comentarioId = ?`

        return connection.execute(query, [this._comentarioId]);

    }

    get table() {
        return this._table;
    }

    set table(value) {
        this._table = value;
    }

    get comentarioId() {
        return this._comentarioId;
    }

    set comentarioId(value) {
        this._comentarioId = value;
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

    get usuarioId() {
        return this._usuarioId;
    }

    set usuarioId(value) {
        this._usuarioId = value;
    }

    get resenaId() {
        return this._resenaId;
    }

    set resenaId(value) {
        this._resenaId = value;
    }


}

module.exports = Comentario;