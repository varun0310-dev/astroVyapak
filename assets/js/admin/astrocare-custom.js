jQuery(document).ready(function($) {
    var mediaUploader;

    $('.astrocare_upload_img_btn').click(function(e) {
        e.preventDefault();
        if (mediaUploader) {
            mediaUploader.open();
            return;
        }

        mediaUploader = wp.media({
            title: 'Upload Image',
            button: {
                text: 'Use this image'
            },
            multiple: false
        });

        mediaUploader.on('select', function() {
            var attachment = mediaUploader.state().get('selection').first().toJSON();
            $('#service_image_url').val(attachment.url);
        });

        mediaUploader.open();
    });
});