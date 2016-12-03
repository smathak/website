var express = require('express');
var router = express.Router();
var _ = require('lodash');
var Host = require('../models/Host');
var User = require('../models/User');
var Reservation = require('../models/Reservation');

var countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombi", "Comoros", "Congo (Brazzaville)", "Congo", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor (Timor Timur)", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia, The", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepa", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia and Montenegro", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
 ];

var cities = ['Shanghai, China', 
                'Lagos,  Nigeria', 
                'Istanbul,  Turkey', 
                'Karachi,  Pakistan', 
                'Mumbai,  India', 
                'Moscow,  Russia', 
                'São Paulo,  Brazil', 
                'Beijing,  China', 
                'Guangzhou,  China', 
                'Delhi,  India', 
                'Lahore,  Pakistan', 
                'Shenzhen,  China', 
                'Seoul,  South Korea', 
                'Jakarta,  Indonesia', 
                'Tianjin,  China', 
                'Chennai,  India', 
                'Tokyo,  Japan', 
                'Cairo,  Egypt', 
                'Dhaka,  Bangladesh', 
                'Mexico City,  Mexico', 
                'Kinshasa,  Democratic Republic of the Congo', 
                'Bangalore,  India', 
                'New York,  United States', 
                'London,  United Kingdom', 
                'Bangkok,  Thailand', 
                'Tehran,  Iran', 
                'Dongguan,  China', 
                'Ho Chi Minh City,  Vietnam', 
                'Bogotá,  Colombia', 
                'Lima,  Peru', 
                'Hong Kong,  Hong Kong', 
                'Hanoi,  Vietnam', 
                'Hyderabad,  India', 
                'Wuhan,  China', 
                'Rio de Janeiro,  Brazil', 
                'Foshan,  China', 
                'Ahmedabad,  India', 
                'Baghdad,  Iraq', 
                'Singapore,  Singapore', 
                'Shantou,  China', 
                'Riyadh,  Saudi Arabia', 
                'Jeddah,  Saudi Arabia', 
                'Santiago,  Chile', 
                'Saint Petersburg,  Russia', 
                'Qalyubia,  Egypt', 
                'Chengdu,  China', 
                'Alexandria,  Egypt', 
                'Ankara,  Turkey', 
                'Chongqing,  China', 
                'Kolkata,  India', 
                'Xian,  China', 
                'Surat,  India', 
                'Johannesburg,  South Africa', 
                'Nanjing,  China', 
                'Dar es Salaam,  Tanzania', 
                'Yangon,  Burma', 
                'Abidjan,  Ivory Coast', 
                'Harbin,  China', 
                'Zhengzhou,  China', 
                'Suzhou,  China', 
                'Sydney,  Australia', 
                'New Taipei City,  Republic of China (Taiwan)', 
                'Los Angeles,  United States', 
                'Melbourne,  Australia', 
                'Cape Town,  South Africa', 
                'Shenyang,  China', 
                'Yokohama,  Japan', 
                'Busan,  South Korea', 
                'Hangzhou,  China', 
                'Quanzhou,  China', 
                'Durban,  South Africa', 
                'Casablanca,  Morocco', 
                'Algiers,  Algeria', 
                'Berlin,  Germany', 
                'Nairobi,  Kenya', 
                'Hefei,  China', 
                'Kabul,  Afghanistan', 
                'Pyongyang,  North Korea', 
                'Madrid,  Spain', 
                'Ekurhuleni,  South Africa', 
                'Pune,  India', 
                'Addis Ababa,  Ethiopia', 
                'Changsha,  China', 
                'Jaipur,  India', 
                'Xuzhou,  China', 
                'Wenzhou, China'
];

// suggesst nation 띄우기
router.get('/suggest_nation', function(req, res, next){
    var typed = req.query.qu;
    // countries 객체를 nation_name에 넘겨줌 
    // nation_name 중에서 
    var ret = _.filter(countries, function(countryname){
        // nation_name을 소문자로 바꾸고 
        // ajax로 부터 받은 antion을 소문자로 바꾼 곳의 index에 있으면 반환함
        return countryname.toLowerCase().indexOf(typed.toLowerCase()) > -1;
    });

    res.json(ret); // 결과를 json의 형태로 반환하여 return 
});

// suggesst city 띄우기
router.get('/suggest_city', function(req, res, next){
    var typed_city = req.query.qu;
    // countries 객체를 nation_name에 넘겨줌 
    // nation_name 중에서 
    var ret_city = _.filter(cities, function(cityname){
        // nation_name을 소문자로 바꾸고 
        // ajax로 부터 받은 antion을 소문자로 바꾼 곳의 index에 있으면 반환함
        return cityname.toLowerCase().indexOf(typed_city.toLowerCase()) > -1;
    });

    res.json(ret_city); // 결과를 json의 형태로 반환하여 return 
});


// 호스팅하는 창 띄우기
router.get('/', function(req, res, next) {
    Host.find({}, function(err, host){
        res.render('host/host', {host : host}); 
    });
});

// 예약하는 창 띄우기
router.get('/reservation', function(req, res, next) { 
  Host.find({}, function(err, hosts){
     if (err) {
      return next(err);
    }
    res.render('host/reservation', {hosts : hosts}); 
  });
 
});

// 호스팅 하기
router.post('/', function(req, res, next){
    var newHost = new Host({
                title : req.body.title,
                explanation : req.body.explanation,
                nation: req.body.nation,
                city : req.body.city,
                address : req.body.address,
                fare : req.body.fare, // 반드시 숫자를 입력하도록 하기 
                facility : req.body.facility,
                rule : req.body.rule,
                nickname : req.body.register
                // 이미지도 추가 예정
            });
        
    newHost.save(function(err){
        if(err){
            return next(err);
        }else{
            req.flash('success', '호스팅이 완료되었습니다. My Page에서 자신이 호스팅한 숙소를 볼 수 있습니다.');
            res.render('host/show', {host : newHost, messages : req.flash()});
        }
    });
});

// 원하는 국가의 호스팅만 띄우기
router.get('/nationsearch', function(req ,res, next){

    Host.find({nation: req.body.nation}, function(err, hosts){
        res.render('host/reservation', {hosts:hosts});
    });
});


// 원하는 도시의 호스팅만 띄우기
router.get('/citysearch', function(req ,res, next){
    Host.find({city: req.body.city}, function(err, hosts){
        res.render('host/reservation', {hosts:hosts});
    });
});


// 호스팅 수정을 하기 위한 페이지로 가기
router.get('/edit/:id', function(req, res, next){
   Host.findById({_id:req.params.id}, function(err, host){ // id별로찾음(해당 Document가 가지고 있는 id로 )
     if(err){
          return next(err);
      }
      res.render('host/host', { host : host });
   });
});

// 호스팅 수정
router.put('/:id', function(req, res, next){
    Host.findById({_id:req.params.id}, function(err, host){
        if(err){
            return next(err);
        }
        host.address = req.body.address;
        host.nation = req.body.nation;
        host.city = req.body.city;
        host.explanation = req.body.explanation;
        host.title = req.body.title;
        host.fare = req.body.fare;
        host.rule = req.body.rule;
        host.facility = req.body.facility;

        host.save(function(err, host){
            req.flash('success', '수정되었습니다.');
            res.render('host/show', {host : host, messages : req.flash()});
        });
    });
});

// 예약하기에서 호스팅 되어있는 글 보여주기
router.get('/:id', function(req, res, error){
    Host.findByIdAndUpdate({_id : req.params.id}, {$inc: {readNum:1}}, function(err, host){
        res.render('host/show', {host : host, messages : req.flash()});
    }); 
});

// 예약 정보 확인하기
router.get('/reservation/:id', function(req, res, error){
    Reservation.findById({_id : req.params.id}, function(err, reservation){
        res.render('mypage/reservation_show', {reservation : reservation});
    }); 
});


// 예약하는 절차 보여주는 페이지로 가기
router.get('/process/:id', function(req, res, next){
    Host.findById({_id : req.params.id}, function(err, host){
        res.render('host/process', {host : host});
    });
});

// 예약정보를 DB에 Create
router.post('/reservation', function(req, res, next){
    var newReservation = new Reservation({
        guest : req.body.guest,
        host : req.body.host,
        nation: req.body.nation,
        city : req.body.city,
        address : req.body.address,
        checkin : req.body.checkin,
        checkout : req.body.checkout,
        number : req.body.number,
        title: req.body.title,
        hostid: req.body.hostid,
        date : req.body.date
        // 이미지도 추가 예정
    });
    newReservation.save(function(err){
        if(err){
            return next(err);
        }
        Host.findByIdAndUpdate({_id: req.body.hostid}, {$inc: {reservedNum:1}}, function(err){
            if(err){
                return next(err);
            }
        });
        req.flash('success', '예약이 완료되었습니다. My Page에서 자신이 예약한 숙소를 볼 수 있습니다.');
        res.redirect('/'); // 일단 메인으로 가고 나중에 my page로 이동하게 하기 
    
    });
});

// 호스트 페이지로 가기 
router.get('/reservation/:hostid/show', function(req, res, error){
    Host.findById({_id : req.params.hostid}, function(err, host){
        res.render('host/show', {host : host});
    }); 
});

// 호스팅 취소하기
router.delete('/cancel/:id', function(req, res, next){
    Host.findOneAndRemove({_id:req.params.id}, function(err, host){
        if(err){
            return next(err);
        }
        // req.flash('danger', "호스팅을 취소하셨습니다.");
        // res.redirect('/');
    }); 
    Host.find({}, function(err, hosts){
        res.render('mypage/host_list', {hosts:hosts});
    });
});


router.get('/reservation/mypage/profile/:guest_nickname', function(req, res, next){
    User.findOne({nickname: req.params.guest_nickname}, function(err, user){
        if(err){
            return next(err);
        }
        res.render('mypage/profile', {user: user});
    });
});


module.exports = router;