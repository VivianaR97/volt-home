## Getting Set Up

1. In the repo root directory, run `docker-compose build`.

2. Next, run `docker-compose up`.

## Technical Notes

- The project uses sqlite as a test DB, everytime you run the app the DB will be recreated.
- The `getUser` middleware uses the `userId` header to authenticate the user, after a user is authenticated (exists) will be available under `req.user`.
- Currently the userIds available are 1,2. The user 1 has already a Wallet, the user 2 doesn't.
- The server is running on port 3001.

## APIs

1. **_POST_** `/api/buy` - It receives the amount of BTC to buy, I assume that the payment process is done and OK, so I only update the amount of btc the user had in their wallet.

2. **_POST_** `/api/sell` - It receives the amount of BTC to sell, if the user have the amount to sell we allow the process and update their wallet.

3. **_GET_** `/api/portfolio` - Gets the portfolio information of a user, it returns the walletAmount of BTC, the btcPrice used to calculate the total and the total hold in USD

```
{
    "btcPrice": "64548.025",
    "walletAmount": 100,
    "total": 6454802.5
}
```

## In the future

1. I recommend to use typescript and add a new database more robust to have the users, wallets and all the tables needed.
2. I'll add endpoint to login the users and to create them too.
3. Sometimes the process of buy/sell could take longer of expected, if that is the case I recommend to add a queue to process the petition and return to the user the id of the request, when we finish the process we'll let the user know through notification or webhooks.
4. The BTC price could be very variant, but if we need we can add some cache for only 1min for example, to use internally in the `getBTCPrice` function.
