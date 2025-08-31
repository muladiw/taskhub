package config

import (

	// "taskhub/internal/http/middleware"
	"taskhub/internal/http"
	"taskhub/internal/http/middleware"
	"taskhub/internal/http/route"
	"taskhub/internal/repository"
	"taskhub/internal/usecase"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"

	// "github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"gorm.io/gorm"
)

type BootstrapConfig struct {
	DB       *gorm.DB
	App      *fiber.App
	Validate *validator.Validate
}

func Bootstrap(config *BootstrapConfig) {
	// setup repositories
	userRepository := repository.NewUserRepository(config.DB)
	authenticationRepository := repository.NewAuthenticationRepository(config.DB)
	taskRepository := repository.NewTaskRepository(config.DB)

	// setup use cases
	userUseCase := usecase.NewUserUseCase(*config.Validate, userRepository)
	authenticationUseCase := usecase.NewAuthenticationUseCase(*config.Validate, authenticationRepository, userRepository)
	taskUseCase := usecase.NewTaskUseCase(*config.Validate, taskRepository)
	// contactUseCase := usecase.NewContactUseCase(config.DB, config.Log, config.Validate, contactRepository)
	// addressUseCase := usecase.NewAddressUseCase(config.DB, config.Log, config.Validate, contactRepository, addressRepository)

	// // setup controller
	userController := http.NewUserController(userUseCase)
	authenticationController := http.NewAuthenticationController(authenticationUseCase)
	taskController := http.NewTaskController(taskUseCase)
	// contactController := http.NewContactController(contactUseCase, config.Log)
	// addressController := http.NewAddressController(addressUseCase, config.Log)

	// setup middleware
	config.App.Use(cors.New())
	authenticationMiddleware := middleware.NewAuth()

	routeConfig := route.RouteConfig{
		App:               config.App,
		UserController:    userController,
		AuthenticationController: authenticationController,
		TaskController: taskController,
		// ContactController: contactController,
		// AddressController: addressController,
		AuthenticationMiddleware:    authenticationMiddleware,
	}
	routeConfig.Setup()
}
