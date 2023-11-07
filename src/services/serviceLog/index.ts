import prisma from '../../client'
import { SystemLog } from '../../interfaces/systemLog'

const ServiceLogs = {
    //This function creates a new system log.
    createdLog: async(data: SystemLog) => {
        // Create a new system log with the provided data
        const log = await prisma.systemLog.create({
            data: {
                level: data.level,
                operator: data.operator,
                operator_register: data.operator_register,
                ip: data.ip,
                message: data.message,
                // Set the created_at field to the current date and time
                created_at: new Date()
            }
        })
        // Return the newly created system log
        return log
    },
    //Fetches all logs from the system.
    getAllLogs: async() => {
        // Fetch logs from the database
        const logs = await prisma.systemLog.findMany()

        // Return the logs
        return logs
    },

    //Find all logs by client register.
    findAllLogsByClientRegister: async(operator_register: string) => {
         // Use Prisma to find logs with the given operator_register
        const logs = await prisma.systemLog.findMany({
            where: {
                operator_register
            }
        })
        // Return the logs
        return logs
    },
    //Find a log by its ID.
    findOneLogById: async(id: string) => {
        // Use Prisma to find a unique system log by its ID
        const log = await prisma.systemLog.findUnique({
            where: {
                id: Number(id)
            }
        })

        // Return the found log
        return log
    }
}

export default ServiceLogs