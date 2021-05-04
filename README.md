# Lab 11 - 401 JavaScript
# CAPS - The Code Academy Parcel Service
## Author: Lydia Minehan-Tubic

### Links and Resources

✨ [Pull Request](https://github.com/LydiaMT/caps/pull/1)

### Set Up

- [Node.js Docs](https://nodejs.org/api/events.html)
- [faker.js](https://www.npmjs.com/package/faker) to use fake data
- [Swagger.io](https://inspector.swagger.io/builder) to test requests 

### User Stories

#### Client

- As a vendor, I want to alert the system when I have a package to be picked up
- As a driver, I want to be notified when there is a package to be delivered
- As a driver, I want to alert the system when I have picked up a package and it is in transit
- As a driver, I want to alert the system when a package has been delivered
- As a vendor, I want to be notified when my package has been delivered

#### Developer

- As a developer, I want to use industry standards for managing the state of each package
- As a developer, I want to create an event driven system so that I can write code that happens in response to events, in real time

### Technical Requirements

The CAP system should have the following modules:
- `events.js`: Global Event Pool (shared by all modules)
- `caps.js`: Main Hub Application
  - Manages the state of every package (ready for pickup, in transit, delivered, etc)
  - Logs every event to the console with a timestamp and the event payload
  - i.e. “EVENT {}”
- `vendors.js`: Vendor Module
  - Declare your store name (perhaps in a .env file, so that this module is re-usable)
  - Every 5 seconds, simulate a new customer order
    - Create a fake order, as an object: { storeName, orderId, customerName, address }
    - Emit a ‘pickup’ event and attach the fake order as payload. **HINT**: Have some fun by using the faker library to make up phony information
  - Monitor the system for events. Whenever the ‘delivered’ event occurs, Log “thank you” to the console

- `driver.js`: Drivers Module
  - Monitor the system for events
  - On the ‘pickup’ event: 
    - (1) Wait 1 second, (2) Log “DRIVER: picked up [ORDER_ID]” to the console, (3) Emit an ‘in-transit’ event with the payload you received
    - (1) Wait 3 seconds, (2) Log “delivered” to the console, (3) Emit a ‘delivered’ event with the same payload

### Data Model
```js
EVENT { event: 'pickup',
  time: 2020-03-06T18:27:17.732Z,
  payload:
   { store: '1-206-flowers',
     orderID: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
     customer: 'Jamal Braun',
     address: 'Schmittfort, LA' } }
DRIVER: picked up e3669048-7313-427b-b6cc-74010ca1f8f0
EVENT { event: 'in-transit',
  time: 2020-03-06T18:27:18.738Z,
  payload:
   { store: '1-206-flowers',
     orderID: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
     customer: 'Jamal Braun',
     address: 'Schmittfort, LA' } }
DRIVER: delivered up e3669048-7313-427b-b6cc-74010ca1f8f0
VENDOR: Thank you for delivering e3669048-7313-427b-b6cc-74010ca1f8f0
EVENT { event: 'delivered',
  time: 2020-03-06T18:27:20.736Z,
  payload:
   { store: '1-206-flowers',
     orderID: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
     customer: 'Jamal Braun',
     address: 'Schmittfort, LA' } }
...
```

### Test

run `node caps.js` to see the output of your console logs in your terminal 

### UML/WRRC

![UML](./img/Lab11uml.jpg)

### Contributors & Resources

- Thank you Dan Engel for helping me organize my events