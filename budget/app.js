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
        expenseContainer: '.expenses__list'
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMString.inputType).value,
                description: document.querySelector(DOMString.inputDescription).value,
                value: document.querySelector(DOMString.inputValue).value,
            }
        },

        addListItem: function (obj, type) {
            var html, newHtml, element
            if (type === 'inc') {
                element = DOMString.incomeContainer
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

            } else if (type === 'exp') {
                element = DOMString.expenseContainer
                html = '<div class="item clearfix" id="expense-%id%"><div div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            newHtml = html.replace('%id%', obj.id)
            newHtml = newHtml.replace('%description%', obj.description)
            newHtml = newHtml.replace('%value%', obj.value)

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)
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

    }

    var ctrlAddItem = function () {
        var newItem, input
        // 1. Get the field input data
        input = UICtrl.getInput()

        // 2. add the value to budget controller
        newItem = budgetController.addItem(input.type, input.description, input.value)

        // 3. Add the items to UI
        UICtrl.addListItem(newItem, input.type)
        // 4. Calculate the budget

        // 5. Display the budget on the UI

    }

    return {
        init: function () {
            console.log('application has started')
            setupEventlisteners()
        }
    }
})(budgetController, UIController)

controller.init()
























