var socket = io();


function scrollToBottom() {

    var messages = jQuery('#messagelist');
    var newMessage = messages.children('li:last-child')
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}


socket.on('connect', () => {
    console.log('Connect to Server');
});

//Listen New Message
socket.on('newMail', (data) => {
    var format_time = moment(data.created_at).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: data.text,
        from: data.from,
        created_at: format_time
    });

    $('#messagelist').append(html);
    scrollToBottom();

});

//Listen New Location
socket.on('newLocation', (data) => {
    console.log(data);
    var format_time = moment(data.created_at).format('h:mm a');

    var template = jQuery('#location-template').html();
    var html = Mustache.render(template, {
        text: data.from,
        created_at: format_time,
        lat: data.lat,
        long: data.long,
        url: data.url
    });

    $('#messagelist').append(html);

});

socket.on('disconnect', () => {
    console.log('Disconnect from server');
});

//Send Message
$('#message-form').on('submit', (e) => {
    e.preventDefault();

    socket.emit('createMail', {
        from: 'Client',
        text: $('#message').val()
    }, (data) => {
        console.log('Thanks Client');
    });

});


//Send Location And Emit
jQuery('#send-location').on('click', (e) => {
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