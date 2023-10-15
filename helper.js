var nodemailer = require('nodemailer');
var handlebars = require('handlebars');
var ExcelJS = require('exceljs');

var fs = require('fs');
const path = require('path');

const email_list = path.join(__dirname, './public/email_list.xlsx');
const email_content = path.join(__dirname, './public/email_content.hbs');
const email_assets = path.join(__dirname, './public/assets/');


module.exports = {

    // Send email with attachments to a single recipient
    sendEmail: async (email, subject, body, attachments) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        var mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            html: body,
            attachments: attachments ? attachments : null
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return false;
            } else {
                console.log('Email sent: ' + info.response);
                return true;
            }
        });
    },


    // Get email list from excel file and return as array of objects
    getDataFromExcel: async () => {
        var workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(email_list);
        
        var worksheet = workbook.getWorksheet(1);
        var data = [];

        worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
            if (rowNumber != 1) {
                var obj = {};
                row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                    obj[worksheet.getRow(1).getCell(colNumber).value] = cell.value;
                });

                if (typeof obj['email_address'] === 'object') {
                    obj['email_address'] = obj['email_address']['text'];
                }

                var assets = [];
                Object.keys(obj).forEach(key => {
                    if (key.includes('asset_')) {
                        var asset = {};

                        asset['filename'] = obj[key];
                        asset['path'] = email_assets + `${key}\\` + obj[key];

                        assets.push(asset);
                        delete obj[key];
                    }
                });
                obj['assets'] = assets;

                data.push(obj);
            }
        });
        
        return data;
    },


    // Generate email body from content and data
    generateEmailBody: async (content, data) => {
        var template = handlebars.compile(content);
        var body = template(data);
        return body;
    },
    

    // Send email to all recipients
    sendEmailToAll: async (data) => {
        var content = fs.readFileSync(email_content, 'utf8').toString();

        await module.exports.getDataFromExcel().then((result) => {
            result.forEach((item) => {
        
                module.exports.generateEmailBody(content, item).then((body) => {
                    module.exports.sendEmail(item['email_address'], data['Subject'], body, item['assets']);
                });
                
            });
        });
    }

    

};