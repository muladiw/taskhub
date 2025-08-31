package usecase

import (
	"taskhub/internal/helper"
	"taskhub/internal/model"
	"taskhub/internal/repository"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type AuthenticationUseCase interface {
	Login(payload *model.AddUserRequest) (model.Token, error)
	RefreshToken(payload *model.RefreshToken) (model.Token, error)
}

type authenticationUseCase struct {
	UserRepository repository.UserRepository
	AuthenticationRepository repository.AuthenticationRepository
	Validate       validator.Validate
}

func NewAuthenticationUseCase(validate validator.Validate, authenticationRepository repository.AuthenticationRepository, userRepository repository.UserRepository) AuthenticationUseCase {
	return &authenticationUseCase{
		UserRepository: userRepository,
		Validate: validate,
		AuthenticationRepository: authenticationRepository,
	}
}

func (u *authenticationUseCase) Login(payload *model.AddUserRequest) (model.Token, error) {
	finalResult := model.Token{}
	err := u.Validate.Struct(payload)
	if err != nil {
		finalErr := helper.CustomError(err)
		return finalResult, fiber.NewError(fiber.StatusBadRequest, finalErr)
	}
	
	result, err := u.UserRepository.VerifyUserByEmail(payload.Email)
	if err != nil {
		return finalResult, err
	}
	err = helper.ComparePassword(payload.Password, result.Password)
	if err != nil {
		return finalResult, err
	}
	resultAuthentication, err := u.AuthenticationRepository.GetAuthenticationByIdUser(result.Id)
	if err != nil {
		return finalResult, err
	}
	accessToken, err := helper.GenerateAccessToken(model.AuthToken{IdUser: result.Id})
	if err != nil {
		return finalResult, fiber.NewError(fiber.StatusBadRequest, "Token gagal dibuat")
	}
	refreshToken := ""
	if resultAuthentication.Id == 0 {
		refreshToken, err = helper.GenerateRefreshToken(model.AuthToken{IdUser: result.Id})
		if err != nil {
			return finalResult, fiber.NewError(fiber.StatusBadRequest, "Token gagal dibuat")
		}
		err = u.AuthenticationRepository.AddAuthentication(model.Authentication{IdUser: result.Id, RefreshToken: refreshToken})
		if err != nil {
			return finalResult, nil
		}
	} else {
		refreshToken = resultAuthentication.RefreshToken
	}

	finalResult.AccessToken = accessToken
	finalResult.RefreshToken = refreshToken
	return finalResult, nil
}

func (u *authenticationUseCase) RefreshToken(payload *model.RefreshToken) (model.Token, error) {
	result := model.Token{}
	resultToken, err := helper.VerifyToken(payload.RefreshToken, "refreshToken")

	if err != nil {
		return result, fiber.NewError(fiber.StatusForbidden, "Token tidak valid")
	}

	err = u.AuthenticationRepository.VerifyAuthenticationByRefreshToken(payload.RefreshToken)
	if err != nil {
		return result, nil
	}
	accessToken, err := helper.GenerateAccessToken(model.AuthToken{IdUser: resultToken.IdUser})
	if err != nil {
		return result, fiber.NewError(fiber.StatusBadRequest, "Token gagal dibuat")
	}
	result.AccessToken = accessToken
	return result, nil
}
