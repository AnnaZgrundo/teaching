(function($) {
    $(function() {

        $('.send-request').on('click', function () {
            sendRequest($(this).closest('form').serialize());
        });

        function sendRequest(data) {
            $.ajax({
                url: '/request',
                method: 'POST',
                data: data,
                dataType: 'json',
                success: function (response) {
                    if (response.success) {
                        alert(response.message);
                    }
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }
    })
})(jQuery);

