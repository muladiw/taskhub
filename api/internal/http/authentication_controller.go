package http

import (
	// "taskhub/internal/delivery/http/middleware"
	"taskhub/internal/model"
	"taskhub/internal/usecase"

	"fmt"

	"github.com/gofiber/fiber/v2"
)

type AuthenticationController interface {
	Login(ctx *fiber.Ctx) error 
	RefreshToken(ctx *fiber.Ctx) error
}

type authenticationController struct {
	AuthenticationUseCase usecase.AuthenticationUseCase
}

func NewAuthenticationController(authenticationUseCase usecase.AuthenticationUseCase) AuthenticationController {
	return &authenticationController{
		AuthenticationUseCase: authenticationUseCase,
	}
}

func (c *authenticationController) Login(ctx *fiber.Ctx) error {
	request := new(model.AddUserRequest)
	err := ctx.BodyParser(request)
	if err != nil {
		fmt.Printf("Failed to parse request body : %+v", err)
		return ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"errors": "Failed to parse request body"})
	}

	token, err := c.AuthenticationUseCase.Login(request)
	if err != nil {
		return err
	}

	return ctx.Status(fiber.StatusCreated).JSON(&fiber.Map{"auth": token})
}

func (c *authenticationController) RefreshToken(ctx *fiber.Ctx) error {
	request := new(model.RefreshToken)
	err := ctx.BodyParser(request)
	if err != nil {
		fmt.Printf("Failed to parse request body : %+v", err)
		return ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"errors": "Failed to parse request body"})
	}

	token, err := c.AuthenticationUseCase.RefreshToken(request)
	if err != nil {
		return err
	}

	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{"auth": token})
}
