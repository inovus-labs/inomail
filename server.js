require('dotenv').config()

var helper = require('./helper');


(async () => {

    // helper.getDataFromExcel().then((data) => {
    //     console.log(data);
    // });

    let data = {
        "Subject": "Automated Email Test",
    }

    helper.sendEmailToAll(data).then((result) => {
        console.log(result);
    });
    
})();

