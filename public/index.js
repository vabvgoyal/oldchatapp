$(document).ready(function() {


    var pusher = new Pusher('413994ec46997dd4bd48', {
        cluster: 'ap2',
        encrypted: false
    });

    var channel = pusher.subscribe('public-chat');
    channel.bind('message-added', onMessageAdded);

    $('#btn-chat').click(function() {
        const message = $("#message").val();
        $("#message").val("");

        //send message
        $.post("http://localhost:5000/message", { message });
    });

    function onMessageAdded(data) {
        let template = $("#new-message").html();
        template = template.replace("{{body}}", data.message);

        $(".chat").append(template);
    }
});