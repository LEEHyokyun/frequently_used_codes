const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

router.use('/', cookieParser());

router.get('/', (req, res) => {
    res.render('jwt.html');
});

router.post('/add', (req, res) => {
    //console.log(req.body);
    let {ID, PW} = req.body;

    const token = jwt.sign(
        {
            userID: ID,
            userPW: PW
        }, 
        'secret', 
        {
            expiresIn: '1h'
        }
    );

    console.log('token is, ' + token);
    
    //JWT save to cookie (*cookie-parser)
    res.cookie('loginCookie', token, {
    });
    res.redirect('/jwt');
});

router.post('/check', (req, res) => {
    
    //get login token from cookies
    let reqCookie = req.cookies;
    let token = reqCookie.loginCookie;

    let {ID, PW} = req.body;

    //decode
    const decoded_data = jwt.verify(
        token, 
        'secret',
        //callback 내부의 decoded data는 외부에서 재활용 할 수 없다
        //callback은 확인용
        /*(err, decoded) => {
            console.log(decoded);
        }*/
    );
    
    if(ID, PW){
        if(ID == decoded_data.userID && PW == decoded_data.userPW){
            res.send('CORRECT ID / PW');
        }else{
            res.send('INCORRECT ID OR PW');
        }
    }

    //data 활용용도, 위 callback에서 사용한 이력이 없어야 한다.
    //아래에서의 decoded data는 보여지지 않고, 직접 접근해야 한다.
    console.log('dedoced data is, ' + decoded_data.userID);
    console.log('dedoced data is, ' + decoded_data.userPW);
    
})

module.exports = router;