const mysql = require('mysql2')

const dbconnect = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'manhnd40',
    database:'registrytotal'
})

dbconnect.connect(function(error){
	if(error)
	{
		throw error;
	}
	else
	{
		console.log('MySQL Database is connected Successfully');
	}
});

module.exports = dbconnect;