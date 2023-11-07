import bcrypt from 'bcrypt'
import { User } from "../../interfaces/user"
import prisma from '../../client'

const ServicerUser = {
    createUser: async(data: User) => {
        const hasUser = await prisma.user.findUnique({where: { register: data.register }})

        if(!hasUser){
            let hash = bcrypt.hashSync(data.password, 10)

            const user = await prisma.user.create({
                data:{
                    avatar: data.avatar,
                    name: data.name,
                    register: data.register,
                    password: hash,
                    op: data.op,
                    bank_op: data.bank_op
                }
            })

            return user
        }else{
            return new Error("Usuário já existe na base de dados.")
        }
    },

    findAllUsers: async() => {
        return await prisma.user.findMany()
    },

    findUserByRegister: async(register:string) => {
        return await prisma.user.findUnique({where: { register }})
    },

    matchPassword: (password: string, encryptedPassword: string	) => {
        return bcrypt.compareSync(password, encryptedPassword)
    },

    findUserById: async(id: string) => {
        return await prisma.user.findUnique({where: { id: Number(id) }})
    }
}

export default ServicerUser