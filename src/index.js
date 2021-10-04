const axios = require('axios');
const jsontoxml = require('jsontoxml')

/**
 * Cliente Rest con metodos 
 * (GET, POST, PUT, DELETE)
 */
class ClienteRest {
    /**
     * 
     * @param {any} certificadoRest Certificados para firmar la petición
     * @param {any} options opciones para enviar otros datos (URL log operacional)
     */
    constructor(certificadoRest, options) {
        this.certificadoRest = certificadoRest
        this.options = options
    }
    /**
     * 
     * @param {String} method Uno los cuatro metodos (GET, POST, PUT, DELETE)
     * @param {String} url Esta es la URL del servicio Rest que haremos la petición
     * @param {Any} headers Se envía los headers de la petición 
     * @param {Any} payload Se envia el request del servicio
     * @param {String} serviceName Se envia el nombre del servicio al que se hace la petición
     * @param {Any} payloadParmsCtx Se envia todos los parametros de presentación para el log operacional   
     * @param {Any} logger Se envia el datos para los logs del flujo del código 
     * @returns 
     */
    call = async (method, url, headers, payload, serviceName, payloadParmsCtx, logger) => {
        let response
        switch (method) {
            case 'GET':
                try {
                    response = await axios.get(url, headers)
                } catch (error) {
                    if (error.response) {
                        return response = {
                            code: error.response.status,
                            message: error.response.statusText
                        }
                    } else {
                        throw error
                    }
                }
                break
            case 'POST':
                try {
                    response = await axios.post(url, payload, headers)
                } catch (error) {
                    if (error.response) {
                        return response = {
                            code: error.response.status,
                            message: error.response.statusText
                        }
                    } else {
                        throw error
                    }
                }
                break
            case 'PUT':
                try {
                    response = await axios.put(url, payload, headers)
                } catch (error) {
                    if (error.response) {
                        return response = {
                            code: error.response.status,
                            message: error.response.statusText
                        }
                    } else {
                        throw error
                    }
                }
                break
            case 'DELETE':
                try {
                    response = await axios.delete(url, headers, payload)

                } catch (error) {
                    if (error.response) {
                        return response = {
                            code: error.response.status,
                            message: error.response.statusText
                        }
                    } else {
                        throw error
                    }
                }
                break
            default:
                return 'Método no Encontrado'
        }

        let respuestaLogOperacional

        if (response) {
            let recorte = (response.status).toString().charAt(0)
            if (recorte === '2') {
                try {
                    respuestaLogOperacional = await this.logOperacional(payloadParmsCtx, logger, payload, response.data, serviceName)
                } catch (error) {
                    throw error
                }
            }
            else {
                let respuesta = {
                    status: response.status || 'Sin definir',
                    statusText: response.statusText || 'Ocurrió un error no especificado'
                }
                try {
                    respuestaLogOperacional = await this.logOperacional(payloadParmsCtx, logger, payload, respuesta, serviceName)
                } catch (error) {
                    throw error
                }
            }
        } else {
            response = 'Ne se obtuvo respuesta'
        }
        return response
    }
    /**
     * 
     * @param {Any} ctx Se envia todos los parametros de presentación para el log operacional  
     * @param {Any} logger Se envia el datos para los logs del flujo del código  
     * @param {Any} req Se envía el request de la petición del servicio
     * @param {Any} res Se envía el response del servicio rest al que se hizo la petición
     * @param {String} serviceName Se envia el nombre del servicio Rest al que se hizo la peticón  
     * @returns 
     */
    logOperacional = async (ctx, logger, req, res, serviceName) => {
        const url = this.options.endpoint
        const opData = {
            date: new Date().toISOString(),
            status: 'OK',
        }
        const responseServicio = `<body><response>${jsontoxml(res)}</response></body>`
        const requestServicio = `<body><request>${jsontoxml(req)}</request></body>`

        let respuestaLogOper
        const logRequest = {
            consumer: {
                appConsumer: {
                    canalId: ctx.appConsumer.canalId,
                    id: ctx.appConsumer.id,
                    sessionId: ctx.appConsumer.sessionId,
                    terminalId: ctx.appConsumer.terminalId,
                    transactionId: ctx.appConsumer.transaccionI
                },
                deviceConsumer: {
                    id: ctx.deviceConsumer.id,
                    inactiveInterval: ctx.deviceConsumer.inactiveInterval,
                    ip: ctx.ipAddress,
                    locale: ctx.deviceConsumer.locale,
                    sessionTimeout: ctx.deviceConsumer.sessionTimeout,
                    userAgent: ctx.deviceConsumer.userAgent,
                },
            },
            documento: {
                numero: ctx.documento.numero,
                tipo: ctx.documento.tipo,
            },
            messages: {
                idService: serviceName,
                requestService: requestServicio || 'METODO GET',
                responseService: responseServicio || 'SIN-DATOS',
            },
            operation: {
                operationDate: opData.date,
                statusResponse: {
                    errorDescription: res.statusText || 'OK',
                    httpError: res.status || 200,
                    status: opData.status,
                },
                type: ctx.type,
            },
        }

        try {
            respuestaLogOper = await axios.post(url, logRequest)
        } catch (error) {
            logger.error(`ClienteRest:call:logger error: ${error}`)
            throw (error)
        }
        return respuestaLogOper
    }
}

exports.ClienteRest = ClienteRest

