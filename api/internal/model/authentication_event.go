package model

type AuthToken struct {
	IdUser uint `json:"idUser"`
}

type Token struct {
	AccessToken string `json:"accessToken"`
	RefreshToken string `json:"refreshToken"`
}

type RefreshToken struct {
	RefreshToken string `json:"refreshToken" validate:"required"`
}