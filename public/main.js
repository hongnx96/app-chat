let idChatTwo = '';
let checkChatTwo = false;
let checkRoom = false;
let room = '';
let user = '';

$(document).ready(() => {
    $('#registerChat').show();
    $('#chatMessage').hide();

    $('#listMessageRoom').show();
    $('#listMessageChatTwo').hide();

    $('#formRegister').submit((e) => {
        e.preventDefault();
        //console.log('ok');
        const avatar = $('#selectAvatar').val();
        const name = $('#txtName').val();
        const room = $('#txtRoom').val();
        const messageColor = Math.floor(Math.random()*16777215).toString(16);
        //console.log(avatar);
        if(!name) {
            alert('Name cannot be left blank.');
        }
        if(!avatar) {
            alert('Unselected avatar.');
        }
        if(name && avatar) {
            socket.emit('client:register-user', {
                name, 
                room,
                avatar,
                messageColor
            });
        }
        $('#txtName').val('');
        $('#txtRoom').val('');
        //$('#selectAvatar').val(' ');
    });
    
    $('#btnSendRoom').submit((e) => {
        e.preventDefault();
        const message = $('#txtMsgRoom').val();
        if(checkRoom) {
            socket.emit('client:send-message', message);
        }
        $('#txtMsgRoom').val('');
        $('#txtMsgRoom').blur();
    });

    $('#btnSendChatTwo').submit((e) => {
        e.preventDefault();
        const photo = $('#photo').val();
        //console.log(photo);
        if(photo) {
            console.log('photo');
            const selector = document.getElementById('photo');
            const reader = new FileReader();
            reader.onload = function() {
                const base64 = this.result.replace(/.*base64,/, '');
                console.log(base64);
                socket.emit('client:send-photo-chat-two', {
                    id: idChatTwo,
                    photo: base64
                });
            };
            reader.readAsDataURL(selector.files[0]);
        }
        $('#photo').val('');
        $(this).siblings(".custom-file-label").addClass("selected").html('');
        const message = $('#txtMsgChatTwo').val();
        if(checkChatTwo && message) {
            socket.emit('client:send-message-chat-two', {
                id: idChatTwo,
                message
            });
        }
        $('#txtMsgChatTwo').val('');
        $('#txtMsgChatTwo').blur();
    });

    $('#btnSendRoom').focusin(() => {
        console.log('focus in');
        if(checkRoom) {
            socket.emit('client:i-am-typing-chat-room');
        }
    });

    $('#btnSendRoom').focusout(() => {
        console.log('focus out');
        if(checkRoom) {
            socket.emit('client:i-stopped-typing-chat-room');
        }
    });

    $('#btnSendChatTwo').focusin(() => {
        if(checkChatTwo) {
            socket.emit('client:i-am-typing-chat-two', idChatTwo);
        }
    });

    $('#btnSendChatTwo').focusout(() => {
        if(checkChatTwo) {
            socket.emit('client:i-stopped-typing-chat-two', idChatTwo);
        }
    });


    $(".custom-file-input").on("change", function() {
        const fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
        //console.log(document.getElementById('file').files);
    });

});

function selectedUser(id, name, avatar) {
   // console.log('select user');
    //console.log(id);
    socket.emit('client:join-chat-two-user', {
        id,
        name,
        avatar
    });
}

function selectRoom(room) {
    const name = $('#username').html().trim();
    console.log(name);
    console.log('room select', room);
    const nameColor = Math.floor(Math.random()*16777215).toString(16);
    socket.emit('client:select-room', {
        room,
        nameColor,
        name
    });
}

function logout() {
    $('#registerChat').show();
    $('#chatMessage').hide();

    $('#txtName').val('');
    $('#txtRoom').val('');

    socket.emit('client:user-logout');
}

function chatRoom() {
    
    $('#listMessageRoom').show();
    $('#listMessageChatTwo').hide();

    $('#chatRoom').css('color', 'rgb(15, 146, 221)');
    $('#chatRoom').css('border-bottom', 'solid 2px rgb(15, 146, 221)');
    $('#chatTwo').css('color', 'black');
    $('#chatTwo').css('border-bottom', 'solid 2px black');

    console.log('chat room', room);
    $('#room').html('');
    $('#room').append('<b id="room">Room: </b>');
    $('#currentRoom').html('');
    $('#currentRoom').append(room);
}

function chatTwo() {
    $('#listMessageRoom').hide();
    $('#listMessageChatTwo').show();

    $('#chatRoom').css('color', 'black');
    $('#chatRoom').css('border-bottom', 'solid 2px black');
    $('#chatTwo').css('color', 'rgb(15, 146, 221)');
    $('#chatTwo').css('border-bottom', 'solid 2px rgb(15, 146, 221)');

    $('#room').text('Chatting with: ');
    $('#currentRoom').html('');
    $('#currentRoom').append(user);
}