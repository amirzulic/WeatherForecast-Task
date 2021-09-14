var express = require('express');
var router = express.Router();
var weather = require('openweather-apis');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/forma/:grad/:drzava', function(req, res, next) {
  let grad = req.params.grad || ('Sarajevo');
  let drzava = req.params.drzava || ('BA');
  weather.setLang('hr');
  weather.setCity(grad + ', ' + drzava);
  weather.setUnits('metric');
  weather.setAPPID('dc86749ad7ac31045c5ab2eb74bee12d');

  let data = {
    grad: grad,
    drzava: drzava
  };
  weather.getTemperature(function(err, temp){
    data.temp = temp;
    weather.getPressure(function(err, pres){
      data.pres = pres;
      weather.getHumidity(function(err, hum){
        data.hum = hum;
        weather.getDescription(function(err, desc){
          data.desc = desc;
          res.render('vrijeme', { title: 'Vremenska Prognoza', data: data });
        });
      });
    });
  });
});

router.post('/salji', function(req, res, next) {
  let grad = req.body.grad || ('Sarajevo');
  let drzava = req.body.drzava || ('BA');
  if (drzava === 'Bosna i Hercegovina') {
    drzava = 'BA';
  } else if (drzava === 'Italija') {
    drzava = 'IT';
  } else if (drzava === 'Francuska') {
    drzava = 'FR';
  } else if (drzava === 'Engleska') {
    drzava = 'GB';
  } else {
    drzava = 'NL';
  }
  res.redirect('/forma' + '/' + grad + '/' + drzava);

});



module.exports = router;
