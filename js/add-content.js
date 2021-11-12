$(document).ready(function(){
    $("#rowswp").hide();
    $("#colswp").hide();
    $("#table-container").hide();
    $("#save-btn").prop("disabled",true);
    var tabs = $("#tabs").tabs();
    var ul = tabs.find("ul");
    var numTabs = 0;
    var TabLimit = 10;
    var table = '';

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
    $("#rowslider").slider({
        range: true,
        values: [-5,25],
        max: 50,
        min: -50,
        step: 1,
        animate: true,
        stop: function(event, ui) {
            $("#rowmin").val(ui.values[0]);
            $("#rowmax").val(ui.values[1]);
            $("#save-btn").prop("disabled",false);
            generateTable();
        },
        slide: function(event, ui) {
            var nums = $("#rowslider").slider("values");
            $("#rowmin").val(ui.values[0]);
            $("#rowmax").val(ui.values[1]);
            $("#save-btn").prop("disabled",false);
            generateTable();
        }
    });
    /* Reference: https://stackoverflow.com/questions/6131970/jquery-ui-slider-update-value-from-code
    */
    $("#rowmin").change(function(){
        if (iform.valid()){
            $("#rowslider").slider('values',0,$(this).val());
            $("#save-btn").prop("disabled",false);
            generateTable();
        }
    });
    $("#rowmax").change(function(){
        if (iform.valid()){
            $("#rowslider").slider('values',1,$(this).val());
            $("#save-btn").prop("disabled",false);
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
            $("#save-btn").prop("disabled",false);
            generateTable();
        },
        slide: function(event, ui) {
            $("#colmin").val(ui.values[0]);
            $("#colmax").val(ui.values[1]);
            $("#save-btn").prop("disabled",false);
            generateTable();
        }
    });
    /* Reference: https://stackoverflow.com/questions/6131970/jquery-ui-slider-update-value-from-code
    */
    $("#colmin").change(function(){
        if (iform.valid()){
            $("#colslider").slider('values',0,$(this).val());
            $("#save-btn").prop("disabled",false);
            generateTable();
        }
    });
    $("#colmax").change(function(){
        if (iform.valid()) {
            $("#colslider").slider('values',1,$(this).val());
            $("#save-btn").prop("disabled",false);
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

            table = '';
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
                    table += '<td id="innertbl" title="row: '+i+', column: '+j+'">' + i * j + '</td>';
                }
                table += '</tr>';
            }
            $("#table-container").html("<table>" + table + "</table>");
        }
    }
    $("#save-btn").click(function(){
        if (numTabs < TabLimit) {
            ++numTabs;
            var rmin = parseInt($("#rowmin").val());
            var rmax = parseInt($("#rowmax").val());
            var cmin = parseInt($("#colmin").val());
            var cmax = parseInt($("#colmax").val());
            $("div#tabs ul").append("<li><a href='#save"+numTabs+"' id='t"+numTabs+"'> R["+rmin+","+rmax+"] C:["+cmin+","+cmax+"]</a><span class='ui-icon ui-icon-closethick'></span></li>");
            $("div#tabs").append("<div class='saves' id='save"+numTabs+"'><table>"+table+"</table></div>");
            $("div#tabs").tabs("refresh");
        }
    });
    $("#delete-btn").click(function(){
        $("#save1").remove();
        $("#t1").remove();
    });
});