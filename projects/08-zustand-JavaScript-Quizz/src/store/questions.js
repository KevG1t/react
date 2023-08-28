import { create } from 'zustand'
import { getQuestions } from '../services/questions'
import confetti from 'canvas-confetti'
import { persist } from 'zustand/middleware'

export const useQuestionsStore = create(persist((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,
    fetchQuestions: async () => {
      const { questions: data } = await getQuestions()
      const randomQuestions = data.sort(() => Math.random() - 0.5)
      set({ questions: randomQuestions })
    },
    goNexQuestion: () => {
      const { questions, currentQuestion } = get()
      const nextQuestion = currentQuestion + 1
      if (nextQuestion < questions.length) { set({ currentQuestion: nextQuestion }) }
    },
    goPrevQuestion: () => {
      const { currentQuestion } = get()
      const prevQuestion = currentQuestion - 1
      if (prevQuestion >= 0) { set({ currentQuestion: prevQuestion }) }
    },
    selectOption: (questionId, optionIndex) => {
      const { questions } = get()
      // clonamos el objeto para mutar la copia
      const newQuestions = structuredClone(questions)
      // questionIndex
      const questionIndex = newQuestions.findIndex(q => q.id === questionId)
      // informacion
      const questionInfo = newQuestions[questionIndex]
      // es la opcion correcta?
      const isCorrectUserOption = questionInfo.correctOption === optionIndex
      if (isCorrectUserOption) confetti()
      // mutamos la copia
      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserOption,
        userSelectedOption: optionIndex
      }
      // actualizar el estado
      set({ questions: newQuestions })
    },
    reset: () => {
      set({ currentQuestion: 0, questions: [] })
    }
  }
}, {
  name: 'questions'
}))
