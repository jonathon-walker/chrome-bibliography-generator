var Tab = function(title) {
    var self = this;
    self.title = title;
    self.convert = ko.observable(true);
    self.toggleChecked = function() {
        self.convert(!self.convert());
    }
}

var Page = function(tabs) {
    var self = this;
    self.tabs = ko.observableArray(tabs);
}

$(document).ready(function() {
    chrome.tabs.query({}, function(tabs) {
        var allTabs = _.map(tabs, function(tab) {
            return new Tab(tab.title);
        });
        
        ko.applyBindings(new Page(allTabs));
    });
});
