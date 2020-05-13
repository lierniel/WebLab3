let currentX, currentY, currentR, graphic, targetDot, mouseDot, rOptions, xInput, yInput, slider, hiddenR, resultRows, resultTable;

addEventListener("load", function () {

    init();

    setUpTargetDot();

    setUpResultTable();

    setUpForm();

    setUpGraphic();

});

function init(){

    rOptions = document.getElementsByClassName("r-option");

    xInput = document.getElementById('form:x');
    yInput = document.getElementById('form:y');
    hiddenR = document.getElementById('form:r');

    currentX = parseFloat(xInput.value);
    currentY = parseFloat(yInput.value);
    currentR = parseFloat(hiddenR.value);

    graphic = document.getElementById('graphic');
    targetDot = document.getElementById('target-dot');
    mouseDot = document.getElementById('mouse-dot');

    slider = PF('slider');

    resultRows = document.getElementsByClassName('result-row');

    resultTable = document.getElementById('result-table');

}

function setUpTargetDot(){
    if(resultTable.getAttribute("data-last-was-in") === 'true'){
        targetDot.style.fill = 'green';
    }else{
        targetDot.style.fill = 'red';
    }

    moveDotToXYR(currentX, currentY, currentR, targetDot);
}

function setUpResultTable(){
    for (let row of resultRows){

        let resultCell = row.cells[2];
        if (resultCell.innerHTML.split(' ').join('') === 'in'){
            resultCell.style.color = 'green';
        }else{
            resultCell.style.color = 'red';
        }

        row.addEventListener("mouseover", function () {
            targetDot.style.fill = resultCell.style.color;
            moveDotToXYR(this.cells[3].innerHTML, this.cells[4].innerHTML, this.cells[5].innerHTML, targetDot);
        });

        row.addEventListener("mouseout", function (event) {
            if (event.relatedTarget == null || event.relatedTarget.nodeName !== "TD"){
                setUpTargetDot();
            }

        });

    }
}

function setUpForm() {
    for(let option of rOptions){
        option.addEventListener("click", onROptionClick);
        if(option.innerHTML === hiddenR.value){
            option.classList.add("activeR");
        }
    }

    yInput.addEventListener("change", function () {
        currentY =  parseFloat(this.value);
        targetDot.style.fill = 'black';
        moveDotToXYR(currentX,currentY, currentR, targetDot);

    })

}

function setUpGraphic() {
    graphic.addEventListener("click", function (event) {
        onGraphicClick(event);
    });

    graphic.addEventListener("mousemove", function (event) {
        onGraphicMouseMove(event)
    });

    graphic.addEventListener("mouseleave", function () {
        mouseDot.setAttribute('display', 'none')
    });

}

function onROptionClick(){
    for (let curOpt of rOptions){
        curOpt.classList.remove("activeR")
    }
    this.classList.add("activeR");

    hiddenR.value = this.innerHTML;
    currentR = parseFloat(this.innerHTML);
    targetDot.style.fill = 'black';
    moveDotToXYR(currentX, currentY, currentR, targetDot)
}

function onGraphicClick(event){

    let len = parseInt(graphic.getAttribute('width'));
    let cx = event.offsetX;
    let cy = event.offsetY;

    let unit = len/3/currentR;

    currentX = ((cx - len/2)/unit);
    currentY = ((len/2 - cy)/unit);

    xInput.value = currentX.toFixed(2);
    yInput.value = currentY.toFixed(2);

   slider.setValue(xInput.value);

   document.getElementById("form:check").click();
}

function onGraphicMouseMove(event) {
    let len = parseInt(graphic.getAttribute('width'));
    let cx = event.offsetX;
    let cy = event.offsetY;
    let coef = parseInt(graphic.getAttribute('viewBox').split(' ')[3]) / len;
    moveDotToCxCy(cx * coef, cy * coef, mouseDot);
}

function moveDotToCxCy(cx, cy, dot){
    dot.setAttribute('display', 'inline');
    dot.setAttribute('cx', cx);
    dot.setAttribute('cy', cy);
}

function moveDotToXYR(x, y, r, dot){

    if (!isNaN(x) && !isNaN(y) && !isNaN(r)){
        let len = parseInt(graphic.getAttribute('viewBox').split(' ')[3]);
        let unit = len/3/r;

        dot.setAttribute('display', 'inline');
        dot.setAttribute('cx', len/2 + x*unit);
        dot.setAttribute('cy', len/2 - y*unit);
    }
}

function onSliderMove(event, ui){
    targetDot.style.fill = 'black';
    currentX = ui.value;
    moveDotToXYR(ui.value, yInput.value, currentR, targetDot);
}

function refresh(data){
    if(data.status === 'success'){
        init();
        setUpTargetDot();
        setUpForm();
        setUpResultTable();
    }
}