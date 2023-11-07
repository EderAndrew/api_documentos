import express, { ErrorRequestHandler } from 'express'
import passport from 'passport'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './routes/api'
import bodyParser from 'body-parser'
import main from './config/mongodb'
import swaggerUi from 'swagger-ui-express'
import swaggerdocs from './swagger.json'

dotenv.config()

const server = express()
server.use(cors({
    allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "X-Access-Token",
    ],
    origin: "*",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

server.use(express.static(path.join(__dirname, '../public')))
server.use(express.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: false}))
server.use("/api-docs", swaggerUi.serve,  swaggerUi.setup(swaggerdocs))


server.use(passport.initialize())

server.use('/api/V1', router)


server.use((req, res)=>{
    res.status(404)
    res.json({error: 'Endpoint not found.'})
})

const errorHandler: ErrorRequestHandler = (err, req, res, next)=>{
    // Set the response status code.
    res.status(err.status ? err.status : 400)
    // Set the response body.
    res.json(err.message ? {message: err.message} : {error: "Ocorreu algum erro."})

}

server.use(errorHandler)
server.use(main)

export default server