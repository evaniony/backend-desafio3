const ProductManager = require("./ProductManager2");
const express = require("express");
const app = express();

//get /products; 
//debe devolverlos dentro de un objeto;
//query params --- ?limit=
//si no recibe ningun limite, devuelve todos los productos;
//si lo recibe, devolvera el numero de productos solicitados;
// get /products/:pid --- req.param, el product id 
//solo devolvera, el producto solicitado;

const productManager = new ProductManager('product.json');

app.get("/products", async (req, res) =>{
    const limit = req.query.limit;
    //verificar si existe...
    if(!limit){
        try{
            //que devuelva todos los productos;
            const products = await productManager.getProducts();
            console.log(products);
            return res.json(products);
        }catch(err){
            //next(err);
        }
    }else{
        try{
            const products = await productManager.getProducts();
            //si el limit existe, que muestre todos los productos; sino, que obtenga el los indices del array;
            const oneElem = limit ? limit : products.length;
            //envie el nuevo array con el metodo slice; con el indice 0 hasta el valor del limit asignado; 
            return res.json(products.slice(0, oneElem));
        }catch(err){
            //next(err)
        }
    }
})

app.get("/products/:pid", async (req, res)=>{
    const pid = req.params.pid;

    try {
        const products = await productManager.getProductById(pid);
        console.log(products);
        return res.json(products);
    } catch (error) {
        //next(error)
    }
})




app.listen(8080, ()=>{
    console.log("the port 8080 is on!");
})