package helper

import (
	"crypto/aes"
	"crypto/cipher"
	"encoding/base64"
	"fmt"
	"net/url"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
	"golang.org/x/crypto/scrypt"
)

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", fiber.NewError(fiber.StatusBadRequest, "Password gagal dienkripsi")
	}
	return string(bytes), nil
}

func ComparePassword(password string, hashedPassword string) error {
	if err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password)); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Email atau password tidak sesuai")
	}
	return nil
}

func EncryptId(id uint) (string, error) {
 // Decode the base64 IV
 iv, err := base64.StdEncoding.DecodeString("C0EvnpsRLZ4kSQkqJ1c40w==")
 if err != nil {
  return "", fmt.Errorf("failed to decode base64 IV: %w", err)
 }

 // Derive a 32-byte key using scrypt
 key, err := scrypt.Key([]byte("Udd9KLmCH6ciEltTlWMv5Q=="), []byte("shy8/3D/8vdabjn+6RQq+Q=="), 1<<14, 8, 1, 32)
 if err != nil {
  return "", fmt.Errorf("failed to derive key: %w", err)
 }

 // Create AES cipher block
 block, err := aes.NewCipher(key)
 if err != nil {
  return "", fmt.Errorf("failed to create cipher: %w", err)
 }

 // Use AES-CTR mode
 stream := cipher.NewCTR(block, iv)

 result := strconv.Itoa(int(id))

 plaintext := []byte(result)
 encrypted := make([]byte, len(plaintext))
 stream.XORKeyStream(encrypted, plaintext)

 // Encode to base64
 encryptedBase64 := base64.StdEncoding.EncodeToString(encrypted)
 return encryptedBase64, nil
}

func DecryptId(encryptedBase64 string) (uint, error) {
	decodedComponent, err := url.QueryUnescape(encryptedBase64)
	if err != nil {
		return 0, fmt.Errorf("failed to decode uri encode: %w", err)
	}
	// Decode the base64 encrypted text
	encryptedData, err := base64.StdEncoding.DecodeString(decodedComponent)
	if err != nil {
		return 0, fmt.Errorf("failed to decode base64: %w", err)
	}

	// Derive a 32-byte key using scrypt (must match scrypt params used in TS)
	key, err := scrypt.Key([]byte("Udd9KLmCH6ciEltTlWMv5Q=="), []byte("shy8/3D/8vdabjn+6RQq+Q=="), 1<<14, 8, 1, 32)
	if err != nil {
		return 0, fmt.Errorf("scrypt key derivation failed: %w", err)
	}

	// Decode the IV from base64
	iv, err := base64.StdEncoding.DecodeString("C0EvnpsRLZ4kSQkqJ1c40w==")
	if err != nil {
		return 0, fmt.Errorf("failed to decode IV: %w", err)
	}

	// Create AES cipher block
	block, err := aes.NewCipher(key)
	if err != nil {
		return 0, fmt.Errorf("failed to create AES cipher: %w", err)
	}

	// Create a stream for AES-CTR mode
	stream := cipher.NewCTR(block, iv)

	// Decrypt
	decrypted := make([]byte, len(encryptedData))
	stream.XORKeyStream(decrypted, encryptedData)

	// Convert decrypted bytes to int
	result, err := strconv.Atoi(string(decrypted))
	if err != nil {
		return 0, fmt.Errorf("failed to convert decrypted text to int: %w", err)
	}

	return uint(result), nil
}