/*
File: add-content.js
GUI Assignment: Creating a functional multiplication table
Raj Vekeria, UMass Lowell Computer Science, rvekeria@cs.uml.edu
Copyright(c) 2021 by Raj. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author
updated by RV on November 18, 2021 at 9:30 AM
*/
$(document).ready(function(){
    // Initial page setup parameters
    $("#rowswp").hide();
    $("#colswp").hide();
    $("#table-container").hide();
    $("#save-btn").prop("disabled",true);
    // Sets up tab functions / properties
    var tabs = $("#tabs").tabs();
    var ul = tabs.find("ul");
    var numTabs = 0;
    var TabLimit = 10;
    var table = '';

    // Initial table values when page is set up
    $("#rowmin").val(-5);
    $("#rowmax").val(25);
    $("#colmin").val(-35);
    $("#colmax").val(5);

    // sets up input form and validation plugin
    // Reference: https://jqueryvalidation.org/valid/
    // Reference: https://jqueryvalidation.org/documentation/
    // Reference: https://jqueryvalidation.org/validate/
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

    // Slider implementation for row values
    // Reference: https://jqueryui.com/slider/
    // Reference: https://jqueryui.com/slider/#range
    $("#rowslider").slider({
        range: true,
        values: [-5,25],
        max: 50,
        min: -50,
        step: 1,
        animate: true,
        start: function(event, ui) {
            if (numTabs >= TabLimit) {
                $("#save-btn").prop("disabled",true);
            }
        },
        slide: function(event, ui) {
            var nums = $("#rowslider").slider("values");
            $("#rowmin").val(ui.values[0]);
            $("#rowmax").val(ui.values[1]);
            if (numTabs >= TabLimit){
                $("#save-btn").prop("disabled",true);
            }
            generateTable();
        },
        stop: function(event, ui){
            if (numTabs >= TabLimit) {
                $("#save-btn").prop("disabled",true);
            }
        }
    });
    // Binds text box value to that of the slider
    // Reference: https://stackoverflow.com/questions/6131970/jquery-ui-slider-update-value-from-code
    $("#rowmin").change(function(){
        if (iform.valid()){
            $("#rowslider").slider('values',0,$(this).val());
            $("#save-btn").prop("disabled",false);
            generateTable();
        }
    });
    // Reference: https://stackoverflow.com/questions/6131970/jquery-ui-slider-update-value-from-code
    $("#rowmax").change(function(){
        if (iform.valid()){
            $("#rowslider").slider('values',1,$(this).val());
            $("#save-btn").prop("disabled",false);
            generateTable();
        }
    });
    // slider implementation for column values
    // Reference: https://jqueryui.com/slider/
    // Reference: https://jqueryui.com/slider/#range
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
            if (numTabs >= TabLimit){
                $("#save-btn").prop("disabled",false);
            }
            generateTable();
        },
        start: function(event, ui) {
            if (numTabs >= TabLimit) {
                $("#save-btn").prop("disabled",true);
            }
        },
        slide: function(event, ui) {
            $("#colmin").val(ui.values[0]);
            $("#colmax").val(ui.values[1]);
            if (numTabs >= TabLimit){
                $("#save-btn").prop("disabled",false);
            }
            generateTable();
        },
        stop: function(event, ui){
            if (numTabs >= TabLimit) {
                $("#save-btn").prop("disabled",true);
            }
        }
    });
    // Reference: https://stackoverflow.com/questions/6131970/jquery-ui-slider-update-value-from-code
    $("#colmin").change(function(){
        if (iform.valid()){
            $("#colslider").slider('values',0,$(this).val());
            $("#save-btn").prop("disabled",false);
            generateTable();
        }
    });
    // Reference: https://stackoverflow.com/questions/6131970/jquery-ui-slider-update-value-from-code
    $("#colmax").change(function(){
        if (iform.valid()) {
            $("#colslider").slider('values',1,$(this).val());
            $("#save-btn").prop("disabled",false);
            generateTable();
        }
    });
    // @Def: Generates tables given from either the textfield or slider input.
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

            // Switches row values if min > max
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
            // Switches column values if min > max
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
    // @Def: Saves table by creating a new tab (if tab limit not reached) and pulls table that is currently
    // built from the generateTable() function
    $("#save-btn").click(function(){
        if (numTabs < TabLimit && iform.valid()) {
            ++numTabs;
            // values pulled from input to create the title for tab
            var rmin = parseInt($("#rowmin").val());
            var rmax = parseInt($("#rowmax").val());
            var cmin = parseInt($("#colmin").val());
            var cmax = parseInt($("#colmax").val());
            $("div#tabs ul").append("<li><a href='#save"+numTabs+"' class='atab'>R["+rmin+","+rmax+"] C:["+cmin+","+cmax+"] </a><span class='ui-icon ui-icon-closethick'></span><input type='checkbox' class='tcheck'></li>");
            $("div#tabs").append("<div class='saves' id='save"+numTabs+"'><div class='tbles'><table>"+table+"</table></div></div>");
            $("div#tabs").tabs("refresh");
            // disable the submit button if the tab limit has been reached
            if (numTabs >= TabLimit)
                $("#save-btn").prop("disabled", true);
        }
    });
    // Reference: https://jqueryui.com/tabs/#manipulation
    // Reference: https://api.jquery.com/remove/
    tabs.on( "click", "span.ui-icon-closethick", function() {
        // statement both removes list element and sets panelId to the name of the destination id
        // Reference: https://jqueryui.com/tabs/#manipulation
        var panelId = $( this ).closest( "li" ).remove().attr("aria-controls");
        $( "#" + panelId ).remove();
        tabs.tabs( "refresh" );
        --numTabs;
        $("#save-btn").prop("disabled", false);
        var alist = document.getElementsByClassName('atab');
        var divlist = document.getElementsByClassName('saves');

        // Reorganizes tab indicies to prevent unexpected behavior
        console.log("alist len: " + alist.length);
        console.log("divlist len: " + divlist.length);

        if (numTabs > 0) {
            // Resetting indicies for each tab
            for (var y = 0; y <= numTabs; y++) {
                var ny = y + 1;
                if (alist[y]) alist[y].href = "#save"+ny;
                if (divlist[y]) divlist[y].id = "save"+ny;
                tabs.tabs("refresh");
            }
        }
    });
    // @Def: deletes one or more tab elements from page. Action also resets all tab indicies to 
    //       prevent unexpected behavior
    $("#delete-btn").click(function(){
        var checkArr = document.querySelectorAll('input[type=checkbox]:checked');
        // Deletes each tab with a checked checkbox
        // Reference: https://developer.mozilla.org/en-US/docs/Web/CSS/:checked
        // Reference: https://api.jquery.com/each/
        $('.tcheck:checkbox:checked').each(function(){
            // statement both removes list element and sets panelId to the name of the destination id
            // Reference: https://jqueryui.com/tabs/#manipulation
            var panelId = $(this).closest("li").remove().attr("aria-controls");
            $("#"+panelId).remove();
            tabs.tabs("refresh");
            --numTabs;
            $("#save-btn").prop("disabled", false);
        });
        // Reorganizes tab indicies to prevent unexpected behavior
        var alist = document.getElementsByClassName('atab');
        var divlist = document.getElementsByClassName('saves');

        if (numTabs > 0) {
            // Resetting indicies for each tab
            for (var y = 0; y <= numTabs; y++) {
                var ny = y + 1;
                if (alist[y]) alist[y].href = "#save"+ny;
                if (divlist[y]) divlist[y].id = "save"+ny;
                tabs.tabs("refresh");
            }
        }
    });
});