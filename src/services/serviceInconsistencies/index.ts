import prisma from "../../client";
import { Inconsistency } from "../../interfaces/inconsistency";

const ServiceInconsistencies = {
    createInconsistency: async(data:Inconsistency)=>{
        return await prisma.inconsistency.create({ data })
    },

    findInconsistenciesByIdSolicitation: async(id:string) => {
        const inconsistencies = await prisma.inconsistency.findMany({
            where: {
                solicitationId: Number(id)
            }
        })

        return inconsistencies
    },

    updateInconsistency: async(id:string, data:Inconsistency) => {
        const result = await prisma.inconsistency.update({
            where: {
                id: Number(id)
            },
            data
        })

        return result
    }
}

export default ServiceInconsistencies