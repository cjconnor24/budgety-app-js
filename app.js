
// BUDGET CONTROLLER
var budgetController = (function () {



})();

// UI CONTROLLER
var UIController = (function () {

    // DOMstrings to reduce typing
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn'
    }

    // SOME CODE
    return {
        getInput: function () {

            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }

        },
        getDOMStrings: function () {
            return DOMstrings;
        }
    };

})();

// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {

        // GET DOM CONSTANTS
        var DOM = UICtrl.getDOMStrings();

        // BUTTON EVENT LISTENER
        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

        // KEYPRESS EVENT LISTENER
        document.addEventListener('keypress', function (e) {

            if (e.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }

        });

    };


    var ctrlAddItem = function () {


        // GET VALUES
        var input = UICtrl.getInput();
        console.log(input);

        // ADD ITEM TO BUDGET CONTROLLER

        // ADD TO UI CONTROLLER

        // CALCUL THE BUDGET

        // DISPLAY THE BUDGET ON THE UI
        // console.log("It works.");

    };



})(budgetController, UIController);