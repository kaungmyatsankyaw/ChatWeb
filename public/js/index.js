var socket = io();

socket.on('connect', () => {
    console.log('Connect to Server');
});

socket.on('disconnect', () => {
    console.log('Disconnect from server');
});

socket.on('newMail', function (message) {
    console.log('newMail', message);
});



$('#message_form').on('submit', (e) => {
    e.preventDefault();

    socket.emit('createMail', {
        from: 'Client',
        text: $('#message').val()
    }, (data) => {
        console.log('Thanks Client');
    });

});