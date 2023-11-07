import { createLogger, transports, format } from 'winston'

const logger = createLogger({
    format: format.combine(
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        format.splat(),
        format.json(),
        format.prettyPrint()
    ),
    transports: [
        new transports.File({
            level:"error",
            filename: `${__dirname}/logs/error_log.log`,
        }),
        new transports.File({
            level:"info",
            filename: `${__dirname}/logs/info_log.log`,
        }),
        new transports.File({
            level:"debug",
            filename: `${__dirname}/logs/debug_log.log`,
        }),
        new transports.File({
            level:"http",
            filename: `${__dirname}/logs/http_log.log`,
        })
    ],
    exitOnError: false
})

export default logger