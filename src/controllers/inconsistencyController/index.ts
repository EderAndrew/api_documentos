import {Request, Response} from 'express'
import ServiceInconsistencies from '../../services/serviceInconsistencies'
import ServiceLogs from '../../services/serviceLog'
import { IpClient } from '../userController'
import logger from '../../logger'

const InconsistencyController = {
    postInconsistencyByIdSolicitation: async(req: Request, res: Response) => {
        const ipClient = await IpClient()
        try{
            if(req.body.description){
                let {
                    operator_name, operator_register, requestor_name, requestor_register,
                    bank_op, information_date, correction_date, description,
                    status, solicitationId
                } = req.body

                let inconsistency = await ServiceInconsistencies.createInconsistency({
                    operator_name, operator_register, requestor_name, requestor_register,
                    bank_op, information_date, correction_date, description,
                    status, solicitationId: Number(solicitationId)
                })

                if(inconsistency){
                    await ServiceLogs.createdLog(
                        {
                            level: "info",
                            operator: operator_name,
                            operator_register,
                            ip: ipClient as string,
                            message: `Operador inseriu uma nova Inconsistência`
                        }
                    )
                    return res.json({message: "Inconsistência inserida com sucesso"})
                }else{

                    return new Error("Não foi possível inserir a inconsistência.")
                }
            }

        }catch(err){
            logger.error("Não foi possível inserir a inconsistência. - " + err)
            return new Error(`Não foi possível inserir a inconsistência: -${err}`)
        }
    },

    getAllInconsistenciesByIdSolicitation: async(req: Request, res: Response) => {
        try{
            let {idSolicitation} = req.params
            let inconsistencies = await ServiceInconsistencies.findInconsistenciesByIdSolicitation(idSolicitation)

           return res.json(inconsistencies)
        }catch(err){
            return new Error(`Problema para obter as inconsistências: -${err}`)
        }
    },

    updateInconsistency: async(req: Request, res: Response) => {
        const ipClient = await IpClient()
        try{
            let { id } = req.params

            let {
                operator_name, operator_register, requestor_name, requestor_register,
                bank_op, information_date, correction_date, description,
                status, solicitationId
            } = req.body

            let dataInconsistency = await ServiceInconsistencies.updateInconsistency(id, {
                    operator_name, operator_register, requestor_name, requestor_register,
                    bank_op, information_date, correction_date, description,
                    status, solicitationId
                })

            if(dataInconsistency){
                await ServiceLogs.createdLog(
                    {
                        level: "info",
                        operator: operator_name,
                        operator_register,
                        ip: ipClient as string,
                        message: `Operador atualizou a inconsistência da Solicitação id: ${solicitationId}`
                    }
                )
                return res.json({message: "Atualização efetuada com sucesso!"})
            }
            return res.json({message: "Não foi possível atualizar a inconsistência."})
        }catch(err){
            return new Error(`Problema para atualizar a inconsistência: -${err}`)
        }
    }
}

export default InconsistencyController