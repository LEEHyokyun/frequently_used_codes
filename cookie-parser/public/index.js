let fileOpenButton = document.querySelector('body .fileOpen');
let textArea = document.querySelector('pre');
let imageArea = document.querySelector('body .imageArea');
let fileBuffer = null;
let fileRead = new FileReader();

//var jwt = require('jsonwebtoken');

//when window loaded after file read
//persist data
//and get file data with URL user data
let userName = document.URL.split('/').pop();

document.addEventListener('DOMContentLoaded', ()=>{
    let imageDATA = localStorage.getItem(`${userName}forimg`);
    let txtDATA = localStorage.getItem(`${userName}fortxt`);

    if(imageDATA || txtDATA){
        textArea.innerText = txtDATA;
        imageArea.src = imageDATA;
    }else{
        return;
    }
})



//file open
fileOpenButton.addEventListener('click', click);
//save to buffer
async function click(){
    //get file data
    //buffer의 세부적인 method 사용을 위해 비구조화 방식으로 선언.
    [fileBuffer] = await window.showOpenFilePicker();
    //console.log(fileBuffer.types);
    /*불러오는 파일의 정보 특정 가능
    [fileBuffer] = await window.showOpenFilePicker({
        types: [
            {
                description : 'specifiy file type'
                accept : {
                    'image/*' : ['.py', '.gif', '.jpeg', '.jpg', '.js', '.html']
                }
            }
        ]
    })
    */
    //console.log(fileBuffer);
    
    //read file data
    let fileData = await fileBuffer.getFile();
    console.log(fileData);

    if(fileData.type !== 'image/png'){
        //interface file data
        //await fileRead.readAsDataURL(fileData)
        let text = await fileData.text();
        textArea.innerText = text;

        afterTxtRead(text);
        

    }else if(fileData.type == 'image/png' || 'image/jpeg'){
        //fileReader가 fileData를 먼저 읽어야 한다.
        await fileRead.readAsDataURL(fileData);
        imageArea.src = fileRead.result;
        //fileRead - null, fileRead.result - image URL.
        //upload event를 부여할 경우에만 fileRead에서 data를 읽어올 수 있다.

        afterImageRead();
        
    }else{
        return;
    }

    function afterTxtRead(text){
        localStorage.setItem(`${userName}fortxt`, text)
        const txtToken = jwt.sign({
            txt: text
        }, '123', {
            expiresIn: '30s'
        });
        console.log(txtToken);
    }

    function afterImageRead(){
        fileRead.addEventListener('load', () => {
        localStorage.setItem(`${userName}forimg` , fileRead.result);
        //console.log(fileRead.result);
        //console.log(imageArea.src);
        const imgToken = jwt.sign({
            img: fileRead.result
        }, '123' , {
            expiresIn: '30s'
        });
        console.log(imgToken);
        })
    }
}

//file save
let fileSaveButton = document.querySelector('body .fileSave');
fileSaveButton.addEventListener('click', save);

async function save(){
    let stream = await fileBuffer.createWritable();
    await stream.write(textArea.innerText);
    await stream.close();
}

//file save as
let fileSaveAsButton = document.querySelector('body .fileSaveAs');
fileSaveAsButton.addEventListener('click', saveAs);

async function saveAs(){
    fileBuffer = await window.showSaveFilePicker();
    
    let stream = await fileBuffer.createWritable();
    await stream.write(textArea.innerText);
    await stream.close();
}
