const console = require('keypunch');
console.addHeaderFunction(() => `[PID:${process.pid}]`);

const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.static('app'));

const templatePath = require('path').resolve(`./template.html`);
const template = require('fs').readFileSync(templatePath, 'utf8');

app.get('*', function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(template);
  res.end();
});

const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.info(`Frontend server listening on ${port}`);
});
