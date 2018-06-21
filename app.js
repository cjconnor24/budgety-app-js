
// BUDGET CONTROLLER
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calculatePercentage = function (totalIncome) {

        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }

    };

    Expense.prototype.getPercentage = function () {
        return this.percentage;
    };


    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function (type) {

        var total = 0;

        data.allItems[type].forEach(function (val) {
            total += val.value;
        })

        data.totals[type] = total;

    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    }

    return {
        addItem: function (type, desc, val) {

            var newItem, ID;

            // CREATE NEW IDEA
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // CREATE NEW ITEM
            if (type === 'exp') {
                newItem = new Expense(ID, desc, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, desc, val);
            }

            console.log(newItem);

            // PUSH IT TO ARRAY AND RETURN
            data.allItems[type].push(newItem);
            return newItem;
        },

        deleteItem: function (type, id) {

            // id = 3
            var ids, index;

            ids = data.allItems[type].map(function (current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }

        },

        calculateBudget: function () {

            // CALC INCOME AND EXPENSES
            calculateTotal('exp');
            calculateTotal('inc');

            // CALC BUDGET
            data.budget = data.totals.inc - data.totals.exp;

            // CALC PERCENTAGES
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }

        },

        calculatePercentages: function () {

            data.allItems.exp.forEach(function (cur) {
                cur.calculatePercentage(data.totals.inc);
            });

        },
        getPercentages: function () {
            var allPercentages = data.allItems.exp.map(function (cur) {
                return cur.getPercentage();
            });

            return allPercentages;
        },
        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
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
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: ".item__percentage",
        dateLabel: ".budget__title--month"
    }

    var formatNumber = function (num, type) {

        var type;

        num = Math.abs(num);
        num = num.toFixed(2);

        var numSplit = num.split('.');

        var int = numSplit[0];
        var dec = numSplit[1];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, int.length);
        }

        return (type === 'exp' ? sign = '-' : sign = '+') + ' ' + int + '.' + dec;


    };

    // TODO: RESEARCH THIS METHOD MORE AND FIND OUT WHATS GOING ON. FIRST CLASS FUNCTIONS?
    var nodeListForEach = function (list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

    // SOME CODE
    return {
        getInput: function () {

            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }

        },
        addListItem: function (obj, type) {

            var html, parsedHTML, element;

            // CREATE PLACEHOLDER STIRNG
            if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">%percentage%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // CREATE THE NEW PARSED STRING
            parsedHTML = html.replace('%id%', obj.id)
                .replace('%description%', obj.description)
                .replace('%value%', formatNumber(obj.value, type));

            // INSERT INTO THE DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', parsedHTML);

        },
        removeListItem: function (selectorID) {

            var element = document.getElementById(selectorID);
            element.parentNode.removeChild(element);

        },
        displayBudget: function (obj) {

            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';

            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
            // document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage;

            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }

        },
        clearFields: function () {
            var fields;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ", " + DOMstrings.inputValue);

            var fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function (current, index, array) {
                current.value = '';
            });


            // RETURN BACK TO THE DESCRIPTION FIELD
            fieldsArr[0].focus();


        },
        displayPercentages: function (percentages) {

            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

            nodeListForEach(fields, function (current, index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + "%";
                } else {
                    current.textContent = "---";
                }
            });


        },
        displayMonth: function () {

            var now = new Date();
            var year = now.getFullYear();
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var month = now.getMonth();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month];

        },
        changedType: function () {
            var fields = document.querySelectorAll(DOMstrings.inputType + ", " + DOMstrings.inputDescription + ", " + DOMstrings.inputValue);

            nodeListForEach(fields, function (cur) {
                cur.classList.toggle('red-focus');
            });

            document.querySelector(DOMstrings.inputButton).classList.toggle('red');

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

        // DELETE EVENT LISTENER
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        // ON CHANGE EVENT
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);

    };

    var updateBudget = function () {

        // CALC BUDGET
        budgetCtrl.calculateBudget();

        /// RETURN BUDGET
        var budget = budgetCtrl.getBudget();

        console.log(budget);

        UICtrl.displayBudget(budget);

        // DISPLAY ON UI
    };

    var updatePercentages = function () {

        // cals percentages
        budgetCtrl.calculatePercentages();

        var percentages = budgetCtrl.getPercentages();

        UICtrl.displayPercentages(percentages);


        // read them from budget ctrl

        // UPDATE the UI

    }

    var ctrlAddItem = function () {


        // GET VALUES
        var input = UICtrl.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

            // ADD ITEM TO BUDGET CONTROLLER
            var newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // ADD ITEM TO UI
            UICtrl.addListItem(newItem, input.type);

            // CLEAR FIELDS
            UICtrl.clearFields();

            updateBudget();

            updatePercentages();

        }

        // CALCUL THE BUDGET


        // DISPLAY THE BUDGET ON THE UI
        // console.log("It works.");

    };

    // DELETE ITEM
    var ctrlDeleteItem = function (event) {
        var itemID, slitID, type, ID;
        itemID = event.target.parentNode
            .parentNode
            .parentNode
            .parentNode.id;

        if (itemID) {
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            console.log(type);
            console.log(ID);

            // DELETE ITEM FROM DATA STRUCTURE
            budgetCtrl.deleteItem(type, ID);
            UICtrl.removeListItem(itemID);

            updateBudget();

            updatePercentages();
            // DELETE FROM UI

            // UPDATE NEW TOTALS
        }

    };

    return {
        init: function () {
            console.log("THE APPLICATION HAS STARTED");
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            });
            UICtrl.displayMonth();
            setupEventListeners();
        }
    }



})(budgetController, UIController);

// INITIALIZE THE APP

controller.init();