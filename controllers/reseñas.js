const {getConnection} = require("../db/db");
const {sendError} = require("../utils/helper");

const table = 'resena';

exports.getResenas = async (req, res) => {
    const connection = await getConnection();

    const query = `SELECT * FROM ${table}`;

    const [results] = await connection.execute(query);
    if(!results) return sendError(res, 'There was an error when selecting the table');

    const data = {
        results
    };

    res.status(200).json({
        message: 'Datos!', data
    });

};

exports.getSingleResena = async (req, res) => {
    const { resenaId } = req.params;

    const connection = await getConnection();

    const query =  `SELECT * FROM ${table} WHERE id=${resenaId}`;

    const [results] = await connection.execute(query);

    if(results.length === 0) return sendError(res, 'No se ha encontrado la resena');

    res.status(200).json({
        message: 'Data!', data: {results}
    });

}

exports.createResena = async (req, res) => {
    const {title, content} = req.body;
    const connection = await getConnection();

    const query = `INSERT INTO ${table}(title, content) VALUES ('${title}', '${content}');`;

    const [results] = await connection.execute(query);

    if(!results) return sendError(res, 'There was an error when creating resena');

    res.status(200).json({
        message: 'Se ha creado la resena', data: {results}
    });


}