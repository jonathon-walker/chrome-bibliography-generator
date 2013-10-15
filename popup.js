var Tab = function(chromeTab) {
    var self = this;
    
    self.getCreated = function() {
        return 'n.d.';
    };
    
    self.getWebsiteType = function() {
        return 'Website';
    };
    
    self.getAccessed = function() {
        var monthNames = [ "January", "February", "March", "April",
        "May", "June", "July", "August", "September", "October", "November",
        "December" ];
        var now = new Date();
        var s = 'viewed ';
        s += now.getDate() + ' ';
        s += monthNames[now.getMonth()] + ' ';
        s += now.getFullYear();
        return s;
        
    }
    
    self.details = {
        created: self.getCreated(),
        title: chromeTab.title,
        type: self.getWebsiteType(),
        accessed: self.getAccessed(),
        url: '<' + chromeTab.url + '>'
    };
    
    self.convert = ko.observable(false);
    
    self.toBibliography = function() {        
        return _.map(self.details, function(detail) {
            return detail;
        }).join(', ');
    };
}

var Page = function(tabs) {
    var self = this;
    self.tabs = ko.observableArray(tabs);
    self.bibliographies = ko.computed(function() {
        var tabsToConvert = _.filter(self.tabs(), function(tab) {
            return tab.convert();
        });
        
        return _.map(tabsToConvert, function(tab) {
            return tab.toBibliography();
        });
    });
}

$(document).ready(function() {
    chrome.tabs.query({}, function(chromeTabs) {
        var tabs = _.map(chromeTabs, function(tab) {
            return new Tab(tab);
        });
        
        ko.applyBindings(new Page(tabs));
    });
});
