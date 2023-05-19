const ProductManager = require("./ProductManager2");
const express = require("express");
const app = express();


const productManager = new ProductManager('product.json');


app.get("/products", async (req, res) =>{

    const limit = req.query.limit;
    const products = await productManager.getProducts();

    const oneElem = limit ? limit : products.length;
        return res.status(200).json(products.slice(0, oneElem));

})


app.get("/products/:pid", async (req, res)=>{

    const pid = req.params.pid;
    const products = await productManager.getProductById(parseInt(pid));

    if(products != undefined){
        return res.status(201).json(
        {message: "Producto con el id: ",    
	     data: products
        });   
    }else{    
        return res.status(404).json(
        {message: "No existe el producto con el id: " + pid,    
         data: {}
        });
    }

});


app.listen(8080, ()=>{
    console.log("the port 8080 is on!");
})