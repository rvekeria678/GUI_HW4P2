$(document).ready(function(){
    $("#rowswp").hide();
    $("#colswp").hide();
    $("#table-container").hide();

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
    $("#rowslider").slider({
        range: true,
        values: [-5,25],
        max: 50,
        min: -50,
        step: 1,
        animate: true,
        slide: function(event, ui) {
            var nums = $("#rowslider").slider("values");
            $("#rowmin").val(ui.values[0]);
            $("#rowmax").val(ui.values[1]);
            something();
        }
    });
    /* Reference: https://stackoverflow.com/questions/6131970/jquery-ui-slider-update-value-from-code
    */
    $("#rowmin").change(function(){
        if (iform.valid())
            $("#rowslider").slider('values',0,$(this).val());
    });
    $("#rowmax").change(function(){
        if (iform.valid())
            $("#rowslider").slider('values',1,$(this).val());
    });

    $("#colslider").slider({
        range: true,
        values: [-35,5],
        max: 50,
        min: -50,
        step: 1,
        animate: true,
        slide: function(event, ui) {
            $("#colmin").val(ui.values[0]);
            $("#colmax").val(ui.values[1]);
            something();
        }
    });
    /* Reference: https://stackoverflow.com/questions/6131970/jquery-ui-slider-update-value-from-code
    */
    $("#colmin").change(function(){
        if (iform.valid())
            $("#colslider").slider('values',0,$(this).val());
    });
    $("#colmax").change(function(){
        if (iform.valid())
            $("#colslider").slider('values',1,$(this).val());
    });

    function something(){
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
            }
            if (cmin > cmax) {
                var temp = cmin;
                cmin = cmax;
                cmax = temp;
                $("#colswp").show();
                $("#colmin").val(cmin);
                $("#colmax").val(cmax);
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
                    table += '<td>' + i * j + '</td>';
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
        $("#rowmin").val("");
        $("#rowmax").val("");
        $("#colmin").val("");
        $("#colmax").val("");
        // Reference: https://jqueryvalidation.org/Validator.resetForm/
        validator.resetForm();
    });
    $("#delete-btn").click(function(){
        // Save button code
    });
});
