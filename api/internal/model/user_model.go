package model

import (
	"database/sql"
	"time"
)

type User struct {
	Id            uint   `gorm:"primaryKey;autoIncrement"`
	Email         string `gorm:"unique;not null"`
	Password      string `gorm:"not null"`
	CreatedBy     sql.NullInt32
	UpdatedBy     sql.NullInt32
	CreatedAt     time.Time `gorm:"autoCreateTime;not null"`
	UpdatedAt     time.Time `gorm:"autoUpdateTime:milli;not null"`
	CreatedByUser *User     `gorm:"foreignKey:created_by"`
	UpdatedByUser *User     `gorm:"foreignKey:updated_by"`
}

func (User) TableName() string {
	return "user"
}
