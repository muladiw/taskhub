package converter

import "taskhub/internal/model"

func TaskToResponse(id string, task model.Task) model.GetTaskResponse {
	return model.GetTaskResponse{
		Id: id,
		Title: task.Title,
		Status: task.Status,
	}
}
