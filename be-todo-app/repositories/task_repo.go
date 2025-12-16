package repositories

import (
	"be-todo-app/config"
	"be-todo-app/models"

	"gorm.io/gorm"
)

type TaskRepository interface {
	GetList() ([]models.Task, error)
}

type taskRepository struct {
	db *gorm.DB
}

func NewTaskRepository() TaskRepository {
	return &taskRepository{
		db: config.GetDB(),
	}
}

func (r *taskRepository) GetList() ([]models.Task, error) {
	var todoList []models.Task

	err := r.db.
		Order("created_at desc").
		Find(&todoList).Error

	return todoList, err
}
