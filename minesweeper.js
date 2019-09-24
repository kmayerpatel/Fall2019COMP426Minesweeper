$(document).ready(() => {
    updateBombSlider();
    $("#widthSlider").on('input', () => {updateBombSlider();});
    $("#heightSlider").on('input', () => {updateBombSlider();});
    $("#bombSlider").on('input', () => {updateBombSlider();});

    let minefield = null;
    
    $("#startGame").on('click', () => {
	minefield = new Minefield($("#widthSlider").val(),
				  $("#heightSlider").val(),
				  $("#bombSlider").val());
	
	setupMinefieldView(minefield);
    });

    /* This does not work because div.spot elements will
       not get set up until after start is clicked so at this
       point, there are no matching elements.

    $("div.spot").on('click', (e) => {
	let spot_div = $(e.target);
	let spot = spot_div.data('spot');

	spot_div.removeClass(spot.state);
	spot.reveal();
	spot_div.addClass(spot.state);
    });

    */

    /* This works by using jQuery event delegation. Sets
       up handler at parent element to be automatically installed
       on any children matching select div.spot.
    */
    
    $("#minefield").on('click', 'div.spot', null, (e) => {
	e.preventDefault();
	
	let spot_div = $(e.target);
	let spot = spot_div.data('spot');

	spot_div.removeClass(spot.state);
	if (e.shiftKey) {
	    spot.mark();
	} else {
	    spot.reveal();
	}
	spot_div.addClass(spot.state);
    });

});

let updateBombSlider = () => {
    let field_width = $("#widthSlider").val();
    let field_height = $("#heightSlider").val();
    let max_bombs = field_width * field_height - 1;
    $("#bombSlider").attr("max", max_bombs);
    $("#bombSliderMax").empty().html(max_bombs);
    let bomb_count = $("#bombSlider").val();

    $("#currentWidth").empty().html(field_width);
    $("#currentHeight").empty().html(field_height);
    $("#currentBombCount").empty().html(bomb_count);
};

let setupMinefieldView = (minefield) => {
    let field_div = $("#minefield");

    field_div.empty();

    let field_table = $("<table></table>");

    for (let y=0; y<minefield.height; y++) {
	let row = $("<tr></tr>");
	for (let x=0; x<minefield.width; x++) {
	    let spot_div = $("<div class='spot'></div>");	    
	    let spot = minefield.getSpot(x,y);
	    spot_div.data('spot', spot);
	    
	    spot_div.addClass(spot.state);

	    if (spot.is_bomb) {
		spot_div.append($("<span class='spot_label'>X</span>"));
	    } else if (spot.neighborBombCount() > 0) {
		spot_div.append($("<span class='spot_label'>" + spot.neighborBombCount() + "</span>"));
	    }
	    spot_div.append($("<span class='spot_mark'>O</span>"));
	    
	    row.append($("<td></td>").append(spot_div));
	}
	field_table.append(row);
    }
    field_div.append(field_table);
}
	    
    

