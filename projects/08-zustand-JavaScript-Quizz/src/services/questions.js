const API_URL = import.meta.env.PROD ? 'https://kevg1t.github.io/JavaScriptQuizz/' : 'http://localhost:5173/JavaScriptQuizz/'

export async function getQuestions () {
  const response = await fetch(`${API_URL}/questions.json`)
  const data = await response.json()
  return data
}
