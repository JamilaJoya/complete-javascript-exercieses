// BUDGET CONTROLLER
var budgetController = (function () {

})()



// UI CONTROLLER
var UIController = (function () {

    var DOMString = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMString.inputType).value,
                description: document.querySelector(DOMString.inputDescription).value,
                value: document.querySelector(DOMString.inputValue).value,
            }
        },
        getDOMString: function () {
            return DOMString
        }
    }
})()



// GLOBLE APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

    var DOM = UICtrl.getDOMString()

    var ctrlAddItem = function () {
        // 1. Get the field input data
        var input = UICtrl.getInput()
        console.log(input)

        // 2. add the value to budget controller

        // 3. Add the items to UI

        // 4. Calculate the budget

        // 5. Display the budget on the UI

    }

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem)

    document.addEventListener('keypress', function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem()
        }
    })


})(budgetController, UIController)



























