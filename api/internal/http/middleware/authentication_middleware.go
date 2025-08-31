package middleware

import (
	"fmt"
	"strings"
	"taskhub/internal/helper"
	"taskhub/internal/model"

	"github.com/gofiber/fiber/v2"
)

func NewAuth() fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		bearerToken := ctx.Get("Authorization", "NOT_FOUND")
		token := strings.TrimPrefix(bearerToken, "Bearer ")
		result, err := helper.VerifyToken(token, "accessToken")
		if err != nil {
			fmt.Println(err, token)
			return fiber.NewError(fiber.StatusForbidden, "Token tidak valid")
		}
		ctx.Locals("authentication", result)
		return ctx.Next()
	}
}

func GetUser(ctx *fiber.Ctx) model.AuthToken {
	return ctx.Locals("authentication").(model.AuthToken)
}
