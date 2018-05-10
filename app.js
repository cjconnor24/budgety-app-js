
// BUDGET CONTROLLER
var budgetController = (function(){



})();

// UI CONTROLLER
var UIController = (function(){

    // SOME CODE

})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){

    var ctrlAddItem = function(){

          
        // GET VALUES

        // ADD ITEM TO BUDGET CONTROLLER

        // ADD TO UI CONTROLLER

        // CALCUL THE BUDGET

        // DISPLAY THE BUDGET ON THE UI
        console.log("It works.");

    };

    document.querySelector('.add__btn').addEventListener('click',ctrlAddItem);

    document.addEventListener('keypress',function(e){       

        if(e.keyCode === 13 || event.which === 13){
            console.log("Enter was pressed 👍");
            ctrlAddItem();            
        }

    })

})(budgetController, UIController);