package route

import (
	"taskhub/internal/http"

	"github.com/gofiber/fiber/v2"
)

type RouteConfig struct {
	App               *fiber.App
	UserController    http.UserController
	AuthenticationController    http.AuthenticationController
	TaskController    http.TaskController
	AuthenticationMiddleware    fiber.Handler
}

func (c *RouteConfig) Setup() {
	c.SetupGuestRoute()
	c.SetupAuthRoute()
}

func (c *RouteConfig) SetupGuestRoute() {
	c.App.Post("/user", c.UserController.AddUser)

	c.App.Post("/auth", c.AuthenticationController.Login)
	c.App.Put("/auth", c.AuthenticationController.RefreshToken)
}

func (c *RouteConfig) SetupAuthRoute() {
	c.App.Use(c.AuthenticationMiddleware)
	c.App.Post("/task", c.TaskController.AddTask)
	c.App.Get("/task", c.TaskController.GetTask)
	c.App.Get("/task/:id", c.TaskController.GetTaskById)
	c.App.Put("/task/:id", c.TaskController.EditTaskById)
	c.App.Delete("/task/:id", c.TaskController.DeleteTaskById)
}
