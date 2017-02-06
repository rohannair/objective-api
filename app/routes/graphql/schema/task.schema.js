import Objective from './objective.schema'

const Task =`
  type Task {
    id: String!
    title: String
    isComplete: Boolean

    objective: Objective
  }
`

export default () => [
  Objective,
  Task
]
