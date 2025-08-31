package usecase

import (
	"taskhub/internal/helper"
	"taskhub/internal/model"
	"taskhub/internal/repository"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type TaskUseCase interface {
	AddTask(idUser uint, payload *model.AddTaskRequest) error
	GetTask(idUser uint, payload *model.GetTaskRequest) ([]model.GetTaskResponse, error)
	GetTaskById(idUser uint, id uint) (model.GetTaskResponse, error)
	EditTaskById(idUser uint, id uint, payload *model.AddTaskRequest) error
	DeleteTaskById(idUser uint, id uint) error
}

type taskUseCase struct {
	TaskRepository repository.TaskRepository
	Validate       validator.Validate
}

func NewTaskUseCase(validate validator.Validate, taskRepository repository.TaskRepository) TaskUseCase {
	return &taskUseCase{
		TaskRepository: taskRepository,
		Validate: validate,
	}
}

func (u *taskUseCase) AddTask(idUser uint, payload *model.AddTaskRequest) error {
	err := u.Validate.Struct(payload)
	if err != nil {
		finalErr := helper.CustomError(err)
		return fiber.NewError(fiber.StatusBadRequest, finalErr)
	}
	
	err = u.TaskRepository.AddTask(model.Task{
		Title: payload.Title,
		Status: payload.Status,
		CreatedBy: idUser,
		UpdatedBy: idUser,
	})
	if err != nil {
		return err
	}
	return nil
}

func (u *taskUseCase) GetTask(idUser uint, payload *model.GetTaskRequest) ([]model.GetTaskResponse, error) {
	err := u.Validate.Struct(payload)
	if err != nil {
		finalErr := helper.CustomError(err)
		return nil, fiber.NewError(fiber.StatusBadRequest, finalErr)
	}
	
	result, err := u.TaskRepository.GetTask(idUser, *payload)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (u *taskUseCase) GetTaskById(idUser uint, id uint) (model.GetTaskResponse, error) {
	result, err := u.TaskRepository.GetTaskById(idUser, id)
	if err != nil {
		return model.GetTaskResponse{}, err
	}
	return result, nil
}

func (u *taskUseCase) EditTaskById(idUser uint, id uint, payload *model.AddTaskRequest) error {
	_, err := u.TaskRepository.VerifyTaskById(idUser, id)
	if err != nil {
		return err
	}
	err = u.TaskRepository.EditTaskById(idUser, id, model.Task{
		Title: payload.Title,
		Status: payload.Status,
	})
	if err != nil {
		return err
	}
	return nil
}

func (u *taskUseCase) DeleteTaskById(idUser uint, id uint) error {
	_, err := u.TaskRepository.VerifyTaskById(idUser, id)
	if err != nil {
		return err
	}
	err = u.TaskRepository.DeleteTaskById(id)
	if err != nil {
		return err
	}
	return nil
}
