// Optimize CTR (without max clicks)–  If placement CTR is >.10% then make a bid adjustment to raise CPM bid to $1. 
// If the CPM on the placements is >$1, ignore. (we can also apply this to an account that is on max clicks.)

// Select the current account
// Init ss
// Set init variables (CTRCheck: .10%, CPMamount: $1)
// Select current campaign
// Grab stats from the campaign (CTR, CPM)
// Conditional check - If Average CPM is over Max CPM - set Max CPM to $1.00

// Report to generate stats on placements
// Calculate formula to generate a % to add to specific placements that require a bid adjustment

function main() {
    // Select account
    var currentAccount = AdWordsApp.currentAccount();
    var accountName = currentAccount.getName();

    // Init Variables
    var CtrCheck = parseFloat(.001);
    var cpmAmount = parseFloat(1);
    var maxCpm = parseFloat(1.25);

    // Select campaign - Check bidding strategy type
    var campaignSelector = AdWordsApp
        .campaigns()
        .withCondition("Status = ENABLED");
    
    var campaignIterator = campaignSelector.get();
    while(campaignIterator.hasNext()) {
        var campaign = campaignIterator.next();
        Logger.log("Campaign: " + campaign.getName());
        var currentBiddingStrategy = campaign.getBiddingStrategyType();
        Logger.log("current bidding strategy: " + currentBiddingStrategy);
    }
    // Select Placements to adjust cpm
    var placementSelector = AdWordsApp.display()
        .placements()
        .withCondition("Status = ENABLED")
        .withCondition("Impressions > 1")
        .forDateRange("LAST_7_DAYS");


    var placementIterator = placementSelector.get();
    while (placementIterator.hasNext()) {
        var placement = placementIterator.next();
        var placementStats = placement.getStatsFor("LAST_7_DAYS");
        var placementAverageCpm = placementStats.getAverageCpm();
        var placementCtr = placementStats.getCtr();
        var placementImpressions = placementStats.getImpressions();
        var placementClicks = placementStats.getClicks();
        var placementCost = placementStats.getCost();
        Logger.log("================================");
        Logger.log("Placements Ctr: " + placementCtr);
        var placementCpm = placement.bidding().getCpm();
        Logger.log("Placements Cpm: " + placementCpm);
        Logger.log("Placement Average Cpm:" + placementAverageCpm);
        Logger.log("Placement Impressions: " + placementImpressions);
        Logger.log("Placement Clicks: " + placementClicks);
        Logger.log("Placement Cost: " + placementCost);
          Logger.log("================================");
        var twentyPer = parseFloat(1.20);
        var cpmAdjust = placementCpm * twentyPer;
      
              // Conditional check - If CTR is > .10% raise CPM to CPMamount
        if (placementAverageCpm > maxCpm) {
           placement.bidding().setCpm(cpmAmount);
        }	
        else {
          // Cpm is below $1.25
          Logger.log("Ignore");
        }  
    }


     
}