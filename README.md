# ding-protractor
an protractor program get dingtalk contacts

### 1.安装

默认已安装node.js v4.0+ 

默认已安装java 1.8 因为最新版的webdriver-manager依赖java 1.8+


1.使用npm 安装 Protractor 

```javascript
npm install -g protractor
```
这时候会添加两个 命令， **protractor** 和 **webdriver-manager** .可以打开终端 输入 
protractor --version 确认是否正常工作。

2.下载必要的运行文件
```javascript
webdriver-manager update
```
3.启动服务
```javascript
webdriver-manager start
```
会启动一个测试服务，并且会打印log。你的protractor 测试会发送请求到这个服务来控制本地浏览器。

另外打开命令行，
```javascript
protractor conf.js
```
启动后将web版钉钉窗口最大化，扫码登录。
之后在项目目录下的logs文件即为联系人。
