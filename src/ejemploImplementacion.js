//TODO: este código se debe implementar dentro de una funcion para hacer la respectiva petición.

const { ClienteRest } = require('libreria-cliente-rest-javascript')
    // TODO: METODO GET
    const url = 'https://jsonplaceholder.typicode.com/todos'

    const headers = {
      headers: {
        'Content-Type': 'application/json',
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      responseType: 'json',
    }

    let respuesta
    const payload1 = {
      medoto: 'GET',
    }

    const serviceNameRest = 'PruebaClienteRestVersionDos'

    const options = {
      endpoint: 'http://localhost:8080/logger/v1/auditoria/operaciones'
    }
    const certificadosRest = {
      private: 'private',
      public: 'public'
    }
    const objeto = new ClienteRest(certificadosRest, options)
    try {

      respuesta = await objeto.call(
        'GET',
        url,
        headers,
        payload1,
        serviceNameRest,
        payload.parms.ctx,
        this.logger
      )
    } catch (error) {
      throw new ServiceError(MBAAS_ERRORS.internal_server_error, error)
    }

    this.logger.info(respuesta.data)

    const dataPost = {
      "body": "quia et suscipithenderit molestiae ut ut quas tunt rem eveniet architecto",
      "title": "sunt aut facere repellat provident t",
      "userId": 1,
    }


    const header1 = {
      headers: {
        'Content-Type': 'application/json',
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    }
    let respuesta1
    try {
      respuesta1 = await objeto.call(
        'POST',
        url,
        header1,
        dataPost,
        serviceNameRest,
        payload.parms.ctx,
        this.logger
      )
    } catch (error) {
      throw new ServiceError(MBAAS_ERRORS.internal_server_error, error)
    }
    this.logger.info(respuesta1.data)

    const dataPut = {
      "body": "quia et suscipithenderit molestiae ut ut quas tunt rem eveniet architecto",
      "title": "sunt aut facere repellat provident t",
      "userId": 1,
    }

    const header2 = {
      headers: {
        'Content-Type': 'application/json',
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    }
    let respuesta2
    try {
      respuesta2 = await objeto.call(
        'PUT',
        `${url}/1`,
        header2,
        dataPut,
        serviceNameRest,
        payload.parms.ctx,
        this.logger
      )
    } catch (error) {
      throw new ServiceError(MBAAS_ERRORS.internal_server_error, error)
    }
    this.logger.info(respuesta2.data)

    const header3 = {
      headers: {
        'Content-Type': 'application/json',
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    }

    const dataDelete = 1
    let respuesta3
    try {
      respuesta3 = await objeto.call(
        'DELETE',
        `${url}/1`,
        header3,
        dataDelete,
        serviceNameRest,
        payload.parms.ctx,
        this.logger
      )
    } catch (error) {
      throw new ServiceError(MBAAS_ERRORS.internal_server_error, error)
    }
    this.logger.info(respuesta3.data)