package main

import (
	"be-todo-app/config"
	"be-todo-app/migrations"
	"be-todo-app/routes"
)

func main() {
	config.ConnectDB()
	migrations.Migrate()
	migrations.SeedTasks()
	routes.TodoRoutes().Run(":8080")
}
