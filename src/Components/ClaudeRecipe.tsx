import ReactMarkdown from 'react-markdown'

interface ClaudeRecipeProps {
    recipe: string;
}

const ClaudeRecipe = ({recipe}: ClaudeRecipeProps) => {
    return(
        <section className='suggested-recipe-container' aria-live="polite">
            <h2>Chef Mistril Recommends:</h2>
            <ReactMarkdown>{recipe}</ReactMarkdown>
        </section>
    )
}

export default ClaudeRecipe