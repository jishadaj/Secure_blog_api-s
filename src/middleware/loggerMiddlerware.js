const loggerMiddleware = async (req, res, next) => {
    const timestamps = new Date().toISOString()
    const method = req.method
    const url = req.originalUrl

    console.log(`[${timestamps}] ${method} ${url}`)
    next()
}

export default loggerMiddleware