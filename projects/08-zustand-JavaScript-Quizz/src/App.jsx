import { JavaScriptLogo } from './JavaScriptLogo'
import { Game } from './components/Game'
import { useQuestionsStore } from './store/questions'

function App () {
  const { fetchQuestions, questions } = useQuestionsStore(state => state)

  const handleClick = () => {
    fetchQuestions()
  }

  return (
    <main style={{
      display: 'flex',
      gap: '20px',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <section style={{
        display: 'flex',
        gap: '20px',
        alignItems: 'center'
      }}>
      <JavaScriptLogo/>

      <h1 style={{
        fontSize: '3em',
        fontWeight: '300'
      }}> JavaScript Quizz</h1>
      </section>

      {questions.length === 0 && <button style={{
        width: '100px',
        height: '25px',
        background: '#1B74D2',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
        fontWeight: '500',
        letterSpacing: '1px'
      }}
      onClick={handleClick}>Empezar!</button>}

      {questions.length > 0 && <Game/>}

    </main>
  )
}

export default App
