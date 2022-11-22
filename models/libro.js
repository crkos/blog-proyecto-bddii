const {getConnection} = require("../db/db");

class Libro {
    constructor(bookId = null, title, description, tags, authors, table = 'libro',image = null, image_public_id = null) {

        this._bookId = bookId;
        this._title = title;
        this._description = description;
        this._tags = tags;
        this._authors = authors;
        this._table = table;
        this._image = image;
        this._image_public_id = image_public_id;
    }

    static findById = async (id, table = 'libro') => {
        const connection = await getConnection();

        const query = `SELECT * FROM ${table} WHERE bookId= ?`;

        const [[libro]] = await connection.execute(query, [id]);

        if (!libro) return;

        return new Libro(libro.bookId, libro.title, libro.description, libro.tags, libro.authors, table, libro.image, libro.image_public_id);

    }

    static getAllBook = async (table = 'libro') => {
        const connection = await getConnection();

        const query = `SELECT * FROM ${table}`;

        const [books] = await connection.execute(query);

        return books.map((book) => {
            return new Libro(book.bookId, book.title, book.description, book.tags, book.authors, table, book.image, book.image_public_id);
        });

    }

    insert = async () => {
        const connection = await getConnection();

        const query = `INSERT INTO ${this._table}(title, description, tags, authors, image, image_public_id) VALUES(?, ?, ?, ?, ?, ?)`;

        return connection.execute(query, [this._title, this._description, this._tags, this._authors, this._image, this._image_public_id]);

    }

    update = async () => {
        const connection = await getConnection();

        const query =  `UPDATE ${this._table} SET title = ?, description = ?, tags = ?, authors = ?, image = ?, image_public_id = ? WHERE bookId = ?`;

        return connection.execute(query, [this._title, this._description, this._tags, this._authors, this._image, this._image_public_id, this._bookId]);
    }

    delete = async () => {
        const connection = await getConnection();

        const query = `DELETE FROM ${this._table} WHERE bookId = ?`

        return connection.execute(query, [this._bookId]);
    }



    get bookId() {
        return this._bookId;
    }

    set bookId(value) {
        this._bookId = value;
    }

    get table() {
        return this._table;
    }

    set table(value) {
        this._table = value;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get tags() {
        return this._tags;
    }

    set tags(value) {
        this._tags = value;
    }

    get authors() {
        return this._authors;
    }

    set authors(value) {
        this._authors = value;
    }

    get image() {
        return this._image;
    }

    set image(value) {
        this._image = value;
    }

    get image_public_id() {
        return this._image_public_id;
    }

    set image_public_id(value) {
        this._image_public_id = value;
    }

}

module.exports = Libro;