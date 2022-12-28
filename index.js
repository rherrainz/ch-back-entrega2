const fs =  require('fs');

class ProductManager {
    constructor(path){
        this.path = path;
    }
    async getProducts(){
        try{
            if(fs.existsSync(this.path)){
                const infoProducts = await fs.promises.readFile(this.path, 'utf-8');
                const infoProductsJS = JSON.parse(infoProducts);
                return infoProductsJS;
            }else{
                return [];
            }
        }catch(error){
            console.log(error);
            throw new Error(error);
        }
    }
    async addProduct(title,description,price,thumbnail,code,stock){
        try{
            const products = await this.getProducts();

            const product ={
                id: this.#generateId(),
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
            products.push(product);
            await fs.promises.writeFile(this.path,JSON.stringify(products));
        }catch(error){
            console.log(error);
            throw new Error(error);
        }
    }

    async getProductById(id){
        const products = await this.getProducts();
        const product = products.find((product) => product.id === id);
        if (product === undefined)  return console.log("Not found")
        else return product;
    }
    async updateProductById(id,title,description,price,thumbnail,code,stock){
        const products = await this.getProducts();
        const product = products.find((product) => product.id === id);
        if (product === undefined)  return console.log("Not found")
        else {
            product.title = title;
            product.description = description;
            product.price = price;
            product.thumbnail = thumbnail;
            product.code = code;
            product.stock = stock;
        }
        products.push(product);
        await fs.promises.writeFile(this.path,JSON.stringify(products));
    }

    async deleteProductById(id){
        const products = await this.getProducts();
        const product = products.find((product) => product.id === id);
        if (product === undefined)  return console.log("Not found")
        else {
            const index = products.indexOf(product);
            products.splice(index,1);
        }
        await fs.promises.writeFile(this.path,JSON.stringify(products));
    }

    async #generateId(){
        const products = await this.getProducts();
        const id = products.length === 0
         ? 1 
         : products[products.length -1].id + 1;
        console.log(id);
        return id;
    }

}

const getProducts = new ProductManager('./products.json');
getProducts.addProduct("producto prueba","este es un producto prueba",200,"sin imagen","abc123",25);
//console.log(getProducts.getProducts());
//getProducts.addProduct("producto prueb 2","este es un producto prueba",200,"sin imagen","abc123",25);