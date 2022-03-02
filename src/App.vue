<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {Todo} from "./entities/Todo";
import {todosService} from "./services/todos/TodosService";
import {useTaskHandler} from "./useTaskHandler";
const taskHandler = useTaskHandler()
const todos = ref<Todo[] | null>(null)
const searchTodos = taskHandler.wrapToHandleActive(async () =>
		todos.value = await todosService.search()
)
onMounted(() => {
	searchTodos()
})
</script>

<template>
	{{ taskHandler.isLoading }}
	<div v-if="taskHandler.isLoading">Loading</div>
	<div v-else>
		<div v-for="todo in todos">
			<h1>
				{{ todo.title }}
			</h1>
			<p>
				{{ todo.body }}
			</p>
		</div>
	</div>
	{{ taskHandler.errorBag }}
	{{ taskHandler.errorMessage }}
</template>
