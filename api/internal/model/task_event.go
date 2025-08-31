package model

type AddTaskRequest struct {
	Title string `json:"title" validate:"required"`
	Status     string `json:"status" validate:"required,oneofci='TO_DO' 'IN_PROGRESS' 'DONE'"`
}

type GetTaskRequest struct {
	Start   int    `query:"start" json:"start"`
	Limit   int    `query:"limit" json:"limit" validate:"min=1,max=100"`
}

type GetTaskResponse struct {
	Id string `json:"id"`
	Title string `json:"title"`
	Status string `json:"status"`
}