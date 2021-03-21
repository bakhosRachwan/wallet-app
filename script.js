class Wallet {
    constructor(name, currency, balance, description, transactions = []) {
        this.name = name,
            this.currency = currency,
            this.balance = balance,
            this.description = description,
            this.transactions = transactions
    }
    addTransaction(transaction) {
        this.transactions.push(transaction)
    }
}
class Transaction {
    constructor(transaction, type, notes, tags) {
        this.date = new Date().toDateString()
        this.transaction = transaction,
            this.type = type,
            this.notes = notes,
            this.tags = tags.split(",")
    }
}
class Display {
    static addTransList(wallet) {
        const list = document.querySelector("#transactions")
        let li = document.createElement("li")
        wallet.transactions.map(element => {
            let html = `${element.transaction} ${element.date} <br> ${element.notes}  ${(element.tags[0])}`
            li.innerHTML = html
            list.appendChild(li)
        });
    }
    static updateBalance(wallet) {
        let total = wallet.transactions.map(element =>
            element.type === "income" ? parseInt(element.transaction) : +element.transaction * -1
        ).reduce((acc, cum) => {
            return acc + cum
        }, parseInt(wallet.balance))
        const balance = document.querySelector("#wallet-balance")
        balance.innerHTML = ""
        balance.innerHTML += total
    }
}
class Store {
    static getWallets() {
        let wallets;
        if (localStorage.getItem("wallets") === null) {
            wallets = [];
        } else {
            wallets = JSON.parse(localStorage.getItem("wallets"));
        }

        return wallets;
    }

    static addNewTransaction(wallet) {
        const wallets = Store.getWallets();
        wallets.push(wallet);
        localStorage.setItem("wallets", JSON.stringify(wallets));
    }
}
let walletOne;
const walletForm = document.querySelector("#wallet-form")
walletForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const { name, currency, balance, description } = e.target;
    walletOne = new Wallet(name.value, currency.value, balance.value, description.value)
    document.querySelector("#create-wallet-view").classList.add("d-none")
    document.querySelector("#wallet-balance-view").classList.remove("d-none")
    document.querySelector("#wallet-balance-view").classList.add("d-block")
})

const transForm = document.querySelector("#transaction-form")
transForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const { amount, notes, tags, typebtn } = e.target;
    walletOne.addTransaction(new Transaction(amount.value, typebtn.value, notes.value, tags.value))

    Store.addNewTransaction(walletOne);
    Display.addTransList(walletOne)
    Display.updateBalance(walletOne)
})