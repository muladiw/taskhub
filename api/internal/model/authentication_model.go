package model

import (
	"time"
)

type Authentication struct {
	Id           uint      `gorm:"primaryKey;autoIncrement"`
	IdUser       uint      `gorm:"unique"`
	RefreshToken string    `gorm:"column:refresh_token"`
	CreatedAt    time.Time `gorm:"autoCreateTime"`
	UpdatedAt    time.Time `gorm:"autoUpdateTime:milli"`
	User         User      `gorm:"foreignKey:id_user"`
}

func (Authentication) TableName() string {
	return "authentication"
}
