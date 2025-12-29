package handlers

import (
	"be-todo-app/models"
	"be-todo-app/repositories"

	"github.com/gin-gonic/gin"
)

type taskHandler struct {
	taskRepo repositories.TaskRepository
}

type createTaskRequest struct {
	Name string `json:"name" binding:"required"`
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

// Create Task
func (h *taskHandler) CreateTask(c *gin.Context) {
	var req createTaskRequest

	if err := c.ShouldBindJSON(&req); err != nil || req.Name == "" {
		c.JSON(400, gin.H{"error": "Task name is required!"})
		return
	}

	task := models.Task{
		Name: req.Name,
	}

	if err := h.taskRepo.Create(&task); err != nil {
		c.JSON(500, gin.H{"error": "Cannot create task!"})
		return
	}

	c.JSON(201, gin.H{
		"task": task,
	})
}
