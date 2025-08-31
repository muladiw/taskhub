package main

import (
	"fmt"
	"log"
	"os"
	"strconv"

	"taskhub/internal/config"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	db := config.NewDatabase()
	validate := config.NewValidator()
	app := config.NewFiber()

	config.Bootstrap(&config.BootstrapConfig{
		DB:       db,
		App:      app,
		Validate: validate,
	})

	port, err := strconv.Atoi(os.Getenv("PORT"))
	if err != nil {
		fmt.Println(err)
	}

	err = app.Listen(fmt.Sprintf(":%d", port))
	if err != nil {
		fmt.Printf("Failed to start server: %v", err)
	}
}
