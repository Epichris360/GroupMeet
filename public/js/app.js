$(function(){
    // deals with img uploading
    $("#loading").hide()
    $("#finished").hide()
    var turbo = Turbo({site_id: '5aa97e2937282a001402b4ae'}) // Enter your TURBO_APP_ID here 

    $('#btn-file-select').click(function(event){
        event.preventDefault()
        turbo.uploadFile(function(err, data){ 
            if (err){
                swal(
                    'Oops...',
                    err.message,
                    'error'
                )
                return
            }

            if (data.confirmation != 'success'){
                swal(
                    'Oops...',
                    data.message,
                    'error'
                )
                return
            }

            $("#imagesInput").val(data.result.url)
            $("#groupImg").attr('src', data.result.url)
            swal(
                'Awesome!',
                'The Image was Uploaded!!!!',
                'success'
            )
            $("#finished").show()
            $(".pic-upload").hide()
            return
        })
    })

})
