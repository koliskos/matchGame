var flipNum = 1; //keeps track of how many flips have taken place
var firstFlip; //keeps track of the id of the first image
var numTries = 0;
var numMatches = 0;
 
 shuffleImages();

 function showImage(cellNum) {
     cellID = '#'+(cellNum);
    $(cellID).attr("src", getImage(cellNum));
 }

 /** hideImage() changes a cell back to the blank image after showImage() is called. 
 * Should change the SRC attribute for the image with the given ID back to the blank.jpg image.
 * @param {string} cellNum - id for the hidden <img> element associated with the cell that the user clicked. 
*/
function hideImage(cellNum) {
    let imgUnderneath = getImage(cellNum);
    let cellID = "#"+cellNum;
    $(cellID).attr("src","blank.jpg");//change source back to blank.jpg 
    console.log("cell chosen is back to blank");
}

function processClick(currentID) {
    'use strict';
    let ms1 = "Not a match!";
    let ms2 = "You found a match!";
    let ms3 = "";
    if (flipNum==1){ //if on first flip
        showImage(currentID);
        firstFlip=currentID;
        flipNum=2;
    }
    else{ //if on second flip
        var firIm = getImage(firstFlip);
        var secIm = getImage(currentID);
        showImage(currentID); //reveal the hidden image
        numTries +=1;
        $("#tries").text(numTries);

        if(firIm==secIm){ //if second IS a match to first
                numMatches +=1;
                $("#matches").text(numMatches);
                $("#msg").text(ms2); 
                setTimeout( function () { 
                $("#msg").text(ms3);
                }, 1000);
                flipNum = 1;
                if (numMatches ==8){
                    $("#msg").text("Last match made! Congratulations on completing the game!");
                }  
        }
        else{ //if second is not a match to first
            
            $("#msg").text(ms1);
            setTimeout( function () { 
            hideImage(currentID); 
            hideImage(firstFlip); 
            $("#msg").text(ms3);
            window.flipNum=1;}, 1000); //change source back to blank.jpg AFTER 1 SECOND
            
          }
        
    }
 }

  /**
  * getCellArray()
  * @returns array of cells
  */
 function getCellArray() {
    'use strict';
    let children = document.getElementById('board').querySelectorAll('*');
    var cellArray = [].slice.call(children);
    return cellArray;
 }

 /**
  * getID gets id of cell
  * @param cellImage 
  */
 function getID(cellImage){
    var imgID = cellImage.getAttribute('id');
    return imgID;
 }

 /**
 * addCellClickHandler adds a click handler to the cell that is clicked and carries out processClick on the cell clicked.
 * used in the initialize events function
 * @param {string} cellNum the id of the cell clicked
 * @param {number} index - index of element in array
 */
function addCellClickHandler(cellNum) {
    'use strict';
    
    cellNum.addEventListener('click', function (event) {
        
        event.preventDefault();
        let imgID = getID(cellNum);
        processClick(imgID);  
    });
  }

function startNewGame() {
    shuffleImages();
    // initializeEvents();
    flipNum = 1;
    numTries = 0;
    $("#tries").text(numTries);
    numMatches = 0;
    $("#matches").text(numMatches);
    // hideImage("cell1");
    var i = getCellArray();
    i.forEach(function(j){hideImage($(j).attr("id"))});
}
$("#startNewGameButton").click(startNewGame);
  /* sets everything up, by getting all the thumbnails and adding an 
 * event handler to each one. */

function initializeEvents() {
    'use strict';
    let cells = getCellArray();
    cells.forEach(
        addCellClickHandler);
   
}
initializeEvents();
