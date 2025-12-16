package migrations

import (
	"be-todo-app/config"
	"be-todo-app/models"
	"fmt"
	"log"
)

func Migrate() {
	db := config.GetDB()

	err := db.AutoMigrate(
		&models.Task{},
	)

	if err != nil {
		log.Fatal("AutoMigrate failed:", err)
	}

	fmt.Println("Database migrated successfully!")
}
