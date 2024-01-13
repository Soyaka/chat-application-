package main

import (
	"fmt"
	"net/http"

	"github.com/Soyaka/chat-application/pkg/websockets"
)

func serveWS(pool *websockets.Pool, w http.ResponseWriter, r *http.Request) {
	fmt.Println("websocket Point Reached")
	conn, err := websockets.Upgrade(w, r)
	if err != nil {
		fmt.Fprintf(w, "%+V\n", err)
	}
	client := &websockets.Client{
		Conn: conn,
		Pool: pool,
	}
	pool.Register <- client
	client.Read()
}

func setupRoutes() {

	pool := websockets.NewPool()
	go pool.Start()
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWS(pool, w, r)
		fmt.Println(r.RemoteAddr)
	})
}

func main() {

	fmt.Println("hello")
	setupRoutes()
	err := http.ListenAndServe(":3006", nil)
	if err != nil {
		fmt.Print(err)
	}
}
