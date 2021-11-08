$(document).ready(function(){
    $("#rowswp").hide();
    $("#colswp").hide();
    $("#table-container").hide();
    $("#save-btn").prop("disabled", true);
    var iform = $("#inputform");
    var validator = $("#inputform").validate({
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
                required: "Please enter an integer for this field!",
                range: "Please make sure to enter a number between -50 and 50!"
            },
            rmax: {
                required: "Please enter an integer for this field!",
                range: "Please make sure to enter a number between -50 and 50!"
            },
            cmin: {
                required: "Please enter an integer for this field!",
                range: "Please make sure to enter a number between -50 and 50!"
            },
            cmax: {
                required: "Please enter an integer for this field!",
                range: "Please make sure to enter a number between -50 and 50!"
            }
        }
    });

    $("#submit-btn").click(function(){
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
    });
    $("#clear-btn").click(function(){
        $("#table-container").hide();
        $("#rowswp").hide();
        $("#colswp").hide();
        $("#rowmin").val("");
        $("#rowmax").val("");
        $("#colmin").val("");
        $("#colmax").val("");
        // Reference: https://jqueryvalidation.org/Validator.resetForm/
        validator.resetForm();
        $("#save-btn").prop("disabled", true);
    });
    $("#save-btn").click(function(){
        // Save button code
    });
});