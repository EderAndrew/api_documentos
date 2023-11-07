import { Request, Response } from "express";
import logger from '../../logger'
import { generateToken } from "../../config/passportStrategy";
import ServiceUser from "../../services/serviceUser";
import os from 'os'
import { User } from "@prisma/client";
import ServiceLogs from "../../services/serviceLog";

//const networkInfo = os.networkInterfaces()

const UserController = {
    createUser: async(req: Request, res: Response) => {
        try{

            // Check if request body has required fields
            if(req.body.register && req.body.password){
                let {
                    avatar,
                    name,
                    register,
                    password,
                    op,
                    bank_op
                } = req.body

                let newUser = await ServiceUser.createUser({
                    avatar,
                    name,
                    register,
                    password,
                    op,
                    bank_op
                })

                if(newUser instanceof Error){
                    logger.error(`Usuário tentou criar um novo usuário no sistema.`)
                    return res.json(newUser.message)

                }else{
                    logger.info(`Usuário criou um novo usuário no sistema.`)
                    return res.json({message: "Usuário inserido com sucesso."})
                }
            }
            logger.info(`Usuário não preencheu todos os campos corretamente ao tentar criar um novo usuário.`)
            // Send error response if required fields are missing
            return res.json({message: "Campos de usuário e/ou senha não foram enviados."})
        }catch(err){
            logger.error(`Usuário tentou criar um novo usuário no sistema.`)
            // Throw error if user creation fails
            return new Error(`Não foi possível realizar o cadastro do Usuário. - ${err}`)
        }
    },

    //Authenticates user login credentials and generates a token if valid.
    login: async (req: Request, res: Response) => {
        //const ipAdress = networkInfo.Ethernegt ?  networkInfo.Ethernegt[1].address : "127.0.0.1"

        try{
            let {register, password} = req.body
            const ipClient = await IpClient()
            if(register){
                 // Find user in the database with matching register and password
                let user = await ServiceUser.findUserByRegister(register)

                // Extract register and password from request body
                if(user && ServiceUser.matchPassword(password, user.password)){
                    // Generate token with user information
                    const token = generateToken({
                        id: user.id,
                        name: user.name,
                        register: user.register,
                        password: user.password,
                        op: user.op
                    })

                    const userSession = {
                        id: user.id,
                        name: user.name,
                        register: user.register,
                        bank_op: user.bank_op,
                        op: user.op
                    }
                    user = userSession as User

                    await ServiceLogs.createdLog({
                        level: "info",
                        operator: user.name,
                        operator_register: user.register,
                        ip: ipClient as string,
                        message: "Operador realizou o login no sistema"
                    })

                    res.cookie("user", userSession)
                    //logger.info(`Usuário ${user.name} fez acesso ao sistema. No IP: ${ipAdress}`)
                    // Return token in response
                    return res.status(200).json({user: userSession, token})
                }
            }

            await ServiceLogs.createdLog({
                level: "error",
                operator: "desconhecido",
                operator_register: register,
                ip: ipClient as string,
                message: "Operador tentou realizar o login no sistema. Usuário e/ou Senha incorretos."
            })
            //logger.debug(`Tentativa de acesso ao sistema. Usuário não encontrado. No IP: ${ipAdress}`)
            return res.status(401).json({message: "Usuário ou senha incorretos."})

        }catch(err){
            // Log error and throw new error
            logger.error("Ocorreu algum erro com o banco de dados.")
            throw new Error(`Erro ao realizar o login. - ${err}`)
        }
    },

    getAllUsers: async(req: Request, res: Response) => {
        try{
            let users = await ServiceUser.findAllUsers()

            if(users){
                return res.json(users)
            }else{
                return res.json({message: "Não foi possível listar os Usuários."})
            }
        }catch(err){
            return new Error("Não foi possível listar os Usuários.")
        }
    },

    getOneUser: async(req: Request, res: Response) => {
        try{
            let { id } = req.params
            let user = await ServiceUser.findUserById(id)

            if(user){
                return res.json(user)
            }else{
                return res.json({message: "Usuário não encontrado."})
            }
        }catch(err){
            return new Error("Usuário não encontrado.")
        }
    },

    logoutUser: async(req: Request, res: Response) => {
        try{
            logger.info(`Usuário deslogou do sistema.`)
            res.clearCookie("auth")
            res.clearCookie("user")
            return res.json({message: "Usuário deslogado com sucesso."})
        }catch(err){
            return new Error("Usuário não encontrado.")
        }
    },

}

export const userInfo = (user: User) => {
    if(user){
        return user
    }
    return null

}

export const IpClient = async() => {
    type IP = {
        ip: string
    }
    try{
        const req = await fetch("https://api.ipify.org?format=json", {
            method: "GET",
            headers: {
                "content-type": "application/json",
            }
        })
        const data:IP = await req.json() as IP
        if(!data){
            return new Error("Falha ao obter o IP.")
        }
        return data.ip
    }catch(err){
        return new Error(`${err}`)
    }
}

export default UserController