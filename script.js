class Wallet {
    constructor(name, currency, balance, description, transactions=[]){
        this.name = name,
        this.currency = currency,
        this.balance = balance,
        this.description = description,
        this.transactions = transactions
    }
    addTransaction(transaction){
        this.transactions.push(transaction)
    }
}

class Transaction {
    constructor(transaction, type, notes, tags){
        this.date= Date.now()
        this.transaction = transaction,
        this.type = type,
        this.notes = notes,
        this.tags = tags.split(",")
    }
}
class Display {
    static addTransList(wallet){
        const list = document.querySelector("#transactions")
        let li = document.createElement("li")
        wallet.transactions.map(element => {
            let html = `${element.transaction} ${element.date} <br> ${element.notes}  ${(element.tags[0])}`
            li.innerHTML= html
            list.appendChild(li)
        });
    }
}

let walletOne;
const walletForm = document.querySelector("#wallet-form")
walletForm.addEventListener("submit", function(e){
    e.preventDefault();
    const {name, currency, balance, description} = e.target;
    walletOne = new Wallet(name.value, currency.value, balance.value, description.value)
    // localStorage.setItem('wallets', JSON.stringify(walletOne));
    console.log("walletOne")
})

const transForm = document.querySelector("#transaction-form")
transForm.addEventListener("submit", function(e){
    e.preventDefault();
    const {amount, notes, tags, income} = e.target;
    walletOne.addTransaction (new Transaction(amount.value, income.value, notes.value, tags.value))
    // let wall = JSON.parse(localStorage.getItem("wallet"));

    // wall.transactions.push(newTrans)
    console.log(walletOne)
    Display.addTransList(walletOne)
})