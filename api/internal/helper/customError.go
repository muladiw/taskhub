package helper

import (
	"fmt"

	"github.com/go-playground/validator/v10"
)

func CustomError(err error) string {
	var customError string
	customErrors := err.(validator.ValidationErrors)
	if len(customErrors) > 0 {
		e := customErrors[0]
		switch e.Tag() {
		case "required":
				customError = fmt.Sprintf("%s tidak boleh kosong", e.Field())
		// case "min":
		// 		customError = fmt.Sprintf("%s must be at least %s characters long.", e.Field(), e.Param())
		case "email":
				customError = "Format email tidak sesuai"
		default:
				customError = fmt.Sprintf("%s failed validation with tag %s.", e.Field(), e.Tag())
		}
	}
	return customError
}