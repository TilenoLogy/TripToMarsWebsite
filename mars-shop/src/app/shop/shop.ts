import { Component } from '@angular/core';


@Component({
  imports: [],
  selector: 'app-shop',
  styleUrl: './shop.css',
  templateUrl: './shop.html',
})
export class Shop {
    cart: any[] = [];
    
    skupnaCena: number = 0;


    addToCart(product: any) {
        const ClickedItem = this.cart.find(item => item.product.id === product.id);
        if (ClickedItem){
            ClickedItem.quantity++;
            console.log("Already exists");
            
        } else {
            this.cart.push({product:product, quantity:1});
        }

        this.skupnaCena += Math.round(Number(product.cena)*100)
        //console.log((this.skupnaCena/100).toFixed(2));
    }


  products = [
      {
          "id" : 0,
          "naziv" : "Trip to Mars T-Shirt",
          "cena" : "25.90",
          "image" : "Images/SpaceShirt.png"
      },
      {
          "id" : 1,
          "naziv" : "Trip to Mars Mug",
          "cena" : "5.90",
          "image" : "Images/MugImage.jpg"
      },
      {
          "id" : 2,
          "naziv" : "Trip to Mars Hoodie",
          "cena" : "35.90",
          "image" : "Images/SpaceHoodie.jpg"
      },
      {
          "id" : 3,
          "naziv" : "Trip to Mars Poster",
          "cena" : "20.00",
          "image" : "Images/SpacePoster.jpg"
      }
  ]
}