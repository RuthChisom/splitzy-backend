# splitzy-backend
Interact with the Splitzy smart contract to manage groups, create and split bills, and track payments.

---

## 🚀 Backend Status

| Method | Endpoint | Description              |
| ------ | -------- | ------------------------ |
| GET    | `/`      | Confirms backend is live |

---

## 🔹 Group Routes (`/groups`)

| Method | Endpoint                  | Description                            |
| ------ | ------------------------- | -------------------------------------- |
| POST   | `/groups`                 | Create a new group                     |
| GET    | `/groups?address=0x...`   | Fetch all groups a user belongs to     |
| GET    | `/groups/:groupId`        | Fetch group details by ID              |
| POST   | `/groups/bill`            | Create a new bill within a group       |
| POST   | `/groups/pay`             | Pay a bill                             |

---

## 🔹 Bill Routes (`/bills`)

| Method | Endpoint                              | Description                              |
| ------ | ------------------------------------- | ---------------------------------------- |
| GET    | `/bills/:userAddress`                 | Fetch all bills a user is part of        |
| GET    | `/bills/:billId`                      | Fetch detailed info about a specific bill|
| GET    | `/bills/:billId/amount/:userAddress`  | Get what a user owes + payment status    |

---

## 🔸 Sample Request Bodies (for POST endpoints)

### ✅ `POST /groups`

Create a new group:
```json
{
  "name": "Vacation Squad",
  "members": [
    "0xAbc123...001",
    "0xDef456...002",
    "0xGhi789...003"
  ]
}
````

---

### ✅ `POST /groups/bill`

Create a bill for a group:

```json
{
  "groupId": 0,
  "title": "Beach House Rental",
  "totalAmount": "3.0",
  "payees": [
    "0xAbc123...001",
    "0xDef456...002",
    "0xGhi789...003"
  ],
  "amounts": [
    "1.0",
    "1.0",
    "1.0"
  ]
}
```

> ℹ️ `totalAmount` should equal the sum of the individual `amounts`.

---

### ✅ `POST /groups/pay`

Pay your share of a bill:

```json
{
  "billId": 0
}
```

---

## 📌 Notes for Frontend Integration

* All user-related routes (e.g. `GET /groups`, `GET /bills`) depend on the connected wallet address.
* Values like `groupId`, `billId`, `amounts`, etc., are passed as strings to maintain precision with Solidity.
* The backend assumes the user has already connected their wallet and signed necessary transactions client-side.

---

## 📫 Contact

For questions or issues, contact the backend team via the twitter @thischisom

```

---
