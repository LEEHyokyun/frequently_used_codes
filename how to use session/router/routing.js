const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

router.use('/', cookieParser());

router.get('/', (req, res) => {
    res.render('jwt.html');
});

//session middleware
router.use(session({
    secret: 'secretKey',
    resave: false,
    store: new FileStore()
}));

router.post('/add', (req, res) => {
    
    //console.log(req.body);
    let {ID, PW} = req.body;

    //session
    req.session.userID = ID;
    req.session.userPW = PW;

    //let userIDSession = req.session.userID;
    //let userPWSession = req.session.userPW;

    //console.log(userIDSession);
    //console.log(userPWSession);

    //jwt
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
    //check data from session
    console.log('-----------------');
    console.log('ID from session');
    console.log(req.session.userID);
    console.log('PW from session');
    console.log(req.session.userPW);
    console.log('-----------------');
    
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
    //console.log(reqCookie.connect.sid);
    
})

module.exports = router;