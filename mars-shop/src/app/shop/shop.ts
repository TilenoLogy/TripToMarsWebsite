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
        const cartItem = this.cart.find(item => item.product.id === product.id);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            this.cart.push({product:product, quantity:1});
        }

        this.skupnaCena += Math.round(Number(product.cena)*100)
    }

    increaseQuantity(productId: number) {
        const cartItem = this.cart.find(item => item.product.id === productId);
        if (!cartItem) {
            return;
        }

        cartItem.quantity++;
        this.skupnaCena += Math.round(Number(cartItem.product.cena) * 100);
    }

    decreaseQuantity(productId: number) {
        const cartIndex = this.cart.findIndex(item => item.product.id === productId);
        if (cartIndex === -1) {
            return;
        }

        const cartItem = this.cart[cartIndex];
        cartItem.quantity--;
        this.skupnaCena -= Math.round(Number(cartItem.product.cena) * 100);

        if (cartItem.quantity === 0) {
            this.cart.splice(cartIndex, 1);
        }
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