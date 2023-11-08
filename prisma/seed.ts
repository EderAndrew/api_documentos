import fs from 'fs'
import bcrypt from 'bcrypt'
import { User } from '../src/interfaces/user'
import prisma from '../src/client'
import { NotaryOffices } from '../src/interfaces/notaryOffices'

const main = async() => {

    let hash = bcrypt.hashSync("admin", 10)
    let hash_bank = bcrypt.hashSync("bradesco", 10)
    let hash_operador = bcrypt.hashSync("bpo001", 10)

    const users:User[] = []

    const admin = {
        avatar: '',
        name: 'Admin Master',
        register: '89007063',
        password: hash,
        op: '00',
        bank_op: '0'
    }
    const user_bank = {
        avatar: '',
        name: 'Operador Banco',
        register: '120682',
        password: hash_bank,
        op: '0',
        bank_op: '1'
    }
    const user_operator = {
        avatar: '',
        name: 'Operador BPO',
        register: '050872',
        password: hash_operador,
        op: '1',
        bank_op: '0'
    }

    users.push(admin)
    users.push(user_bank)
    users.push(user_operator)

    const findUser = await prisma.user.findMany()

    if(findUser.length > 0){
        console.log("Já foi preenchido o banco de dados com usuários")
        return
    }

    for(let user in users){
        await prisma.user.create({
            data:{
                avatar: users[user].avatar,
                name: users[user].name,
                register: users[user].register,
                password: users[user].password,
                op: users[user].op,
                bank_op: users[user].bank_op
            }
        })
    }

    type Cartorios = {
        Column1: string,
        CNS: string,
        Tipo: string,
        Nome: string,
        Cidade: string,
        UF: string
    }
    const path = fs.readFileSync(`${__dirname}\\data.json`, "utf-8")
    const data: Cartorios[] = JSON.parse(path)
    const correctlyData:NotaryOffices[] = []

    for(let office in data){
        correctlyData.push({
            id: parseInt(data[office].Column1),
            cns: data[office].CNS,
            type: data[office].Tipo,
            name: data[office].Nome,
            city: data[office].Cidade,
            uf: data[office].UF
        })
    }

    for(let officeinDB in correctlyData){
        await prisma.notaryOffices.create({
            data:{
                cns: correctlyData[officeinDB].cns,
                type: correctlyData[officeinDB].type,
                name: correctlyData[officeinDB].name,
                city: correctlyData[officeinDB].city,
                uf: correctlyData[officeinDB].uf
            }
        })
    }

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    })