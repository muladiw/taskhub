package model

import (
	"time"
)

type Task struct {
	Id            uint   `gorm:"primaryKey;autoIncrement"`
	Label         string `gorm:"unique"`
	Status        string `gorm:"type:varchar(11);check:status IN ('TO_DO', 'IN_PROGRESS', 'DONE')"`
	CreatedBy     uint
	UpdatedBy     uint
	CreatedAt     time.Time `gorm:"autoCreateTime"`
	UpdatedAt     time.Time `gorm:"autoUpdateTime:milli"`
	CreatedByUser *User     `gorm:"foreignKey:created_by"`
	UpdatedByUser *User     `gorm:"foreignKey:updated_by"`
}

func (Task) TableName() string {
	return "task"
}
