const socket = io();

socket.on('server:register-success', (data) => {
    $('#registerChat').hide();
    $('#chatMessage').show();

    $('#username').html('');
    $('#username').append(data.name);

    if(data.room) {
        checkRoom = true;
        $('#currentRoom').html('');
        $('#currentRoom').append(data.room);
        room = data.room;
    }
});

socket.on('server:notification-user-exist', (data) => {
    alert(data);
});

socket.on('server:list-all', (data) => {
    //console.log(data);
    
    $('#numberOnline').html('');
    $('#numberOnline').append(data.numberOnline);
    $('#listRoom').html('');
    data.rooms.map((room, i) => {
        $('#listRoom').append(`
            <div class="text-danger" id="room${i}" onclick="selectRoom('${room}')">
                <h6 class="parent_room">&nbsp;${room}</h6>
            </div>
        `);
        for(j = 0; j < data.users.length; j++) {
            if(room === data.users[j].room) {
                $(`#room${i}`).append(`
                    <div class="child_room" onclick="selectedUser('${data.users[j].id}', '${data.users[j].name}', '${data.users[j].avatar}');event.cancelBubble=true;">
                        &nbsp;&nbsp;&nbsp;${data.users[j].name}&nbsp;<i class="fas fa-circle"></i>
                    </div>
                `);
            }
        }
    });

    $('#numberOnline').html('');
    $('#numberOnline').append(data.numberOnline);
    $('#listUser').html('');
    // console.log('filter', data.users);
    const username = document.getElementById('username').innerHTML;
    let users = data.users.filter(user => user.name !== username);
    users.map((user) => {
        $('#listUser').append(`
            <li class="nav-item">
                <a class="nav-link pb-0 pt-0" onclick="selectedUser('${user.id}','${user.name}', '${user.avatar}')">
                    <span class="name">${user.name}</span>&nbsp;<i class="fas fa-circle icon"></i>
                </a>
            </li>
        `);
        
    });
});

socket.on('server:send-message', (data) => {
    //console.log('server send msg', data);
    $('#boxMessageRoom').append(
        '<div> ' +
        '<div class="d-inline-block">' + '<img class="avatar" src="avatars/' + data.avatar +'"' + '></img>' + '</div> ' +
        '<div' + ' style="color: #' + data.messageColor + ';"' + '  class="d-inline-block message_room">' + data.data + '</div> ' +
        '<div class="d-inline-block time">' + data.timeCurrent + '</div> ' +
        '</div>'
    );
});

socket.on('server:join-chat-two-user-success', (data) => {
    idChatTwo = data.id;
    checkChatTwo = true;
    user = data.name;
    $('#room').text('Chatting with: ');
    $('#currentRoom').html('');
    $('#currentRoom').append(data.name);

    $('#chatRoom').css('color', 'black');
    $('#chatRoom').css('border-bottom', 'solid 2px black');
    $('#chatTwo').css('color', 'rgb(15, 146, 221)');
    $('#chatTwo').css('border-bottom', 'solid 2px rgb(15, 146, 221)');

    $('#listMessageRoom').hide();
    $('#listMessageChatTwo').show();
});

socket.on('server:accept-chat-two', (data) => {
    idChatTwo = data.id;
    checkChatTwo = true;
    user = data.name;
    $('#room').text('Chatting with: ');
    $('#currentRoom').html('');
    $('#currentRoom').append(data.name);

    $('#chatRoom').css('color', 'black');
    $('#chatRoom').css('border-bottom', 'solid 2px black');
    $('#chatTwo').css('color', 'rgb(15, 146, 221)');
    $('#chatTwo').css('border-bottom', 'solid 2px rgb(15, 146, 221)');

    $('#listMessageRoom').hide();
    $('#listMessageChatTwo').show();
});

socket.on('server:send-message-chat-two', (data) => {
    //console.log(data.name);
    const name = document.getElementById('username').innerText;
    //console.log('name client', name);
    if(name === data.name) {
        $('#boxMessageChatTwo').append(
            '<div class="message animate__animated animate__fadeInUp"> ' +
            '<div class="d-inline-block">' + '<img class="avatar_chat_two" src="avatars/' + data.avatar +'"' + '></img>' + '</div> ' +
                '<div class="d-inline-block message_chat_two_left">' + data.message + '</div> ' +
                '<div class="d-inline-block time">' + data.time + '</div> ' +
            '</div>'
        );
    } else {
        $('#boxMessageChatTwo').append(
            '<div class="message animate__animated animate__fadeInUp parent_message_chat_two"> ' +
                '<div class="d-inline-block time">' + data.time + '</div> ' +
                '<div class="d-inline-block message_chat_two_right">' + data.message + '</div> ' +
                '<div class="d-inline-block">' + '<img class="avatar_chat_two" src="avatars/' + data.avatar +'"' + '></img>' + '</div> ' +
            '</div>'
        );
    }
    
});

socket.on('server:i-am-typing-chat-two', (name) => {
    const username = document.getElementById('username').innerText;
    if(name === username) {
        $('#listMessageChatTwo').append(
            '<div class="message animate__animated animate__fadeInUp"' + ' id="' + name + '"' + '>' +
                '<div class="d-inline-block type">'  + name + ' is typing...</div> ' +
            '</div>'
        );
    } else {
        $('#listMessageChatTwo').append(
            '<div class="message animate__animated animate__fadeInUp parent_type_right"' + ' id="' + name + '"' + '>' +
                '<div class="d-inline-block type">' + name + ' is typing...</div> ' +
            '</div>'
        );
    }
});

socket.on('server:i-stopped-typing-chat-two', (name) => {
    $(`#${name}`).remove();
});

socket.on('server:i-am-typing-chat-room', (name) => {
    //console.log('typing', name);
    $('#listMessageRoom').append(
        '<div class="message animate__animated animate__fadeInUp"' + ' id="chat' + name + '"' + '>' +
            '<div class="d-inline-block type">'  + name + ' is typing...</div> ' +
        '</div>'
    );
});

socket.on('server:i-stopped-typing-chat-room', (name) => {
    $(`#chat${name}`).remove();
});

socket.on('server:select-room-success', (currentRoom) => {
    checkRoom = true;
    room = currentRoom;

    $('#chatRoom').css('color', 'rgb(15, 146, 221)');
    $('#chatRoom').css('border-bottom', 'solid 2px rgb(15, 146, 221)');
    $('#chatTwo').css('color', 'black');
    $('#chatTwo').css('border-bottom', 'solid 2px black');

    $('#currentRoom').html('');
    $('#currentRoom').append(currentRoom);
    $('#room').html('');
    $('#room').append('<b id="room">Room: </b>');
});


socket.on('server:send-photo-chat-two', (data) => {
    console.log('photo data', data);
    const name = document.getElementById('username').innerText;
    //console.log('name client', name);
    if(name === data.name) {
        $('#boxMessageChatTwo').append(
            '<div class="animate__animated animate__fadeInUp"> ' +
                '<div class="d-inline-block">' + '<img class="avatar_chat_two" src="avatars/' + data.avatar +'"' + '></img>' + '</div> ' +
                '<div class="d-inline-block">' + '<img class="photo" src="data:image/jpg;base64,' + data.photo + '"' + '></img>' + '</div> ' +
                '<div class="d-inline-block time">' + data.time + '</div> ' +
            '</div>'
        );
    } else {
        $('#boxMessageChatTwo').append(
            '<div class="animate__animated animate__fadeInUp parent_message_chat_two"> ' +
                '<div class="d-inline-block time">' + data.time + '</div> ' +
                '<div class="d-inline-block">' + '<img class="photo" src="data:image/jpg;base64,' + data.photo + '"' + '></img>' + '</div> ' +
                '<div class="d-inline-block">' + '<img class="avatar_chat_two" src="avatars/' + data.avatar +'"' + '></img>' + '</div> ' +
            '</div>'
        );
    }
});