interface ITaskProps {
    todoMap: Map<string, ITaskArr[]>
    task: {
        title: string,
        done: boolean,
        time: string
    }
    index: number
    completeTask: (number) => void
    removeTask: (number) => void
    undoTask: (number) => void
}