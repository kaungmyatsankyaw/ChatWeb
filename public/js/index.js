var socket = io();

socket.on('connect', () => {
    console.log('Connect to Server');
});

//Listen New Message
socket.on('newMail', (data) => {
    console.log(data);
    var li = jQuery('<li></li>');
    li.text(data.from + ':' + data.text);
    $('#messagelist').append(li);
});

//Listen New Location
socket.on('newLocation', (data) => {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Location</a>');
    li.text(data.from);
    a.attr('href', data.url);
    li.append(a);
    $('#messagelist').append(li);
});

socket.on('disconnect', () => {
    console.log('Disconnect from server');
});

//Send Message
$('#message_form').on('submit', (e) => {
    e.preventDefault();

    socket.emit('createMail', {
        from: 'Client',
        text: $('#message').val()
    }, (data) => {
        console.log('Thanks Client');
    });

});


//Send Location And Emit
jQuery('#sendLocation').on('click', (e) => {
    e.preventDefault;

    if (!navigator.geolocation) {
        return console.log('Geolocation Not Support');
    }

    navigator.geolocation.getCurrentPosition((position) => {
        // console.log(postion);
        socket.emit('sendLocation', {
            lat: position.coords.latitude,
            lang: position.coords.longitude
        });
    }, () => {
        console.log('Cannot Get Location');
    })

});