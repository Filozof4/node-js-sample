var express = require('express')
var app = express()
var url = require('url')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var getProxyType = require('check-proxy').ping

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

var ping = function(req, res) {
  console.log('ip', req.connection.remoteAddress);
  console.log('headers', req.headers);
	console.log('cookies', req.cookies);
  res.json(getProxyType(req.headers, req.query, req.body, req.cookies));
}

app.get('/', ping);
app.post('/', ping);

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
