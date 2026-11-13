import { ChangeDetectorRef, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  imports: [FormsModule],
  selector: 'app-shop',
  styleUrl: './shop.css',
  templateUrl: './shop.html',
})
export class Shop {
    cart: any[] = [];
    skupnaCena: number = 0;
    orderSubmitted = false;
    orderSubmitting = false;
    orderError = '';
    orderDetails = {
        firstName: '',
        lastName: '',
        location: '',
        paymentMethod: 'card',
    };

    constructor(
        private http: HttpClient,
        private changeDetector: ChangeDetectorRef,
    ) {}


    addToCart(product: any) {
        this.orderSubmitted = false;
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

    submitOrder() {
        if (this.cart.length === 0 || this.orderSubmitting) {
            return;
        }

        this.orderSubmitting = true;
        this.orderError = '';
        const order = {
            customer: this.orderDetails,
            items: this.cart.map(item => ({
                productId: item.product.id,
                quantity: item.quantity,
            })),
        };

        this.http.post<{ orderId: number }>('/api/orders', order).subscribe({
            next: () => {
                this.cart = [];
                this.skupnaCena = 0;
                this.orderSubmitted = true;
                this.orderSubmitting = false;
                this.changeDetector.detectChanges();
            },
            error: () => {
                this.orderError = 'We could not save your order. Please try again.';
                this.orderSubmitting = false;
                this.changeDetector.detectChanges();
            },
        });
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