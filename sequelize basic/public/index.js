    let fileOpenButton = document.querySelector('body .fileOpen');
    let textArea = document.querySelector('pre');
    let fileBuffer = null;
    
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
    
        //interface file data
        let text = await fileData.text();
        textArea.innerText = text;
        //console.log(text);
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

    //button link
    let checkButton = document.getElementById('checkBTN');
    checkButton.addEventListener('click', ()=>{
        //console.log('page linked');
        location.href = 'http://localhost:3300/tables';
    });

    let loginButton = document.getElementById('loginBTN');
    loginButton.addEventListener('click', ()=>{
        //console.log('page linked');
    });