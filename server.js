require('dotenv').config()

var helper = require('./helper');


(async () => {

    // helper.getDataFromExcel().then((data) => {
    //     console.log(data);
    // });

    let data = {
        "Subject": "Test Email from NodeJS",
    }

    helper.sendEmailToAll(data).then((result) => {
        console.log(result);
    });
    
})();

