// Optimize CTR (without max clicks)–  If placement CTR is >.10% then make a bid adjustment to raise CPM bid to $1. 
// If the CPM on the placements is >$1, ignore. (we can also apply this to an account that is on max clicks.)

// Select the current account
// Init ss
// Set init variables (CTRCheck: .10%, CPMamount: $1)
// Select current campaign
// Grab stats from the campaign (CTR, CPM)
// Conditional check - If CTR is > .10% raise CPM to CPMamount
// Conditional check - If CPM >$1 = ignore

function main() {
    var currentAccount = AdWordApp.currentAccount();
    var accountName = currentAccount.getName();
}