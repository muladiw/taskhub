package main

import (
	"fmt"
	"log"
	"os"

	"taskhub/internal/config"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	dbHost := os.Getenv("DB_HOST")
	fmt.Println(dbHost)
	db := config.NewDatabase()
	// validate := config.NewValidator()
	// app := config.NewFiber()

	// config.Bootstrap(&config.BootstrapConfig{
	// 	DB:       db,
	// 	App:      app,
	// 	Log:      log,
	// 	Validate: validate,
	// 	Config:   viperConfig,
	// 	Producer: producer,
	// })

	// webPort := viperConfig.GetInt("web.port")
	// err := app.Listen(fmt.Sprintf(":%d", webPort))
	// if err != nil {
	// 	log.Fatalf("Failed to start server: %v", err)
	// }
}
