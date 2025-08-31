package repository

import (
	"errors"
	"fmt"
	"taskhub/internal/model"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type AuthenticationRepository interface {
	AddAuthentication(payload model.Authentication) error
	GetAuthenticationByIdUser(idUser uint) (model.Authentication, error)
	VerifyAuthenticationByRefreshToken(refreshToken string) error
}

type authenticationRepository struct {
	Db *gorm.DB // Db is the database instance
}

func NewAuthenticationRepository(db *gorm.DB) AuthenticationRepository {
	return &authenticationRepository{
		Db: db,
	}
}

func (r *authenticationRepository) AddAuthentication(payload model.Authentication) error {
	if err := r.Db.Create(&payload).Error; err != nil {
		fmt.Printf("Autentikasi gagal ditambahkan: %v\n", err)
		return fiber.NewError(fiber.StatusBadRequest, "Autentikasi gagal ditambahkan")
	}

	return nil
}

func (r *authenticationRepository) GetAuthenticationByIdUser(idUser uint) (model.Authentication, error) {
	result := model.Authentication{}
	err := r.Db.Select("id, refresh_token").Where("id_user = ?", idUser).First(&result).Error
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		fmt.Printf("Gagal mendapatkan autentikasi: %v\n", err)
		return result, fiber.NewError(fiber.StatusBadRequest, "Gagal mendapatkan autentikasi")
	}

	return result, nil
}

func (r *authenticationRepository) VerifyAuthenticationByRefreshToken(refreshToken string) error {
	result := model.Authentication{}
	err := r.Db.Select("id").Where("refresh_token = ?", refreshToken).First(&result).Error
	if err != nil {
		fmt.Printf("Gagal mendapatkan autentikasi: %v\n", err)
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return fiber.NewError(fiber.StatusBadRequest, "Autentikasi tidak ditemukan")
		} else {
			return fiber.NewError(fiber.StatusBadRequest, "Gagal mendapatkan autentikasi")
		}
	}

	return nil
}
