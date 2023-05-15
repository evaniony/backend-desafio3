const fs = require("fs");

class ProductManager{
    constructor(path){
        //inicializar con array vacio;
        //this.path = "product.json";
        this.path = path;
        this.products = [];

        //validar
        if(!fs.existsSync(this.path)){
            //crear
            fs.writeFileSync(this.path, "[]");
        }
    }

    //validar --- codigo repetido; 
    //null, undefined, "";


    async addProduct(title, description, price, thumbnail, code, stock){
        //el objeto lo guardamos en una variable;
        //cuerpo del objeto;
        let newProduct = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        }
        //leer el archivo para corroborar si existe o no;
        const readFile = await fs.promises.readFile(this.path, "utf-8");
        //console.log(readFile);

            //SI EXISTE ...
            //lo parseamos;
            let parse = JSON.parse(readFile);
            //visualimos cuantos indices hay, y le sumamos ese valor al siguiente producto como id;
            let id = parse.length;
            newProduct = {id: id, ...newProduct}
            //y finalmente, agregue a ese producto;
            parse.push(newProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(parse));
        /* else{
            //agregar producto + id autoincrementable + guardarlo como array;
            //SINO EXISTE
            //que lo agregue y que inicie en 0;
            //newProduct = {...this.products};
            //no olvidar que newProduct es un objeto, por lo cual lo metemos a un array;
            newProduct = {id: 0, ...newProduct};
            await fs.promises.appendFile(this.path, JSON.stringify([newProduct]));
        } */

        return newProduct;
    }

    async getProducts(){
        //primero, que lea el arreglo;
        const read = await fs.promises.readFile(this.path, "utf-8");
        const readParse = JSON.parse(read);
        //console.log(read);
        return readParse;
    }

    async getProductById(id){
        //si existe...
        //if(fs.existsSync(this.path)){
            //lea el archivo;
            const read = await fs.promises.readFile(this.path, "utf-8");
            //si existe el objeto;
            if(read){
                //parsear, buscarlo por id y que lo devuelva
                const readParse = JSON.parse(read);
                const product = readParse.find(e => e.id === id);
                return product;
            }else{
                return undefined;
            }
        //}
    }

    async updateProduct(id, prop, value){
        //recibe el id como parametro, y se puede modificar;
        let read = await fs.promises.readFile(this.path, "utf-8");
            read = JSON.parse(read);

        //cambia el valor;
        /* const update = read.map(products =>{ 
            if(products.id === id){
                const newArray = { ...products, [prop]: value}
                console.log(newArray);
                return newArray;
            }
            return products;
        }) */
        const update = read.find(prod => prod.id == id);
        if(update){
            const newArray = { ...products, [prop]: value}
                //console.log(newArray);
                return newArray;
        }
        await fs.promises.writeFile(this.path, JSON.stringify(update));
    }

    async deleteProduct(id){
        //leer el archivo;
        let read = await fs.promises.readFile(this.path, "utf-8");
        let readParse = JSON.parse(read);
        const deleteId = readParse.filter(e => e.id !== id);
        return deleteId;
    }

}

//const productManager = new ProductManager("product.json");


/* const production = async () =>{
const prod1 = await productManager.addProduct("Maceta", "Maceta de ceramica", 2500, "#", 10);
const prod2 = await productManager.addProduct("Taza", "Taza de ceramica", 2000, "#", 12);
const prod3 = await productManager.addProduct("Plato", "Plato de vidrio", 1200, "#", 2001, 20);

}
/* const allProducts = await productManager.getProducts()
console.log(allProducts); */
/* const idProduct = await productManager.getProductById(1);
console.log(idProduct); */
/* const deleteId = await productManager.deleteProduct(2);
console.log(deleteId); */

//production(); */

module.exports = ProductManager;

/* productManager.addProduct("Maceta", "Maceta de ceramica", 2500, "#", 10);
productManager.addProduct("Taza", "Taza de ceramica", 2000, "#", 12);
//productManager.updateProduct(5, "description", "Hecho con resina");
/* const allProducts = productManager.getProducts()
console.log(allProducts); */
/* const idProduct = productManager.getProductById(1);
console.log(idProduct); */
//const deleteId = productManager.deleteProduct(2);
//console.log(deleteId);
