var fs = require('fs');

describe('Protractor dingtalk,', function(){
    var originalTimeout;
    function saveLogs(logs){
        if(logs.length > 1){
            fs.appendFile('logs', logs, function (err) {
              if (err) throw err;
            });
        }
    }

    beforeEach(function() {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000000;
    });

    it('index to get login', function(){
        var started = browser.get('https://im.dingtalk.com/')
        browser.wait(started, 10 * 1000, '请在5秒内扫码登录。')
        .then(function(){
            expect(element(by.className('layout-main')).isPresent()).toBe(false)
        })
    })

    it('cilck ok to index', function(){
        element(by.css('.blue')).click()
        expect(1).toBe(1)
    })

    it('get contact list', function(){
        element(by.css('.menu-contact')).click()
        browser.sleep(1000)
        expect(1).toBe(1)
    })

    it('get group list', function(){
        element(by.css('.dept-name')).click()
        browser.sleep(1000)
        expect(1).toBe(1)
    })

    function traverse(){
        var nodes = element.all(by.repeater('item in orgList.currentDept.childrenTreeNodes'))
        nodes.count().then(function(num){
            if(0 == num){
                element.all(by.repeater('item in breadcrumbs.breadList')).count().then(function(number){
                    var num = number - 2;
                    element.all(by.repeater('item in breadcrumbs.breadList')).get(num).click();
                })
                browser.sleep(1000)
            }else {
                nodes.map(function(elm, index){
                    nodes.get(index).click();
                    browser.sleep(1000);

                    element(by.css('.cnt')).isPresent().then(function(result){
                        if(result){
                            var employee = [];
                            element.all(by.css('.cnt')).each(function(elm, index){
                                elm.getText().then(function(text){
                                    employee.push(text)
                                })
                            }).then(function(){
                                var employeeStr = JSON.stringify(employee);
                                saveLogs(employeeStr + '\n');
                            })
                            element.all(by.css('.dialog-close')).click();
                            browser.sleep(1000);
                        }else {
                            traverse()
                        }
                    }).then(function(){
                        nodes.count().then(function(num){
                            if(index == num - 1){
                                element.all(by.repeater('item in breadcrumbs.breadList')).count().then(function(number){
                                    var num = number - 2;
                                    element.all(by.repeater('item in breadcrumbs.breadList')).get(num).click();
                                })
                                browser.sleep(1000)
                            }
                        })
                    })
                })
            }
        })
    }

    it('get members for first group', function(){
        traverse();
    })

    afterEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

})
