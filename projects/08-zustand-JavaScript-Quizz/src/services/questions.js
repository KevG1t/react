export async function getQuestions () {
  const response = await fetch('http://localhost:5173/questions.json')
  const data = await response.json()
  return data
}
