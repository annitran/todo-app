package routes

import (
	"be-todo-app/handlers"
	"be-todo-app/repositories"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func TodoRoutes() *gin.Engine {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:5173",
		},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	taskRepo := repositories.NewTaskRepository()
	taskHandler := handlers.NewTaskHandler(taskRepo)

	r := router.Group("/api/v1")
	{
		r.GET("/tasks", taskHandler.GetTodoList)
	}

	return router
}
