import File from "../../models/files"

const ServiceFiles = {
    saveFileInMongo: async(name: string, file: string, size: number, idSolicitation: number) => {
        const data = new File({
            name,
            file,
            size,
            idSolicitation,
            createdAt: new Date()
        })
        await data.save()
        return data
    },

    getFile: async(id: string) => {
        console.log(id)
        const data = await File.findOne({ idSolicitation: id }).exec()
        console.log(data)
        return data
    }
}

export default ServiceFiles