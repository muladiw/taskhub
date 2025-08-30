package main

import (
	// "fmt"
	"log"

	"taskhub/internal/config"
	"taskhub/internal/model"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	db := config.NewDatabase()

	db.AutoMigrate(&model.Task{}, &model.User{}, &model.Authentication{})
}
