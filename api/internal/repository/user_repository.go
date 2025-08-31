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
	VerifyUserByEmail(email string) (model.User, error)
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
	if err := r.Db.Create(&payload).Error; err != nil {
		fmt.Printf("Pengguna gagal ditambahkan: %v\n", err)
		return fiber.NewError(fiber.StatusBadRequest, "Pengguna gagal ditambahkan")
	}

	return nil
}

func (r *userRepository) VerifyUniqueUserByEmail(email string) error {
	_, err := r.GetUserByEmailCommon(email)
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		fmt.Printf("Gagal mendapatkan pengguna: %v\n", err)
		return fiber.NewError(fiber.StatusBadRequest, "Gagal mendapatkan pengguna")
	}

	if err == nil {
		fmt.Println("Email telah digunakan")
		return fiber.NewError(fiber.StatusBadRequest, "Email telah digunakan")
	}

	return nil
}

func (r *userRepository) GetUserByEmailCommon(email string) (model.User, error) {
	user := model.User{}
	err := r.Db.Select("id, password").Where("email = ?", email).First(&user).Error

	if err != nil {
		return user, err
	}

	return user, nil
}

func (r *userRepository) VerifyUserByEmail(email string) (model.User, error) {
	result, err := r.GetUserByEmailCommon(email)
	if err != nil && errors.Is(err, gorm.ErrRecordNotFound) {
		fmt.Printf("Email atau password tidak sesuai: %v\n", err)
		return result, fiber.NewError(fiber.StatusBadRequest, "Email atau password tidak sesuai")
	}
	return result, nil
}
