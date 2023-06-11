$("#addCar").click(function(){
    $.post('./view/addCar.php', 
        function(data){
        $("#modal-content").html(data);
        $('#exampleModal').modal('show');
    });
});