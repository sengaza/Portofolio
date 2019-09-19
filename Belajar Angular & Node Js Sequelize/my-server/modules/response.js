var response = function() {}

response.messagge = function(code, message, data) {
    return {
        code: code,
        message: message,
        data: data
    }
}

response.success = function(data) {
    return response.messagge(0, null, data)
}

response.error = function(code, message) {
    return response.messagge(code, message, null)
}

module.exports = response