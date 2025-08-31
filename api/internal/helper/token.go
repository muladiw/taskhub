package helper

import (
	"taskhub/internal/model"
	"time"

	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

func GenerateAccessToken(auth model.AuthToken) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"idUser": auth.IdUser,
		"expire": time.Now().Add(time.Second * 15).UnixMilli(),
	})

	jwtToken, err := token.SignedString([]byte(os.Getenv("ACCESS_TOKEN_KEY")))
	if err != nil {
		return "", err
	}
	return jwtToken, nil
}

func GenerateRefreshToken(auth model.AuthToken) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"idUser": auth.IdUser,
	})

	jwtToken, err := token.SignedString([]byte(os.Getenv("REFRESH_TOKEN_KEY")))
	if err != nil {
		return "", err
	}
	return jwtToken, nil
}

func VerifyToken(jwtToken string, tokenType string) (model.AuthToken, error) {
	token, err := jwt.Parse(jwtToken, func(t *jwt.Token) (interface{}, error) {
		key := ""
		if tokenType == "refreshToken" {
			key = os.Getenv("REFRESH_TOKEN_KEY")
		} else {
			key = os.Getenv("ACCESS_TOKEN_KEY")
		}
		return []byte(key), nil
	})
	if err != nil {
		return model.AuthToken{}, err
	}

	claims := token.Claims.(jwt.MapClaims)
	if tokenType == "accessToken" {
		expire := int64(claims["expire"].(float64))
		if expire < time.Now().UnixMilli() {
			return model.AuthToken{}, fiber.ErrUnauthorized
		}
	}

	idUser := uint(claims["idUser"].(float64))
	
	return model.AuthToken{IdUser: idUser}, nil
}