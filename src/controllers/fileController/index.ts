import { Request, Response } from 'express'
import ServiceFiles from '../../services/serviceFiles'
import ServiceLogs from '../../services/serviceLog'
import { IpClient } from '../userController'
import logger from '../../logger'
import https from 'https'
import fs from 'fs'

const FileController = {
    uploadFile: async(req: Request, res: Response) => {
        res.json({})
    },
    uploadFileMongo: async(req: Request, res: Response) => {
        const ipClient = await IpClient()
        try{
            let {name,
                file,
                size,
                idSolicitation,
                operator,
                operator_register
                } = req.body

            const data = await ServiceFiles.saveFileInMongo(name, file, size, idSolicitation)

            if(res.status(200)){
                await ServiceLogs.createdLog(
                    {
                        level: "info",
                        operator,
                        operator_register,
                        ip: ipClient as string,
                        message: `Operador fez o upload do arquivo ${name}`
                    }
                )
                return res.json(data)
            }
        }catch(err){
            logger.error(`Ocorreu um erro ao fazer o upload do arquivo. - ${err}`)
            return new Error(`${err}`)
        }

    },

    getFileMongo: async(req: Request, res: Response) => {
        try{
            let {id} = req.params
            const data = await ServiceFiles.getFile(id)

            if(res.status(200)){
                return res.json(data)
            }
            return res.json({message: "Não foi possível identificar o documento"})
        }catch(err){
            return new Error(`${err}`)
        }
    },

    getDownloadFile: async(req: Request, res: Response) => {
        const { targetFile, url, operator, register } = req.body
        const ipClient = await IpClient()
        try{
            await donwloadFile(url, targetFile)
            await ServiceLogs.createdLog(
                {
                    level: "info",
                    operator,
                    operator_register: register,
                    ip: ipClient as string,
                    message: `Operador baixou o arquivo ${targetFile}`
                }
            )
            return res.json({})
        }catch(err){
            return new Error(`${err}`)
        }

    }

}

/**
 * Asynchronously downloads a file from a given URL and saves it to a target file.
 * @param {string} url - The URL of the file to download.
 * @param {string} targetFile - The path where the downloaded file will be saved.
 * @returns {Promise<void>} - A promise that resolves when the file is successfully downloaded and saved.
 */
export const donwloadFile = async(url: string, targetFile: string) => {
    return await new Promise((resolve, reject) => {
        // Make a GET request to the specified URL
        https.get(url, response => {
            const code = response.statusCode ?? 0

            // If the response status code is 400 or higher, reject the promise with an error
            if(code >= 400){
                return reject(new Error(response.statusMessage))
            }

            // If the response status code is 300 or higher and there is a 'location' header,
            // recursively call downloadFile with the new URL and the same target file
            if(code > 300 && code < 400 && !!response.headers.location){
                return resolve(
                    donwloadFile(response.headers.location, targetFile)
                )
            }

            // Create a write stream to the target file and pipe the response to it
            const fileWriter = fs.createWriteStream(targetFile).on('finish', () => {
                resolve({})
            })

            response.pipe(fileWriter)
        }).on('error', error => {
            // If there is an error during the request, reject the promise with the error
            reject(error)
        })
    })
}
export default FileController