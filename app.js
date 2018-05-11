
// BUDGET CONTROLLER
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

    return {
        addItem: function (type, desc, val) {

            var newItem, ID;

            // CREATE NEW IDEA
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id++;
            } else {
                ID = 0;
            }

            // CREATE NEW ITEM
            if (type === 'exp') {
                newItem = new Expense(ID, desc, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, desc, val);
            }

            // PUSH IT TO ARRAY AND RETURN
            data.allItems[type].push(newItem);
            return newItem;
        },
        testing: function () {
            console.log(data);
        }
    }

})();

// UI CONTROLLER
var UIController = (function () {

    // DOMstrings to reduce typing
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
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
        addListItem: function (obj, type) {

            var html, parsedHTML, element;

            // CREATE PLACEHOLDER STIRNG
            if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">%percentage%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // CREATE THE NEW PARSED STRING
            parsedHTML = html.replace('%id%',obj.id)
            .replace('%description%',obj.description)
            .replace('%value%',obj.value);

            // INSERT INTO THE DOM
            document.querySelector(element).insertAdjacentHTML('beforeend',parsedHTML);

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

        // ADD ITEM TO BUDGET CONTROLLER
        var newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        UICtrl.addListItem(newItem,input.type);

        // ADD TO UI CONTROLLER

        // CALCUL THE BUDGET

        // DISPLAY THE BUDGET ON THE UI
        // console.log("It works.");

    };

    return {
        init: function () {
            console.log("THE APPLICATION HAS STARTED");
            setupEventListeners();
        }
    }



})(budgetController, UIController);

// INITIALIZE THE APP
controller.init();