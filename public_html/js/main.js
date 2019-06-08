

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
            $("#slide_btn").text(decodeEntities("Pr&oacute;ximo")).off().on("click", nextSlide);
            nextSlide();
        };
        
        var nextSlide = function() {
            // check if previous answer was right
            if(curr_slide > 0) {
               if(questions[curr_slide-1].correctAnswer != parseInt($("input[name='radio_choice']:checked").val())) {
                   errors.push(curr_slide-1);
               }
            }
            // Show results and abort if no more questions to ask
            if(curr_slide === questions.length) {
                showResults();
                return;
            }
            // disable 'next' button, for user hasn't selected an answer yet
            $("#slide_btn").addClass("ui-disabled");
            $("#choices").hide();
            $(".question").hide().text(decodeEntities((curr_slide+1) + ". " +questions[curr_slide].question)).fadeIn(2000);
            for(var i = 0; i < questions[curr_slide].choices.length; i++) {
                $("#radio_choice_"+i).attr("checked", false).checkboxradio("refresh");
                $("#label_choice_"+i).text(decodeEntities(questions[curr_slide].choices[i]));
            }
            $("#choices").show(1000).attr("style", "display: flow-root;");
            curr_slide++;
            // rename slide button label if no more questions to ask
            if(curr_slide === questions.length) {
                $("#slide_btn").text("Finalizar");
            }
        };
        
        var showResults = function() {
            var n = questions.length;
            console.log(errors);
            var caption = decodeEntities("Voc&ecirc; acertou "+(n-errors.length)+" das  " + n + " quest&otilde;es");
            $("#results_caption").text(caption);
            popup.popup("open");
            $("#slide_btn").text("Reiniciar").off().on("click", reset);
            if(errors.length == 0) {
                $("#results_links").empty().html($("<div/>", {
                    text: decodeEntities("Parab&eacute;ns!"),
                    class: "congrats"
                }));
                return;
            }
            var list = $("<ul/>", {
                "data-role": "listview",
                "data-inset": true,
                "data-mini": true
            });
            caption = decodeEntities(errors.length == 1 ? "Busque aqui a resposta correta:"
                                                                                   : "Busque aqui as respostas corretas:");
            list.append($("<li/>", {
                "data-role": "list-divider",
                style: "text-align: center;",
                text: caption
            }));
            for(var i = 0; i < errors.length; i++) {
                list.append($("<li/>").append($("<a/>", {
                    href: questions[errors[i]].answerLocation[1],
                    text: decodeEntities(questions[errors[i]].answerLocation[0]),
                    target: "_blank"
                })));
            }
            $("#results_links").empty().append(list.listview());
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








