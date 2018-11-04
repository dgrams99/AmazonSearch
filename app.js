var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,
  user: "root",

  password: "password",
  database: "bamazon"
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
  start();
  });

  function start(){

    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.log(results)
        
        
      inquirer
        .prompt([
          {
            name: "item",
            type: "input",
            message: "What item ID would like to buy?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
          },
          {
            name: "stock",
            type: "input",
            message: "How many would you like?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
          } 
        ]).then(function(answer){
         var input = (answer.item -1);
        if(results[input].quantity > 0 ){

        //   var input = (answer.item -1);
          var price = results[input].price;
          

             var stockPrice = (answer.stock * price)
             var sale = (results[input].quantity - answer.stock)
            console.log(sale)
             connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                  {
                    quantity: sale
                  },
                  {
                  id: answer.item
                  }
                ],
                function(error) {
                    if (error) throw err;
                    start();
                    console.log("------------------------------ ")
                    console.log(`THANK YOU ORDER PLACED THAT WILL BE $${stockPrice} `)
                    console.log("------------------------------ ")
                    
                  }
             )
            }else{
                start();
                console.log("------------------------------ ")
                console.log("NOT ENOUGHT IN STOCK!!!!!!! ")
                console.log("------------------------------ ")
                
            }

         })

    });   
  }
  function buy(){

  }