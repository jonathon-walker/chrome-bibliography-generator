var Tab = function(chromeTab) {
    var self = this;
    
    self.getAuthor = function() {
        return "Smith, J."
    };
    
    self.getCreated = function() {
        return 'n.d.';
    };
    
    self.getWebsiteType = function() {
        return '';
    };
    
    self.getOrganisation = function() {
        return 'Acme Corporation';
    };
    
    self.getLocation = function() {
        return 'Sydney';
    };
    
    self.details = {
        author: self.getAuthor(),
        created: self.getCreated(),
        title: chromeTab.title,
        type: self.getWebsiteType(),
        organisation: self.getOrganisation(),
        location: self.getLocation(),
        accessed: (new Date()).toDateString(),
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
