const fs = require('fs/promises');

const path = './src/modules/database/students.json';

const getAllStudentsFromDb = async () => {
    const result = JSON.parse(await fs.readFile(path));
    return result
}

async function getStudentByIdFromDb(id) {
    const { students } = await getAllStudentsFromDb();
    const result = await students.find(student => student.id === +id);
    return result
}

module.exports = {
    getAllStudentsFromDb,
    getStudentByIdFromDb
}