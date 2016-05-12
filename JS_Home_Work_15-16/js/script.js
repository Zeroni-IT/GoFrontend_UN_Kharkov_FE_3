'use strict';

$(function () {

    var $search_request = $(search_request);

    // search bar on top
    function resizeSearchBar() {
        $('.search')
            .addClass("search-small")
            .removeClass("search");
        $('.logo')
            .addClass("logo-small")
            .removeClass("logo");
        $('p').remove();
        $('fieldset').remove();
    }

    // modal window
    function createModalWindow(request) {
        var $modalContent = (
        '<div class="modal-window">' +
            '<div class="modal-window-content">' +
                '<h3 class="search-request">Не найдено ни одного изображения по запросу <span>' + request + '.</span></h3>' +
                '<div class="recommends">' +
                    '<h4>Рекомендации:</h4>' +
                    '<ul>' +
                        '<li>Убедитесь, что все слова написаны без ошибок.</li>' +
                        '<li>Попробуйте использовать другие ключевые слова.</li>' +
                        '<li>Попробуйте использовать более популярные ключевые слова.</li>' +
                        '<li>Попробуйте уменьшить количество слов в запросе.</li>' +
                    '</ul>' +
                '</div>' +
                '<img src="img/wrong-request.png" alt="wrong request">' +
                '<input type="button" id="tryAgain" class="btn btn-warning center-block" value="Повторить поиск">' +
            '</div>' +
        '</div>');

        $('body').append($modalContent);

        //button try again
        $(tryAgain)
            .focus()
            .on('click', function() {
                $('.modal-window').remove();
                $search_request.select();
            });
    };

    // get images from server API
    function getImages() {
        $search_request.select();
        $('.container').remove();

        resizeSearchBar();

        var $container = ('<div class="container"></div>');
        $('.wrapper').append($container);

        var $search_request_value = $search_request.val();

        $.ajax({
            url: 'http://api.riffsy.com/v1/search',
            data: {
                limit: 32,
                tag: $search_request_value,
            },
            dataType: 'json',
            success: function (data) {
                if (data.results.length !=0) {
                    $.each(data.results, function (i, val) {
                        var $image = ('<img class="image_container" src="' + val.itemurl + '" title="' + val.title + '" alt="image">');
                        $('.container').append($image);
                    })
                } else {
                    createModalWindow($search_request_value);
                }
            }
        });
    }

    // search bar
    $search_request.keypress(function (e) {
        if (e.which == 13) {
            getImages();
            return false;
        }
    });

    $search_request.on('click', function(){
        $(this).select();
    });

    // button find
    $(checkResults).on('click', getImages);


    // PROTOTYPES
    function Human() {
        this.name = 'Adam';
        this.age = 30;
        this.gender = 'male';
        this.height = 160;
        this.weight = 70;
    };

    function Worker() {
        this.workPlace = 'EPAM';
        this.salary = 1000;
        this.skills = function () {
            return 'hard working';
        }
    };

    function Student () {
        this.studyPlace = 'GoIT';
        this.grants = 100;
        this.skills = function () {
            return 'watching TV Series';
        }
    }

    Worker.prototype = new Human();
    Student.prototype = new Human();

    var frontEndDeveloper = new Worker();
    frontEndDeveloper.name = 'Jessica';
    frontEndDeveloper.gender = 'female';
    console.log(
        'Worker name: ' + frontEndDeveloper.name + '\n' +
        'Gender: ' + frontEndDeveloper.gender + '\n' +
        'Age: ' + frontEndDeveloper.age + '\n' +
        'Skills: ' + frontEndDeveloper.skills()
    );

    var studentFirstCourse = new Student();
    studentFirstCourse.age = 20;
    console.log(
        'Student name: ' + studentFirstCourse.name + '\n' +
        'Gender: ' + studentFirstCourse.gender + '\n' +
        'Age: ' + studentFirstCourse.age + '\n' +
        'Skills: ' + studentFirstCourse.skills()
    );

});