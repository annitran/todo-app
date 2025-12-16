package handlers

import (
	"be-todo-app/repositories"

	"github.com/gin-gonic/gin"
)

type taskHandler struct {
	taskRepo repositories.TaskRepository
}

func NewTaskHandler(taskRepo repositories.TaskRepository) *taskHandler {
	return &taskHandler{taskRepo: taskRepo}
}

// Get Todo List
func (h *taskHandler) GetTodoList(c *gin.Context) {
	todoList, err := h.taskRepo.GetList()
	if err != nil {
		c.JSON(500, gin.H{"error": "Cannot load TODO LIST!"})
		return
	}

	c.JSON(200, gin.H{
		"todoList": todoList,
	})
}
