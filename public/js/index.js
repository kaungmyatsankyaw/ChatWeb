var socket = io();

socket.on('connect', () => {
    console.log('Connect to Server');
});

socket.on('newMail', (data) => {
    console.log(data);
    var li=jQuery('<li></li>');
    li.text(data.from + ':' + data.text );
    $('#messagelist').append(li);
});

socket.on('disconnect', () => {
    console.log('Disconnect from server');
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

jQuery('#sendLocation').on('click',(e)=>{
    e.preventDefault;

    if(!navigator.geolocation){
        return console.log('Geolocation Not Support');
    }
    
    navigator.geolocation.getCurrentPosition((postion)=>{
        console.log(postion);
    },()=>{
        console.log('Cannot Get Location');
    })

});