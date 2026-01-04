package handlers

import (
	"be-todo-app/models"
	"be-todo-app/repositories"

	"github.com/gin-gonic/gin"
	"strconv"
	"time"
)

type taskHandler struct {
	taskRepo repositories.TaskRepository
}

type createTaskRequest struct {
	Name string `json:"name" binding:"required"`
}

type updateTaskRequest struct {
	Name        string     `json:"name" binding:"required"`
	IsComplete  bool       `json:"is_complete"`
	CompletedAt *time.Time `json:"completed_at"`
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

// Update Task
func (h *taskHandler) UpdateTask(c *gin.Context) {
	idParam := c.Param("id")
	idUint64, err := strconv.ParseUint(idParam, 10, 64)
	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid task id!"})
		return
	}

	id := uint(idUint64)
	var req updateTaskRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	task, err := h.taskRepo.Update(
		id,
		req.Name,
		req.IsComplete,
		req.CompletedAt,
	)

	if err != nil {
		c.JSON(500, gin.H{"error": "Update task failed!"})
		return
	}

	c.JSON(200, gin.H{
		"task": task,
	})
}

// Delete Task
func (h *taskHandler) DeleteTask(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.ParseUint(idParam, 10, 64)
	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid task id"})
		return
	}

	if err := h.taskRepo.Delete(uint(id)); err != nil {
		c.JSON(500, gin.H{"error": "Delete task failed!"})
		return
	}

	c.JSON(200, gin.H{
		"message": "Task deleted!",
	})
}
