const API_URL = 'http://localhost:4000'
const transport = fetch;

const request = (transport, url, method = "GET", body = null, auth) => {
  let options = {
    method: "",
    headers: {}
  };
  if (method) {
    options.method = method;
    if (method === "PUT") {
      options.body = body;
    } else if ((method === "POST" || method === "PATCH") && body) {
      options.body = JSON.stringify(body);
      options.headers["Content-Type"] = "application/json";
      if (auth) {
        options.headers["Authorization"] = auth;
      }
    }
  }
  return transport(API_URL + url, options).then(
    res => {
      if (res.status >= 200 && res.status <= 300) {
        return res.json();
      } else {
        alert(res.status + " " + res.statusText);
      }
    },
    rej => {
      throw rej;
    }
  );
};

/*
User routes:
method: POST http://ec2-3-84-16-108.compute-1.amazonaws.com:4000/signUp -register  
method: POST http://ec2-3-84-16-108.compute-1.amazonaws.com:4000/signIn - authentificate

Hall routes:
method: POST http://ec2-3-84-16-108.compute-1.amazonaws.com/halls - create hall, only for admins 
method: DELETE  http://ec2-3-84-16-108.compute-1.amazonaws.com:4000/halls - delete hall, only for admins
method: GET http://ec2-3-84-16-108.compute-1.amazonaws.com:4000/halls - view all halls (open)

Ticket routes:
method: POST http://ec2-3-84-16-108.compute-1.amazonaws.com:4000/tickets - create ticket
method: DELETE  http://ec2-3-84-16-108.compute-1.amazonaws.com:4000/tickets/:id - delete ticket (only yours)
method: GET http://ec2-3-84-16-108.compute-1.amazonaws.com:4000/tickets - view all tickets (open)
method: GET http://ec2-3-84-16-108.compute-1.amazonaws.com:4000/ticketsparams/:from/:to - get tickets by period of time (open)
method: PUT  http://ec2-3-84-16-108.compute-1.amazonaws.com:4000/ticket/:id - update ticket 
example {
  "from": "1223232323232",
    "to": "1557225361603",
      "title": "aaaaaaaaaaaaaaaaaaaaaaaaaaa"
}

Dev routes:
method: DELETE  http://ec2-3-84-16-108.compute-1.amazonaws.com:4000/deleteall - Drop tickets collection;
*/
// const restInterface = {
//   userSignUp() {

//   },
//   getHalls() {
//     return request('/halls')
//   },
//   getTickets() {
//     return request('/tickets')
//   },
//   addList(body) {
//     return request('/lists', 'POST', body)
//   },
//   delList(listId) {
//     return request(`/lists/${listId}`, 'DELETE')
//   },
//   addItem(body) {
//     return request('/items', 'POST', body)
//   },
//   delItem(itemId) {
//     return request(`/items/${itemId}`, 'DELETE')
//   },
//   editItem(itemId, body) {
//     return request(`/items/${itemId}`, 'PATCH', body)
//   }
// }

class RestInterfaceClass {
  constructor(httpClient) {
    this.client = httpClient;
  }
  userSignUp(body) {
    return this.client(transport, '/signUp', 'POST', body)
  }
  userSignIn(body) {
    return this.client(transport, '/signIn', 'POST', body)
  }
  getHalls() {
    return this.client(transport, '/halls')
  }
  addHall(body, auth) {
    return this.client(transport, '/halls', 'POST', body, auth)
  }
  delHall(hallId, auth) {
    return this.client(transport, `/lists/${hallId}`, 'DELETE', null, auth)
  }
  getTickets() {
    return this.client(transport, '/tickets')
  }
  getTicketsRange(from, to) {
    return this.client(transport, `/ticketsparams/${from}/${to}`)
  }
  addTicket(body, auth) {
    return this.client(transport, '/tickets', 'POST', body, auth)
  }
  editTicket(ticketId, body, auth) {
    return this.client(transport, `/tickets/${ticketId}`, 'POST', body, auth)
  }
  delTicket(ticketId, auth) {
    return this.client(transport, `/tickets/${ticketId}`, 'DELETE', null, auth)
  }
  // addList(body) {
  //   return this.client('/lists', 'POST', body)
  // }
  // delList(listId) {
  //   return this.client(`/lists/${listId}`, 'DELETE')
  // }
  // addItem(body) {
  //   return this.client('/items', 'POST', body)
  // }
  // delItem(itemId) {
  //   return this.client(`/items/${itemId}`, 'DELETE')
  // }
  // editItem(itemId, body) {
  //   return this.client(`/items/${itemId}`, 'PATCH', body)
  // }
}

// const apiClient = Object.create(restInterface);
const restClient = new RestInterfaceClass(request)
// console.log('API CLIENTY', apiClient)
export default restClient;