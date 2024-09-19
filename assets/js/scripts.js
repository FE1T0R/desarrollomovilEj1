// Declaración de la función inicial de carga
$(document).ready(function () {
    getCharacters();
});

function getCharacters() {
    $.ajax({
        url: 'https://rickandmortyapi.com/api/character',
        type: "get",
        dataType: "json",

        success: function (data) {
            $("#mycounter").attr("style","color: blue");
            $("#mycounter").attr("data-purecounter-end",data.info.pages);
            var characters = data;
            $.each(characters.results, function (index, character) {
                $("#divAllChar").append(uniqueCharacter(character));
            });
        }
    });
}

$("#characterButton").on("click", function () {
    $("#divAllChar").html("");
    searchCharacters();
});

function searchCharacters() {
    $.ajax({
        url: 'https://rickandmortyapi.com/api/character/',
        type: "get",
        dataType: "json",
        data:{
            name: $("#characterInput").val()
        },
        success: function (data) {
            var characters = data;
            $.each(characters.results, function (index, character) {
                $("#divAllChar").append(uniqueCharacter(character));
            });
        }
    });
    $("#characterInput").val("");
}


$("#divAllChar").on("click", ".info", function () {
    $.ajax({
        url: 'https://rickandmortyapi.com/api/character/' + $(this).data("id"),
        type: "get",
        dataType: "json",
        success: function (data) {
            $(".modal-body").html(
                '<div class="col-xl-12" >'
                    + '<div class="member">'
                        + '<div class="pic  align-items-center align-content-center text-center"><img src="' + data.image + '" class="figure-img" alt=""></div>'
                            + '<div class="member-info text-center">'
                                + '<h1><span style="color:#0b5ed7">' + data.name + '</span></h1>'
                                + '<h3>Status: <span style="color:#0b5ed7">' + data.status + '</span></h3>'
                                + '<h3>Species: <span style="color:#0b5ed7">' + data.species + '</span></h3>'
                                + '<h3>Origin: <span style="color:#0b5ed7">' + data.origin.name + '</span></h3>'
                                + '<h3>Gender: <span style="color:#0b5ed7">' + data.gender + '</span></h3>'
                            + '</div>'
                        + '</div>'
                + '</div>');
        }
    });
});


function uniqueCharacter(data) {

    return '<div class="col-xl-3 col-lg-4 col-md-6" data-aos="fade-up">'
        + '<div class="member">'
        + '<div class="pic"><img src=' + data.image + ' class="img-fluid" alt=""></div>'
        + '<div class="member-info">'
        + '<h4>' + data.name + '</h4>'
        + '<a href="#"  type="button" class="font-primary form-control-color info" data-toggle="modal" data-target="#exampleModal" data-id=' + data.id
        + '><span style="color:white"> Más...</span></a>'
        + '</div>'
        + '</div>'
        + '</div>'
}

