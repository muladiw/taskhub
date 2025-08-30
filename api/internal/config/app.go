package config

// import (
// 	"golang-clean-architecture/internal/delivery/http"
// 	"golang-clean-architecture/internal/delivery/http/middleware"
// 	"golang-clean-architecture/internal/delivery/http/route"
// 	"golang-clean-architecture/internal/repository"
// 	"golang-clean-architecture/internal/usecase"

// 	"github.com/IBM/sarama"
// 	"github.com/go-playground/validator/v10"
// 	"github.com/gofiber/fiber/v2"
// 	"github.com/sirupsen/logrus"
// 	"github.com/spf13/viper"
// 	"gorm.io/gorm"
// )

// type BootstrapConfig struct {
// 	DB       *gorm.DB
// 	App      *fiber.App
// 	Validate *validator.Validate
// }

// func Bootstrap(config *BootstrapConfig) {
// 	// setup repositories
// 	userRepository := repository.NewUserRepository(config.Log)
// 	contactRepository := repository.NewContactRepository(config.Log)
// 	addressRepository := repository.NewAddressRepository(config.Log)

// 	// setup use cases
// 	userUseCase := usecase.NewUserUseCase(config.DB, config.Log, config.Validate, userRepository)
// 	contactUseCase := usecase.NewContactUseCase(config.DB, config.Log, config.Validate, contactRepository)
// 	addressUseCase := usecase.NewAddressUseCase(config.DB, config.Log, config.Validate, contactRepository, addressRepository)

// 	// setup controller
// 	userController := http.NewUserController(userUseCase, config.Log)
// 	contactController := http.NewContactController(contactUseCase, config.Log)
// 	addressController := http.NewAddressController(addressUseCase, config.Log)

// 	// setup middleware
// 	authMiddleware := middleware.NewAuth(userUseCase)

// 	routeConfig := route.RouteConfig{
// 		App:               config.App,
// 		UserController:    userController,
// 		ContactController: contactController,
// 		AddressController: addressController,
// 		AuthMiddleware:    authMiddleware,
// 	}
// 	routeConfig.Setup()
// }
