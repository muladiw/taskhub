package usecase

import (
	"taskhub/internal/model"

	"gorm.io/gorm"
)

type UserUseCase interface {
	AddUser(payload model.User) error
}

type userUseCase struct {
	Db *gorm.DB // Db is the database instance
}

func NewUserUseCase(db *gorm.DB) UserUseCase {
	return &userUseCase{
		Db: db,
	}
}

func (r *userUseCase) AddUser(payload model.User) error {
	return r.Db.Create(payload).Error
}
