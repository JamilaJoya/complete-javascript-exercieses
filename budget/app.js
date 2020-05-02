// BUDGET CONTROLLER
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id
        this.description = description
        this.value = value
    }

    var Income = function (id, description, value) {
        this.id = id
        this.description = description
        this.value = value
    }

    var calculateTotal = function (type) {
        var sum = 0
        data.allItems[type].forEach(function (cur) {
            sum += cur.value
        })
        data.totals[type] = sum
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
        addItem: function (type, des, val) {
            var ID, newItem

            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1
            } else {
                ID = 0
            }
            // Create new item
            if (type === 'exp') {
                newItem = new Expense(ID, des, val)
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val)
            }

            // push it to the data structure
            data.allItems[type].push(newItem)

            // return the new item
            return newItem
        },
        calculateBudget: function () {
            // 1. calculate the total of icome and expenses
            calculateTotal('exp')
            calculateTotal('inc')
            // 2. calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp
            // 3. calculate the percentage of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100)
            } else {
                data.percentage = -1
            }
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        }
    }

})()

// UI CONTROLLER
var UIController = (function () {

    var DOMString = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMString.inputType).value,
                description: document.querySelector(DOMString.inputDescription).value,
                value: parseFloat(document.querySelector(DOMString.inputValue).value)
            }
        },

        addListItem: function (obj, type) {
            var html, newHtml, element
            if (type === 'inc') {
                element = DOMString.incomeContainer
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

            } else if (type === 'exp') {
                element = DOMString.expenseContainer
                html = '<div class="item clearfix" id="exp-%id%"><div div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            newHtml = html.replace('%id%', obj.id)
            newHtml = newHtml.replace('%description%', obj.description)
            newHtml = newHtml.replace('%value%', obj.value)

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)
        },

        clearFields: function () {
            var fields, fieldsArr
            fields = document.querySelectorAll(DOMString.inputDescription + ',' + DOMString.inputValue)
            fieldsArr = Array.prototype.slice.call(fields)

            fieldsArr.forEach(function (current, index, array) {
                current.value = ''
            });

            fieldsArr[0].focus()
        },

        dispalyBudget: function (obj) {
            document.querySelector(DOMString.budgetLabel).textContent = obj.budget
            document.querySelector(DOMString.incomeLabel).textContent = obj.totalInc
            document.querySelector(DOMString.expensesLabel).textContent = obj.totalExp


            if (obj.percentage > 0) {
                document.querySelector(DOMString.percentageLabel).textContent = obj.percentage + '%'
            } else {
                document.querySelector(DOMString.percentageLabel).textContent = '---'
            }
        },

        getDOMString: function () {
            return DOMString
        }
    }
})()



// GLOBLE APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventlisteners = function () {
        var DOM = UICtrl.getDOMString()
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem)
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem()
            }
        })

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem)

    }

    var updateBudget = function () {

        // 1. Calculate the budget
        budgetCtrl.calculateBudget()
        // 2. Return the budget
        var budget = budgetCtrl.getBudget()

        // 3. Display the budget on the UI
        UICtrl.dispalyBudget(budget)
    }

    var ctrlAddItem = function () {
        var newItem, input
        // 1. Get the field input data
        input = UICtrl.getInput()
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. add the value to budget controller
            newItem = budgetController.addItem(input.type, input.description, input.value)

            // 3. Add the items to UI
            UICtrl.addListItem(newItem, input.type)

            // 4.Clear the fields
            UICtrl.clearFields()

            // Calculate and update the budget
            updateBudget()
        }
    }

    var ctrlDeleteItem = function (event) {
        var itemID, splitID, type, ID
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id

        if (itemID) {
            // inc--1
            splitID = itemID.split('-')
            type = splitID[0]
            ID = splitID[1]
        }

        // 1. delete tht item from the data structures

        // 2. delete the item from the user interface

        // 3. update and show the new budget
    }

    return {
        init: function () {
            console.log('application has started')
            UICtrl.dispalyBudget(
                {
                    budget: 0,
                    totalInc: 0,
                    totalExp: 0,
                    percentage: -1
                }
            )
            setupEventlisteners()
        }
    }
})(budgetController, UIController)

controller.init()

























