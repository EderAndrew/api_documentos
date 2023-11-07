import prisma from "../../client"
import { Solicitation } from "../../interfaces/solicitation";

const ServiceSolicitation = {
    //This function retrieves all solicitations from the database.
    getAllSolicitations: async () => {
        // Fetch all solicitations from the database
        return await prisma.solicitation.findMany();
    },

    getSolicitation: async(id: string) => {
        const result = await prisma.solicitation.findUnique({
            where:{
                id: Number(id)
            }
        })
        return result
    },

    createSolicitation: async(data:Solicitation) => {
        return await prisma.solicitation.create({ data })
    },

    updateSolicitation: async(id:string, data:Solicitation) => {
        const result = await prisma.solicitation.update({
            where:{
                id: Number(id)
            },
            data
        })

        return result
    },

    filterSolicitationsByDatesRequests: async(initial_date: string, final_date: string) => {
        const data = await prisma.solicitation.findMany({
            where:{
                request_date: {
                    gte: initial_date,
                    lte: final_date
                }
            }
        })

        return data
    }
}

export default ServiceSolicitation