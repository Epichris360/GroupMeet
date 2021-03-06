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

    $(".toggleModal").on('click', function(e){
        var event = JSON.parse( $(this).attr('data-jsonstr') )
        $("#modalEventName"     ).text(event.name       )
        $("#modalEventDesc"     ).text(event.description)
        $("#modalEventDate"     ).text(event.date       )
        $("#modalEventStartTime").text(event.startTime  )
        $("#modalEventEndTime"  ).text(event.endTime    )
        $("#modalEventAddress"  ).text(event.address    )
        return
    }) 

    
})

$(document).ready(function() {
    $(".deleteEvent").on('click', function(){
        var eventID    = $(this).attr('data-event')
        alertify.confirm("Are You Sure About This? Deletions Are Permenent",
        function(){
            $.ajax({
                url: "/event/delete",
                type: "POST",
                data: { eventID: eventID },
                success: function (res) {            
                    alertify.success('<h5>The Event Was Deleted!!!</h5>') 
                    setInterval(function(){
                        location.reload()
                    }, 1000);

                    return
                },
                error: function(err) {
                   alertify.error('<h5>There Was An Error.'+ err.responseJSON.message +'</h5>')
                   return
                }
            })
        },
        function(){
            alertify.error('<h3>Canceled</h3>')
            return
        })
    })

    $("#leaveBtn").on('click', function(event){
        event.preventDefault()
        alertify.confirm("Are You Sure About Leaving This Group?",
        function(e){
            alertify.success('<h5>You Have Left The Group</h5>') 
            setInterval(function(){
                location.href = $(this).attr('#leaveBtn')
            }, 2000);
        },
        function(e){
            alertify.error('<h3>Your Still In!</h3>')
            return
        })
    })

})

