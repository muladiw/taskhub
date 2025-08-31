package http

import (
	// "taskhub/internal/delivery/http/middleware"
	"taskhub/internal/model"
	"taskhub/internal/usecase"

	"fmt"

	"github.com/gofiber/fiber/v2"
)

type UserController interface {
	AddUser(ctx *fiber.Ctx) error 
}

type userController struct {
	UserUseCase usecase.UserUseCase
}

func NewUserController(userUseCase usecase.UserUseCase) UserController {
	return &userController{
		UserUseCase: userUseCase,
	}
}

func (c *userController) AddUser(ctx *fiber.Ctx) error {
	request := new(model.AddUserRequest)
	err := ctx.BodyParser(request)
	if err != nil {
		fmt.Printf("Failed to parse request body : %+v", err)
		return ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"errors": "Failed to parse request body"})
	}

	err = c.UserUseCase.AddUser(request)
	if err != nil {
		return err
	}

	return ctx.Status(fiber.StatusCreated).JSON(&fiber.Map{})
}