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
    // Select account
    var currentAccount = AdWordApp.currentAccount();
    var accountName = currentAccount.getName();

    // Init Variables
    var CtrCheck = .00010;
    var CpmAmount = 1;

    // Spreadsheet init
    var spreadsheet_url = 'https://docs.google.com/spreadsheets/d/15bwYT_klS0-v83CZG0aoMhH2fXl7EEXyKTrt4fzw3ZE/edit?usp=sharing';
    var spreadsheet = SpreadsheetApp.openByUrl(spreadsheet_url);
    var sheet = spreadsheet.getSheets()[0];

    // Grab SS Data
    var emailForNotify = sheet.getRange();

    // Email function to pass string and send through to email provided
    function notify(string) {
        MailApp.sendEmail(emailForNotify, accountName, string);
    }

    // Select campaign - Grab stats in loop
    var campaignSelector = AdWordsApp
        .campaigns()
        .withCondition("Status = ENABLED");
    
    var campaignIterator = campaignSelector.get();
    while(campaignIterator.hasNext()) {
        var campaign = campaignIterator.next();
        Logger.log("Campaign: " + campaign.getName());
        var currentBiddingStrategy = campaign.getBiddingStrategyType();
        Logger.log("current bidding strategy: " + currentBiddingStrategy);

        var currentStats = campaign.getStatsFor("LAST_7_DAYS");
        var currentCost = currentStats.getCost();
        var currentClicks = currentStats.getClicks();
        var currentCpm = currentStats.getAverageCpm();
        Logger.log("Current Cpm: " + currentCpm);
        var currentCtr = currentStats.getCtr();
        Logger.log("CurrentCtr: " + currentCtr);
        var currentCpc = currentStats.getCpc();
    }
    // Select ad group to adjust cpm
    var adGroupSelector = AdWordApp
        .adGroups();

    var adGroupIterator = adGroupSelector.get();
    while(adGroupIterator.hasNext()) {
        var adGroup = adGroupIterator.next();
    }
    

    // Conditional check - If CPM >$1 = ignore
    if(currentCpm > CpmAmount) {
        Logger.log("Campaign CTR in a good place");
    }

    // Conditional check - If CTR is > .10% raise CPM to CPMamount
    else if(currentCtr > CtrCheck) {
        Logger.log("CTR not in a good spot - adjusting...");
        adGroup.setCpm(CpmAmount);
    }

    else {
        Logger.log("Error in script");
    }
}