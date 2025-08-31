package model

type Authentication struct {
	Id           uint      `gorm:"primaryKey;autoIncrement"`
	IdUser       uint      `gorm:"unique;not null"`
	RefreshToken string    `gorm:"column:refresh_token;not null"`
	User         User      `gorm:"foreignKey:id_user"`
}

func (Authentication) TableName() string {
	return "authentication"
}
