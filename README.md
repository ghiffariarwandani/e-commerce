# e-commerce

### Register :
```sh
URL: localhost:3000/user/signup
METHOD : POST
Authenticated Required : NO
Authorized Required : NO
Data Input :
    {
        username: "ghiffari",
        email: "ghiffariarw@gmail.com",
        password: "123123",
        phone: "03928372736662",
        address: "bdb 2 blok at 18"    
    }
Response Status : 201
Data Output :
    {
        "_id": "5ccf109c227c7e1387ab12f1",
        "username": "ghiffariarw",
        "email": "ghiffariarw@gmail.com",
        "password": "$2a$10$BwEf3Bwsa8PJfliNr7UVOOoHPU0z8ucUdyt9JyJzM4KU3hdTwxHTW",
        "phone": "03928372736662",
        "address": "bdb 2 blok at 18"   
        "__v": 0
    }
Response Status : 400 Bad Request
Output :
    "User validation failed: name: Name is required, email: Email is required, password: Password is required"

Response Status : 500
Output :
    "Internal Server Error"
```
### Login :
```sh
URL: localhost:3000/user/signin
METHOD : POST
Authenticated Required : NO
Authorized Required : NO
Data Input :
    {
        email: "ghiffariarw@mail.com",
        password: "123123"
    }
Response Status : 200
Data Output :
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZDY2MjM1YjM5NWYxNDNmNzU5YzY3YiIsImVtYWlsIjoibmFydXRvQGdtYWlsLmNvbSIsImlhdCI6MTU1NzYxOTUwNywiZXhwIjoxNTU3NzA1OTA3fQ.ybuqEKrYVIzCJBGP6QjzD1Lcrd-lS08q5BOwNtnNFCo",
        "currentUser": {
            "_id": "5ccf109c227c7e1387ab12f1",
            "username": "ghiffariarw",
            "email": "ghiffariarw@gmail.com",
            "phone": "03928372736662",
            "address": "bdb 2 blok at 18"   
        }
    }

Response Status : 400 Bad Request
Output :
    {
        "err": "email/password wrong!"
    }
Response Status : 500
Output :
    "Internal Server Error"
```
### Find By Id :
```sh
localhost:3000/users/5ccf109c227c7e1387ab12f1
METHOD : GET
Authenticated Required : NO
Authorized Required : NO
Response Status : 200
    {
        "_id": "5ccf109c227c7e1387ab12f1",
        "username": "ghiffariarw",
        "email": "ghiffariarw@gmail.com",
        "password": "$2a$10$BwEf3Bwsa8PJfliNr7UVOOoHPU0z8ucUdyt9JyJzM4KU3hdTwxHTW",
        "phone": "03928372736662",
        "address": "bdb 2 blok at 18"   
        "__v": 0
    }
Response Status : 500
Output :
    "Internal Server Error"
```
### list Product:
```sh
http://localhost:3000/product
METHOD : GET
Authenticated Required : NO
Authorized Required : NO
Response Status : 200
[
    {
    "trackList": [
      "The Sailor",
      "Rapapa (feat.RZA )",
      "Kids",
      "Drive Safe",
      "Confetti",
      "Vacant",
      "No Worries",
      "100 Degress",
      "Slow Down Turbo",
      "Curious",
      "Where Does The Time Go (feat.Joji)"
    ],
    "_id": "5d611e2d1c9d440000688bd9",
    "artistName": "Rich Brian",
    "albumName": "The Sailor",
    "albumCover": "https://m.media-amazon.com/images/I/91FjhPyCVuL._SS500_.jpg",
    "quantity": 47,
    "price": 12,
    "genre": "Trap Hip Hop",
    "year": "2019",
    "updatedAt": "2019-08-25T20:18:27.277Z"
  },
    {...},{...},{...}
]
Response Status : 500
Output :
    "Internal Server Error"
```
### Create Product :
```sh
http://localhost:3000/product
METHOD : POST
Authenticated Required : NO
Authorized Required : NO
Data Input :
    {
        artistName: "Benard",
        albumName: "enak",
        albumCover: "...png",
        quantity: "50",
        price: "10",
        genre: "Hip Hop Goyang",
        year: "2018"
        trackList: [
          0: "mantap cui",
          1: "ga cui",
          2: "yoi cui"
        ]

    }

Response Status : 200
Data Output :
    {
        "artistName": "Benard",
        "albumName": "enak",
        "albumCover": "...png",
        "quantity": "50",
        "price": "10",
        "genre": "Hip Hop Goyang",
        "year": "2018"
        trackList: [
          0: "mantap cui",
          1: "ga cui",
          2: "yoi cui"
        ]
    }

Response Status : 500
Output :
    "Internal Server Error"
```
### Update Product :
```sh
http://localhost:3000/product/5cd6d56b2fc1c94b08fde8c9
METHOD : PATCH
Authenticated Required : YES
Authorized Required : YES
Response Status : 200
    "Success"
Response Status : 404
Output :
    {
        "msg": "You dont have access"
    }

Response Status : 400 Bad Request
Output :
    "Token wrong!"
Response Status : 500
Output :
    "Internal Server Error"
```
### list Carts:
```sh
http://localhost:3000/cart
METHOD : GET
Authenticated Required : YES
Authorized Required : NO
Response Status : 200
[
  {
    "_id": "5d6322c075a4a0d30d5778ce",
    "ProductId": {
      "trackList": [
        "Stargazing",
        "Carousel",
        "Sicko Mode",
        "R.I.P Screw",
        "Stop Trying To Be God",
        "No Bystanders",
        "Skeletons",
        "Wake Up",
        "5% Tint",
        "NC-17",
        "Astrothunder",
        "Yosemite",
        "Can't Say",
        "Who? What!",
        "Butterfly Effect",
        "Housetonfornication",
        "Coffee Bean"
      ],
      "_id": "5d61298ac553e345afffe983",
      "artistName": "Travis Scott",
      "albumName": "Astroworld",
      "albumCover": "https://m.media-amazon.com/images/I/81bCqW8HNvL._SS500_.jpg",
      "quantity": 45,
      "price": 10,
      "genre": "Hip Hop Music",
      "year": "2018",
      "createdAt": "2019-08-24T12:11:54.424Z",
      "updatedAt": "2019-08-26T00:07:28.270Z",
      "__v": 0
    },
    "UserId": {
      "_id": "5d62a869cd00c79f91dc7736",
      "username": "ghiffariarw"
    },
    "quantity": 1,
    "totalPrice": 10,
    "__v": 0
  }
]
Response Status : 500
Output :
    "Internal Server Error"
```
### Create Cart :
```sh
http://localhost:3000/cart
METHOD : POST
Authenticated Required : YES
Authorized Required : NO
Data Input :
    {
        ProductId: "29371829192",
        UserId: "1928192010312",
        quantity: 1,
        totalPrice: 4
    }

Response Status : 200
Data Output :
    {
        ProductId: "29371829192",
        UserId: "1928192010312",
        quantity: 1,
        totalPrice: 4
    }
Response Status : 400 Bad Request
Output :
    "Token wrong!"
Response Status : 500
Output :
    "Internal Server Error"
```
### Delete Cart :
```sh
http://localhost:3000/cart/5cd767ebaaa5a74b2da055fc
METHOD : DELETE
Authenticated Required : YES
Authorized Required : YES
Response Status : 200
    {
        "_id": "5cd767ebaaa5a74b2da055fc",
        "ProductId": "{...}",
        "UserId": "{...}",
        "quantity": "200",
        "totalPrice": "9" 
        "__v": 0
    }
Response Status : 404
Output :
    {
        "msg": "You dont have access"
    }

Response Status : 400 Bad Request
Output :
    "Token wrong!"

Response Status : 500
Output :
    "Internal Server Error"
```
### List User Transactions :
```sh
http://localhost:3000/transaction
METHOD : GET
Authenticated Required : YES
Authorized Required : NO
Response Status : 200
    "Success"
Response Status : 400 Bad Request
Output :
    "Token wrong!"
Response Status : 500
Output :
    "Internal Server Error"
```
### Create Transaction :
```sh
http://localhost:3000/transaction
METHOD : POST
Authenticated Required : YES
Authorized Required : NO
Data Input :
    {
        UserId: "012838cgy876s6d5q",
        ProductId: ["012938sasduas8d68as6d6sad8", "8a7sd87a8s7d8as7d6a7"],
        totalPayment: 58
    }

Response Status : 200
Data Output :
    {
        "_id": "5cd767ebaaa5a74b2da055fc",
       "UserId": "012838cgy876s6d5q",
       "ProductId": ["012938sasduas8d68as6d6sad8", "8a7sd87a8s7d8as7d6a7"],
       "totalPayment": 58,
       "status": "paid"
        "__v": 0
    }

Response Status : 400 Bad Request
Output :
    "Token wrong!"
Response Status : 500
Output :
    "Internal Server Error"
```
### Update Transaction Status:
```sh
http://localhost:3000/transaction/:id/?status=completed
METHOD : PATCH
Authenticated Required : YES
Authorized Required : YES
Response Status : 200
    {
       "msg" : "Success"
    }
Response Status : 404
Output :
    {
        "msg": "You dont have access"
    }

Response Status : 400 Bad Request
Output :
    "Token wrong!"

Response Status : 500
Output :
    "Internal Server Error"
```
```
```
e-commerce
----
**Free Software, Yeah!**
