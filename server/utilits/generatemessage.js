let generatemessage = (from, text) => {
    return {
        from,
        text,
        created_at: new Date().getTime
    }
}

let generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url: 'https://www.google.com/maps?q=' + latitude + ',' + longitude,
        created_at: new Date().getTime
    }
}

module.exports = {
    generatemessage,generateLocationMessage
}