import Objective from './objective.schema'

const Task =`
  type Task {
    id: String!
    title: String
    isComplete: Boolean
    hidden: Boolean

    objective: Objective
  }
`

export default () => [
  Objective,
  Task
]
