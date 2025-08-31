package http

import (
	// "taskhub/internal/delivery/http/middleware"
	"taskhub/internal/helper"
	"taskhub/internal/http/middleware"
	"taskhub/internal/model"
	"taskhub/internal/usecase"

	"fmt"

	"github.com/gofiber/fiber/v2"
)

type TaskController interface {
	AddTask(ctx *fiber.Ctx) error
	GetTask(ctx *fiber.Ctx) error
	GetTaskById(ctx *fiber.Ctx) error
	EditTaskById(ctx *fiber.Ctx) error
	DeleteTaskById(ctx *fiber.Ctx) error
}

type taskController struct {
	TaskUseCase usecase.TaskUseCase
}

func NewTaskController(taskUseCase usecase.TaskUseCase) TaskController {
	return &taskController{
		TaskUseCase: taskUseCase,
	}
}

func (c *taskController) AddTask(ctx *fiber.Ctx) error {
	request := new(model.AddTaskRequest)
	err := ctx.BodyParser(request)
	if err != nil {
		fmt.Printf("Failed to parse request body : %+v", err)
		return ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"errors": "Failed to parse request body"})
	}

	auth := middleware.GetUser(ctx)
	err = c.TaskUseCase.AddTask(auth.IdUser, request)
	if err != nil {
		return err
	}

	return ctx.Status(fiber.StatusCreated).JSON(&fiber.Map{})
}

func (c *taskController) GetTask(ctx *fiber.Ctx) error {
	request := new(model.GetTaskRequest)
	err := ctx.QueryParser(request)
	if err != nil {
		fmt.Printf("Failed to parse request query : %+v", err)
		return ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"errors": "Failed to parse request query"})
	}

	auth := middleware.GetUser(ctx)
	result, err := c.TaskUseCase.GetTask(auth.IdUser, request)
	if err != nil {
		return err
	}

	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{"task": result})
}

func (c *taskController) GetTaskById(ctx *fiber.Ctx) error {
	id := ctx.Params("id")
	finalId, err := helper.DecryptId((id))
	if err != nil {
		fmt.Printf("Failed to decrypt id : %+v", err)
		return ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"errors": "Failed to decrypt id"})
	}

	auth := middleware.GetUser(ctx)
	result, err := c.TaskUseCase.GetTaskById(auth.IdUser, finalId)
	if err != nil {
		return err
	}

	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{"task": result})
}

func (c *taskController) EditTaskById(ctx *fiber.Ctx) error {
	id := ctx.Params("id")
	finalId, err := helper.DecryptId((id))
	if err != nil {
		fmt.Printf("Failed to decrypt id : %+v", err)
		return ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"errors": "Failed to decrypt id"})
	}

	request := new(model.AddTaskRequest)
	err = ctx.BodyParser(request)
	if err != nil {
		fmt.Printf("Failed to parse request body : %+v", err)
		return ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"errors": "Failed to parse request body"})
	}

	auth := middleware.GetUser(ctx)
	err = c.TaskUseCase.EditTaskById(auth.IdUser, finalId, request)
	if err != nil {
		return err
	}

	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{})
}

func (c *taskController) DeleteTaskById(ctx *fiber.Ctx) error {
	id := ctx.Params("id")
	finalId, err := helper.DecryptId((id))
	if err != nil {
		fmt.Printf("Failed to decrypt id : %+v", err)
		return ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"errors": "Failed to decrypt id"})
	}

	auth := middleware.GetUser(ctx)
	err = c.TaskUseCase.DeleteTaskById(auth.IdUser, finalId)
	if err != nil {
		return err
	}

	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{})
}