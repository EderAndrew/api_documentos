import { Request, Response } from 'express'
import ServiceSolicitattion from '../../services/serviceSolicitation'
import logger from '../../logger'
import ServiceLogs from '../../services/serviceLog'
import { IpClient } from '../userController'

const SolicitationController = {

    //Retrieves all documents from the database and sends them as a response.
    getAllSolicitations: async(req: Request, res: Response) => {
        try{
            const solicittions = await ServiceSolicitattion.getAllSolicitations()
            // Send the documents as a JSON response
            if(res.status(200)){
                return res.json(solicittions)
            }

        }catch(err){
            // Handle any errors that occur during the retrieval process
            logger.error(`Usuário tentou carregar uma lista de todas as solicitações.`)
            return new Error(`Ocorreu algum erro para carregar todas as solicitações: -${err}`)
        }
    },

    // Retrieves a document by its ID from the database and sends it as a JSON response.
    getOneSolicitation: async(req: Request, res: Response) => {
        const {id} = req.params
        try{
            const solicitation = await ServiceSolicitattion.getSolicitation(id)

            if(res.status(200)){
                logger.info(`Usuário solicitou informações de uma solicitação no id: ${id}`)
                return res.json(solicitation)
            }else{
                return res.json({message: 'Não existe nenhuma solicitação com este ID'})
            }
        }catch(err){
            // Handle any errors that occur during the retrieval process
            logger.error(`Ocorreu algum erro com o usuário para carregar a solicitação - ${err}`)
            return new Error(`Ocorreu algum erro para carregar a solicitação com id ${id}: -${err}`)
        }
    },

    postNewSolicitation: async(req: Request, res: Response) => {
        const ipClient = await IpClient()
        try{
            // Destructure the request body
            const {
                request_number, bank_proposal, document_name, sub_document,
                state_id, state, city, uf,
                property_registration_office,civil_register_office, register_number, applicant_name_one, applicant_name_two,
                applicant_cpf_on, applicant_cpf_two, birth_date, wedding_date,
                death_date, municipal_registration_property, request_status, request_date,
                request_hour, requestor_name, requestor_register, bank_op,
                forecast_date, forecast_weeK_day, operator_name, operator_register,
                operator_op, image, image_name, image_type,
                image_size, start_process_date, start_process_hour,
                finish_process_date, finish_process_hour
            } = req.body

            const result = await ServiceSolicitattion.createSolicitation({
                    request_number, bank_proposal, document_name, sub_document,
                    state_id, state, city, uf,
                    property_registration_office, civil_register_office, register_number, applicant_name_one, applicant_name_two,
                    applicant_cpf_on, applicant_cpf_two, birth_date, wedding_date,
                    death_date, municipal_registration_property, request_status, request_date,
                    request_hour, requestor_name, requestor_register, bank_op,
                    forecast_date, forecast_weeK_day, operator_name, operator_register,
                    operator_op, image, image_name, image_type,
                    image_size: Number(image_size), start_process_date, start_process_hour,
                    finish_process_date, finish_process_hour
            })

            // Send the response with the created solicitation
            if(res.status(200)){
                await ServiceLogs.createdLog(
                    {
                        level: "info",
                        operator: requestor_name,
                        operator_register: requestor_register,
                        ip: ipClient as string,
                        message: `Operador inseriu uma nova Solicitação - ${document_name} ${request_number ? `- ${request_number}` : ''}`
                    }
                )
                return res.json({message: "Nova solicitação inserida com sucesso!"})
            }else{
                logger.info(`Usuário tentou inserir uma nova solicitação.`)
                return res.json({message: "Erro ao inserir nova solicitação"})
            }
        }catch(err){
            logger.error(`Sistema acusou um erro quando o usuário tentou inserir uma nova solicitação.`)
            // Handle any errors that occur during the retrieval process
            return new Error(`Ocorreu algum erro para criar uma nova solicitação: -${err}`)
        }
    },

    //Create a new solicitation
    putSolicitation: async(req: Request, res: Response) => {
        const {id}=req.params
        const ipClient = await IpClient()

        try{
            const {
                request_number, bank_proposal, document_name, sub_document,
                state_id, state, city, uf,
                property_registration_office, register_number, civil_register_office, applicant_name_one,
                applicant_name_two,
                applicant_cpf_on, applicant_cpf_two, birth_date, wedding_date,
                death_date, municipal_registration_property, request_status, request_date,
                request_hour, requestor_name, requestor_register, bank_op,
                forecast_date, forecast_weeK_day, operator_name, operator_register,
                operator_op, image, image_name, image_type,
                image_size, start_process_date, start_process_hour,
                finish_process_date, finish_process_hour
            } = req.body

            const result = await ServiceSolicitattion.updateSolicitation(id, {
                    request_number, bank_proposal, document_name, sub_document,
                    state_id, state, city, uf,
                    property_registration_office, register_number, applicant_name_one, civil_register_office, applicant_name_two,
                    applicant_cpf_on, applicant_cpf_two, birth_date, wedding_date,
                    death_date, municipal_registration_property, request_status, request_date,
                    request_hour, requestor_name, requestor_register, bank_op,
                    forecast_date, forecast_weeK_day, operator_name, operator_register,
                    operator_op, image, image_name, image_type,
                    image_size: Number(image_size), start_process_date, start_process_hour,
                    finish_process_date, finish_process_hour
                })

            if(res.status(200)){
                await ServiceLogs.createdLog(
                    {
                        level: "info",
                        operator: operator_name,
                        operator_register,
                        ip: ipClient as string,
                        message: `Operador atualizou uma Solicitação - ${document_name} ${request_number ? `- ${request_number}` : ''}`
                    }
                )
                return res.json({message: "Solicitação atualizada com sucesso!"})
            }else{
                logger.info(`Usuário tentou realizar a atualização da Solicitação com o id: ${id}`)
                return res.json({message: "Não foi possível atualizar a solicitação"})
            }
        }catch(err){
            logger.error(`Ocorreu um erro ao realizar a atualização da Solicitação. - ${err}`)
            // Handle any errors that occur during the retrieval process
            return new Error(`Não foi possível atualizar a solicitação: - ${err}`)
        }
    },

    filterSolicitationsByDatesRequests: async(req: Request, res: Response) => {
        try{
            const {initial_date, final_date} = req.query
            const dataFilter = await ServiceSolicitattion.filterSolicitationsByDatesRequests(initial_date as string, final_date as string)

            if(res.status(200)){
                logger.info(`Usuário filtrou as Solicitações por data.`)
                return res.json(dataFilter)
            }
            logger.debug(`Usuário tentou filtrar as Solicitações por data.`)
            return res.json({message: "Não foi identificado nenhuma Solicitação por essas datas."})
        }catch(err){
            logger.error(`Ocorreu um erro no sistema ao filtrar as Solicitações por data. - ${err}`)
            return new Error(`Erro ao filtrar solicitações por data: - ${err}`)
        }
    }
}

export default SolicitationController




