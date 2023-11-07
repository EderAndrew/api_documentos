import dotenv from 'dotenv'
import app from './app'

dotenv.config()

app.listen(process.env.PORT_SERVER, () => {
    console.log(`Server running on port ${process.env.PORT_SERVER}`)
})