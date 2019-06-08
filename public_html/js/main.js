

$(function() {
    
    console.log(questions);
    
    var start = function() {
        
        var curr_slide;
        var errors;
        var popup = $("#results_popup").popup();
        $("#results_close").on("click", function() {
            popup.popup("close");
        });
        
        var reset = function() {
            curr_slide = 0;
            errors = [];
            $("#slide_btn").text("Próximo").off().on("click", nextSlide);
            nextSlide();
        };
        
        var nextSlide = function() {
            // check if previous answer was right
            if(curr_slide > 0) {
               if(questions[curr_slide-1].correctAnswer != parseInt($("input[radio_choice]:checked").val())) {
                   errors.push(curr_slide-1);
               }
            }
            // disable 'next' button
            $("#slide_btn").addClass("ui-disabled");
            $("#choices").hide();
            $(".question").hide().text(decodeEntities(questions[curr_slide].question)).fadeIn(2000);
            for(var i = 0; i < questions[curr_slide].choices.length; i++) {
                $("#radio_choice_"+i).attr("checked", false).checkboxradio("refresh");
                $("#label_choice_"+i).text(decodeEntities(questions[curr_slide].choices[i]));
            }
            $("#choices").show(1000);
            curr_slide++;
            if(curr_slide === questions.length)
                endQuiz();
        };
        
        var endQuiz = function() {
            $("#slide_btn").text("Finalizar").off().on("click", showResults);
        };
        
        var showResults = function() {
            var n = questions.length;
            console.log(errors);
            var caption = decodeEntities("Voc&ecirc; acertou "+(n-errors.length)+" dentre  " + n + " quest&otilde;es");
            $("#results_caption").text(caption);
            popup.popup("open");
            $("#slide_btn").text("Reiniciar").off().on("click", reset);
        };
        
        var  decodeEntities = function(string) {
            return $("<textarea/>").html(string).text();
        };

        // attach change listener to radio buttons to enable 'next' button when user selects an option
        $("input[name='radio_choice']").change(function() {
            $("#slide_btn").removeClass("ui-disabled");
        });
        
        $("#slide_btn").off().on("click", reset);
        
    };
    
    start();
            
});








