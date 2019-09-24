$(document).ready(() => {
    updateBombSlider();
    $("#widthSlider").on('input', () => {updateBombSlider();});
    $("#heightSlider").on('input', () => {updateBombSlider();});
    $("#bombSlider").on('input', () => {updateBombSlider();});
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

