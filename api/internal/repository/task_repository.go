package repository

import (
	"errors"
	"fmt"
	"taskhub/internal/helper"
	"taskhub/internal/model"
	"taskhub/internal/model/converter"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type TaskRepository interface {
	AddTask(payload model.Task) error
	GetTask(idUser uint, payload model.GetTaskRequest) ([]model.GetTaskResponse,error)
	GetTaskById(id uint, idUser uint) (model.GetTaskResponse, error)
	VerifyTaskById(idUser uint, id uint) (model.GetTaskResponse, error)
	EditTaskById(idUser uint, id uint, payload model.Task) error
	DeleteTaskById(id uint) error
}

type taskRepository struct {
	Db *gorm.DB // Db is the database instance
}

func NewTaskRepository(db *gorm.DB) TaskRepository {
	return &taskRepository{
		Db: db,
	}
}

func (r *taskRepository) AddTask(payload model.Task) error {
	if err := r.Db.Create(&payload).Error; err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Tugas gagal ditambahkan")
	}

	return nil
}

func (r *taskRepository) GetTask(idUser uint, payload model.GetTaskRequest) ([]model.GetTaskResponse,error) {
	task := []model.Task{}
	
	if err := r.Db.Model(&task).Select("id, title, status").Where("created_by = ?", idUser).Order("updated_at desc").Limit(payload.Limit).Offset(payload.Start).Find(&task).Error; err != nil {
		fmt.Printf("Gagal mendapatkan tugas: %v\n", err)
		return nil, fiber.NewError(fiber.StatusBadRequest, "Gagal mendapatkan tugas")
	}

	result := make([]model.GetTaskResponse, len(task))
	for i, v := range task {
		encryptedId, err := helper.EncryptId(v.Id)
		if err != nil {
			return nil, fiber.NewError(fiber.StatusBadRequest, "Id gagal dienkripsi")
		}

		result[i] = converter.TaskToResponse(encryptedId, v)
	}
	return result, nil
}

func (r *taskRepository) GetTaskById(idUser uint, id uint) (model.GetTaskResponse, error) {
	result, err := r.VerifyTaskById(idUser, id)
	return result, err
}

func (r *taskRepository) EditTaskById(idUser uint, id uint, payload model.Task) error {
	if err := r.Db.Model(&model.Task{}).Where("id = ?", id).Updates(model.Task{Title: payload.Title, Status: payload.Status, UpdatedBy: idUser}).Error; err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Tugas gagal diubah")
	}

	return nil
}

func (r *taskRepository) VerifyTaskById(idUser uint, id uint) (model.GetTaskResponse, error) {
	task := model.Task{}
	result := model.GetTaskResponse{}
	
	err := r.Db.Model(&task).Select("title, status, created_by").Where("id = ?", id).First(&task).Error
	if err != nil && errors.Is(err, gorm.ErrRecordNotFound) {
		return result, fiber.NewError(fiber.StatusNotFound, "Tugas tidak ditemukan")
	}
	if err != nil {
		return result, fiber.NewError(fiber.StatusBadRequest, "Gagal mendapatkan tugas")
	}
	if task.CreatedBy != idUser {
		return result, fiber.NewError(fiber.StatusUnauthorized, "Anda tidak dapat mengakses tugas ini")
	}

	result.Title = task.Title
	result.Status = task.Status
	return result, nil
}

func (r *taskRepository) DeleteTaskById(id uint) error {
	if err := r.Db.Where("id = ?", id).Delete(&model.Task{}).Error; err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Tugas gagal dihapus")
	}

	return nil
}