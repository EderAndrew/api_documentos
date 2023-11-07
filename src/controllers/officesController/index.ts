import { Request, Response } from "express";
import ServiceOffices from "../../services/serviceOffices";
//import fs from 'fs'
//import { NotaryOffices } from "@prisma/client";

const OfficesController = {
    getAllOffices: async(req: Request, res: Response) => {
        try{
            const data = await ServiceOffices.getOffices()

            if(res.status(200)){
                return res.json(data)
            }
            return res.json({message: "Não foi possível retornar as informações"})
        }catch(err){
            return new Error(`Não foi possível conectar com o Banco - ${err}`)
        }
    },

    getOfficesByUf: async(req: Request, res:Response) => {
        try{
            const { uf } = req.params

            const data = await ServiceOffices.GetOfficeByUF(uf)

            if(res.status(200)){
                return res.json(data)
            }
            return res.json({message: `Não foi possível retornar os Cartórios por ${uf}`})
        }catch(err){
            return new Error("Não foi possível retornar as informações")
        }
    },

    getOfficesByCity: async(req: Request, res: Response) => {
        try{
            const { city } = req.params

            const data = await ServiceOffices.getOfficeByCity(city)

            if(res.status(200)){
                return res.json(data)
            }
            return res.json({message: "Não foi identificado nenhum cartório."})
        }catch(err){
            return new Error("Não foi possível retornar as informações")
        }
    }

    //DON'T USE
    /* postAllOffices: async(req: Request, res: Response) => {
        try{
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
                await ServiceOffices.createOffices(correctlyData[officeinDB])
            }

            res.json(correctlyData)

        }catch(err){
            return new Error("Não foi possivel ler o arquivo")
        }
    } */
}

export default OfficesController