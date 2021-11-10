$(document).ready(function(){
    $("#rowswp").hide();
    $("#colswp").hide();
    $("#table-container").hide();

    $("#rowmin").val(-5);
    $("#rowmax").val(25);
    $("#colmin").val(-35);
    $("#colmax").val(5);

    var iform = $("#inputform");
    var validator = $("#inputform").validate({
        errorPlacement: function(error, element) {
            if (element.attr("name") == "rmin")
                error.appendTo("#rowcontainer");
            if (element.attr("name") == "rmax")
                error.appendTo("#rowcontainer");
            if (element.attr("name") == "cmin")
                error.appendTo("#colcontainer");
            if (element.attr("name") == "cmax")
                error.appendTo("#colcontainer");
        },
        rules: {
            rmin: {
                required: true,
                range: [-50,50], 
            },
            rmax: {
                required: true,
                range: [-50,50],
            },
            cmin: {
                required: true,
                range: [-50,50]
            },
            cmax: {
                required: true,
                range: [-50,50]
            }
        },
        messages: {
            rmin: {
                required: "Please enter an integer for the minimum field!",
                range: "Please make sure the minimum is between -50 and 50!"
            },
            rmax: {
                required: "Please enter an integer for the maximum field!",
                range: "Please make sure the maximum is between -50 and 50!"
            },
            cmin: {
                required: "Please enter an integer for the minimum field!",
                range: "Please make sure the maximum is between -50 and 50!"
            },
            cmax: {
                required: "Please enter an integer for the maximum field!",
                range: "Please make sure the maximum is between -50 and 50!"
            }
        }
    });

    $("#tabs").tabs();

    $("#rowslider").slider({
        range: true,
        values: [-5,25],
        max: 50,
        min: -50,
        step: 1,
        animate: true,
        start: function(event, ui) {
            $("#rowmin").val(ui.values[0]);
            $("#rowmax").val(ui.values[1]);
            generateTable();
        },
        slide: function(event, ui) {
            var nums = $("#rowslider").slider("values");
            $("#rowmin").val(ui.values[0]);
            $("#rowmax").val(ui.values[1]);
            generateTable();
        }
    });
    /* Reference: https://stackoverflow.com/questions/6131970/jquery-ui-slider-update-value-from-code
    */
    $("#rowmin").change(function(){
        if (iform.valid()){
            $("#rowslider").slider('values',0,$(this).val());
            generateTable();
        }
    });
    $("#rowmax").change(function(){
        if (iform.valid()){
            $("#rowslider").slider('values',1,$(this).val());
            generateTable();
        }
    });

    $("#colslider").slider({
        range: true,
        values: [-35,5],
        max: 50,
        min: -50,
        step: 1,
        animate: true,
        start: function(event, ui) {
            $("#colmin").val(ui.values[0]);
            $("#colmax").val(ui.values[1]);
            generateTable();
        },
        slide: function(event, ui) {
            $("#colmin").val(ui.values[0]);
            $("#colmax").val(ui.values[1]);
            generateTable();
        }
    });
    /* Reference: https://stackoverflow.com/questions/6131970/jquery-ui-slider-update-value-from-code
    */
    $("#colmin").change(function(){
        if (iform.valid()){
            $("#colslider").slider('values',0,$(this).val());
            generateTable();
        }
    });
    $("#colmax").change(function(){
        if (iform.valid()) {
            $("#colslider").slider('values',1,$(this).val());
            generateTable();
        }
    });

    function generateTable(){
        if (iform.valid()) {
            $("#table-container").show();
            $("#rowswp").hide();
            $("#colswp").hide();
            $("#clear-btn").prop("disabled", false);
            $("#save-btn").prop("disabled", false);

            var rmin = parseInt($("#rowmin").val());
            var rmax = parseInt($("#rowmax").val());
            var cmin = parseInt($("#colmin").val());
            var cmax = parseInt($("#colmax").val());

            if (rmin > rmax) {
                var temp = rmin;
                rmin = rmax;
                rmax = temp;
                $("#rowswp").show();
                $("#rowmin").val(rmin);
                $("#rowmax").val(rmax);
                $("#rowslider").slider('values',0,rmin);
                $("#rowslider").slider('values',1,rmax);
            }
            if (cmin > cmax) {
                var temp = cmin;
                cmin = cmax;
                cmax = temp;
                $("#colswp").show();
                $("#colmin").val(cmin);
                $("#colmax").val(cmax);
                $("#colslider").slider('values',0,cmin);
                $("#colslider").slider('values',1,cmax);
            }

            var table = '';
            var y = rmin;

            var check = 0;

            table += '<tr>' + '<td>' + ' ' + '</td>';                       
            for (var x = cmin; x <= cmax; ++x) {
                table += '<td>' + x + '</td>';
            }
            table += '</tr>';

            for (var i = rmin; i <= rmax; i++) {
                table += '<tr>';
                table += '<td>' + y + '</td>';
                ++y;
                ++check;
                for (var j = cmin; j <= cmax; j++) {
                    table += '<td id="innertbl">' + i * j + '</td>';
                }
                table += '</tr>';
            }
            $("#table-container").html("<table>" + table + "</table>");
        }
    }
    $("#reset-btn").click(function(){
        $("#table-container").hide();
        $("#rowswp").hide();
        $("#colswp").hide();
        $("#rowmin").val(0);
        $("#rowmax").val(0);
        $("#colmin").val(0);
        $("#colmax").val(0);
        // Reference: https://jqueryvalidation.org/Validator.resetForm/
        //validator.resetForm();
        generateTable();
    });
    $("#delete-btn").click(function(){
        // Save button code
    });
});