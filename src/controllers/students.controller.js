const { getAllStudentsFromDb, getStudentByIdFromDb } = require("../modules/repository")



const greetings = (req, res) => {
    res.send('Hello, World! AI will ruin us all.')
}


const getAllStudents = async (req, res) => {
    const response = await getAllStudentsFromDb()
    res.status(200).json(response)
}

const getStudentById = async (req, res) => {
    const { id } = req.params;
    const student = await getStudentByIdFromDb(id);
    if (!!!student) {
        return res.status(204).json('Id inexistente na base de dados');
    }
    res.status(200).json(student);
}


module.exports = {
    greetings,
    getAllStudents,
    getStudentById
}
