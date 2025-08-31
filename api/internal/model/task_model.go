package model

import (
	"time"
)

type Task struct {
	Id            uint   `gorm:"primaryKey;autoIncrement"`
	Title         string `gorm:"not null"`
	Status        string `gorm:"type:varchar(11);check:status IN ('TO_DO', 'IN_PROGRESS', 'DONE');not null"`
	CreatedBy     uint `gorm:"not null"`
	UpdatedBy     uint `gorm:"not null"`
	CreatedAt     time.Time `gorm:"autoCreateTime;not null"`
	UpdatedAt     time.Time `gorm:"autoUpdateTime:milli;not null"`
	CreatedByUser *User     `gorm:"foreignKey:created_by"`
	UpdatedByUser *User     `gorm:"foreignKey:updated_by"`
}

func (Task) TableName() string {
	return "task"
}
