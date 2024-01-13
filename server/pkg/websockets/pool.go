package websockets

import (
	"fmt"
)

type Pool struct {
	Register   chan *Client
	Unregister chan *Client
	Clients    map[*Client]bool
	Broadcast  chan Message
}

func NewPool() *Pool {
	return &Pool{
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan Message),
	}
}

var MessagesList []string

func (pool *Pool) Start() {

	for {
		select {
		case client := <-pool.Register:
			pool.Clients[client] = true
			fmt.Println("size of connection pool:", len(pool.Clients))

			for client, _ := range pool.Clients {
				fmt.Println(client)
				client.Conn.WriteJSON(Message{
					Type: 1,
					Body: "new user joins",
				})

			}
			break
		case client := <-pool.Unregister:
			//delete(pool.Clients, client)
			fmt.Println("a user just leave", client.ID)

			for client, _ := range pool.Clients {
				client.Conn.WriteJSON(Message{
					Type: 1,
					Body: "a user just leave",
				})

			}
			break
		case message := <-pool.Broadcast:
			fmt.Println("sending msg to clients")

			for client, _ := range pool.Clients {
				MessagesList = append(MessagesList, message.Body)
				if err := client.Conn.WriteJSON(message); err != nil {
					fmt.Println(err)
					return
				}

			}
		}
	}
}
