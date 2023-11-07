import prisma from "../../client"

const ServiceOffices = {
    getOffices: async() => {
        return await prisma.notaryOffices.findMany()
    },

    GetOfficeByUF: async(uf:string) => {
        return await prisma.notaryOffices.findMany({
            where:{
                uf
            }
        })
    },

    getOfficeByCity: async(city:string)=>{
        return await prisma.notaryOffices.findMany({
            where:{
                city:{
                    contains: city
                }
            }
        })
    }
    //DON'T USE
    /* createOffices: async(data:NotaryOffices) => {
        return await prisma.notaryOffices.create({data})
    } */
}

export default ServiceOffices