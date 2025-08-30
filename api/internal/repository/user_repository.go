package repository

import (
	"errors"
	"fmt"
	"taskhub/internal/model"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type UserRepository interface {
	AddUser(payload model.User) error
	VerifyUniqueUserByEmail(email string) error
}

type userRepository struct {
	Db *gorm.DB // Db is the database instance
}

func NewUserRepository(db *gorm.DB) UserRepository {
	return &userRepository{
		Db: db,
	}
}

func (r *userRepository) AddUser(payload model.User) error {
	return r.Db.Create(payload).Error
}

func (r *userRepository) VerifyUniqueUserByEmail(email string) error {
	user := model.User{}

	err := r.Db.Where("email = ?", email).First(&user).Error

	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		fmt.Printf("Gagal mendapatkan pengguna: %v\n", err)
		return fiber.ErrBadRequest
	}

	if err == nil {
		fmt.Printf("Email telah digunakan: %v\n", err)
		return fiber.ErrNotFound
	}

	return nil
}
