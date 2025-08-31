package usecase

import (
	"fmt"
	"taskhub/internal/helper"
	"taskhub/internal/model"
	"taskhub/internal/repository"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type UserUseCase interface {
	AddUser(payload *model.AddUserRequest) error
}

type userUseCase struct {
	UserRepository repository.UserRepository
	Validate       validator.Validate
}

func NewUserUseCase(validate validator.Validate, userRepository repository.UserRepository) UserUseCase {
	return &userUseCase{
		UserRepository: userRepository,
		Validate: validate,
	}
}

func (u *userUseCase) AddUser(payload *model.AddUserRequest) error {
	err := u.Validate.Struct(payload)
	if err != nil {
		finalErr := helper.CustomError(err)
		return fiber.NewError(fiber.StatusBadRequest, finalErr)
	}
	
	err = u.UserRepository.VerifyUniqueUserByEmail(payload.Email)
	if err != nil {
		return err
	}
	hashedPassword, err := helper.HashPassword(payload.Password)
	if err != nil {
		fmt.Printf("Password gagal dienkripsi: %v\n", err)
		return fiber.NewError(fiber.StatusBadRequest, "Password gagal dienkripsi")
	}

	if err := u.UserRepository.AddUser(model.User{
		Email: payload.Email,
		Password: hashedPassword,
	}); err != nil {
		return err
	}
	return nil
}
