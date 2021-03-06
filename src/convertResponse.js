import { GET_LIST, DELETE_MANY, GET_MANY_REFERENCE, CREATE } from './const'

/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The data request params, depending on the type
 * @returns {Object} Data response
 */
const convertResponse = (response, type, resource, params) => {
  const { json } = response

  switch (type) {
    case GET_LIST:
    case GET_MANY_REFERENCE:
      return {
        data: json.rows,
        total: json.rows.length
        // TODO pagination info if any ???
      }
    case CREATE:
      return { data: { ...params.data, id: json.id } }

    case DELETE_MANY:
      return { data: json || [] }

    default:
      return { data: json }
  }
}

module.exports = {
  convertResponse
}
