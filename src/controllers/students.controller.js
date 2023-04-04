const { getAllStudentsFromDb, getStudentByIdFromDb } = require("../modules/repository")
const findCep = require("./commun")



const greetings = (req, res) => {
    return res.send({ message: 'Hello, World! AI will ruin us all.' })
}


const getAllStudents = async (req, res) => {
    const response = await getAllStudentsFromDb()
    return res.status(200).json(response)
}

const getStudentById = async (req, res) => {
    const { id } = req.params;
    const student = await getStudentByIdFromDb(id);
    if (!!!student) {
        return res.status(404).json({ message: `Não existe estudante com id ${id}` });
    }
    return res.status(200).json(student);
}

const postNewStudent = async (req, res) => {
    const incompleteInfoMsg = 'Por favor, preencha todos os campos';
    const notAllowedMsg = 'Sinto muito, apenas aceitamos novos alunos na DDS-10';
    const invalidCepMsg = 'CEP inválido, logo não poderemos prosseguir com a criação do aluno, favor mandar um CEP válido'

    const alreadyCreated = 'Aluno já cadastrado'
    const invalidName = 'O campo name e lastName devem conter entre 1 e 13 caracteres alfabéticos';
    const invalidAge = 'A idade deve ser numérico';
    const invalidClassName = 'O ClassName deve adotar o padrão: "DDS-XX" onde XX devem ser substituídos por números entre 0 e 99';
    const invalidNumber = 'Number deve ser numérico'

    const { name, lastName, age, className, postalCode: cep, number } = req.query;
    if (!name || !lastName || !age || !className || !cep || !number) {
        return res.status(400).json({ message: incompleteInfoMsg });
    }

    const { students } = await getAllStudentsFromDb();
    const student = await students.find(student => student.name === name);

    if (!!student) return res.status(406).json({ message: alreadyCreated })

    if (className !== 'DDS-10') {
        return res.status(412).json(notAllowedMsg);
    }

    const isNameOk = name.length > 0 && name.length <= 13;
    const isLastNameOk = lastName.length > 0 && lastName.length <= 13;
    const isAgeOk = !isNaN(+age);
    const isClassNameOk = className.length > 4 && className.length <= 6;
    const isCepOk = await findCep(cep);
    const isNumberOk = !isNaN(+number);

    switch (true) {
        case (!isNameOk):
            return res.status(400).json({ message: invalidName });

        case (!isLastNameOk):
            return res.status(400).json({ message: invalidName });

        case (!isAgeOk):
            return res.status(400).json({ message: invalidAge });

        case (!isClassNameOk):
            return res.status(400).json({ message: invalidClassName });

        case (!!!isCepOk):
            return res.status(400).json({ message: invalidCepMsg })

        case (!isNumberOk):
            return res.status(400).json({ message: invalidNumber });
        default:
            break;
    }

    //TODO - add o aluno na db, fazer um id auto incrementável
    return res.status(201).json({ message: 'Aluno adicionado na base de dados com sucesso!' })

}


module.exports = {
    greetings,
    getAllStudents,
    getStudentById,
    postNewStudent,
}
