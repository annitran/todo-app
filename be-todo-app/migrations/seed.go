package migrations

import (
	"be-todo-app/config"
	"be-todo-app/models"
	"time"
)

func SeedTasks() error {
	db := config.GetDB()

	now := time.Now()
	completedAt := now.Add(-90 * time.Minute)

	tasks := []models.Task{
		{
			Name:      "Học Go",
			CreatedAt: now.Add(-2 * time.Hour),
		},
		{
			Name:        "Làm Todo UI",
			IsComplete:  true,
			CompletedAt: &completedAt,
			CreatedAt:   now.Add(-3 * time.Hour),
		},
	}

	return db.Create(&tasks).Error
}
