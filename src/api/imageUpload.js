let db;
let dbVersion = 1;


document.addEventListener('DOMContentLoaded', () => {
    console.log('dom content loaded');

    document.querySelector('#pictureTest').addEventListener('change', doFile);

    document.querySelector('#testImageBtn').addEventListener('click', doImageTest);

    initDb();
});

function initDb() {
    let request = indexedDB.open('pictures', dbVersion);

    request.onerror = function() {
        console.error('Unable to open database.');
    }

    request.onsuccess = function(e) {
        db = e.target.result;
        console.log('db opened');
    }

    request.onupgradeneeded = function(e) {
        let db = e.target.result;
        db.createObjectStore('cachedForms', {keyPath:'id', autoIncrement: true});

    }
}

function doFile(e) {
    console.log('change event fired for input field');
    let file = e.target.files[0];
    var reader = new FileReader();
//				reader.readAsDataURL(file);
    reader.readAsBinaryString(file);

    reader.onload = function(e) {
        //alert(e.target.result);
        let bits = e.target.result;
        let ob = {
            created:new Date(),
            data:bits
        };

        let trans = db.transaction(['cachedForms'], 'readwrite');
        let addReq = trans.objectStore('cachedForms').add(ob);

        addReq.onerror = function(e) {
            console.log('error storing data');
            console.error(e);
        }

        trans.oncomplete = function() {
            console.log('data stored');
        }
    }
}

function doImageTest() {
    console.log('doImageTest');
    let image = document.querySelector('#testImage');
    let recordToLoad = parseInt(document.querySelector('#recordToLoad').value,10);
    if(recordToLoad === '') recordToLoad = 1;

    let trans = db.transaction(['cachedForms'], 'readonly');
    //hard coded id
    let req = trans.objectStore('cachedForms').get(recordToLoad);
    req.onsuccess = function(e) {
        let record = e.target.result;
        console.log('get success', record);
        image.src = 'data:image/jpeg;base64,' + btoa(record.data);
    }
}