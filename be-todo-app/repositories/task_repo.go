package repositories

import (
	"be-todo-app/config"
	"be-todo-app/models"

	"gorm.io/gorm"
	"time"
)

type TaskRepository interface {
	GetList() ([]models.Task, error)
	Create(task *models.Task) error
	Update(id uint,
		name string,
		isComplete bool,
		completedAt *time.Time,
	) (*models.Task, error)
	Delete(id uint) error
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

func (r *taskRepository) Create(task *models.Task) error {
	return r.db.Create(task).Error
}

func (r *taskRepository) Update(id uint,
	name string,
	isComplete bool,
	completedAt *time.Time,
) (*models.Task, error) {
	var task models.Task

	if err := r.db.First(&task, id).Error; err != nil {
		return nil, err
	}

	task.Name = name
	task.IsComplete = isComplete
	task.CompletedAt = completedAt

	if err := r.db.Save(&task).Error; err != nil {
		return nil, err
	}

	return &task, nil
}

func (r *taskRepository) Delete(id uint) error {
	return r.db.Delete(&models.Task{}, id).Error
}
