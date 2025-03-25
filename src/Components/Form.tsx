import { useState } from "react"
import IngredientList from './IngredientList'
import ClaudeRecipe from "./ClaudeRecipe"

const Form = () => {
    // state for clearing the input
    const [input, setInput] = useState("")
    // state for saving all inputs
    const [ingredient, setIngredient] = useState<string[]>([])
    // state for showing the recipe
    const [recipeShown, setRecipeShown] = useState(false)
    // maps all ingredients to actuall html elements
    const ingredientsListItems = ingredient.map((el) => 
        <li key={el}>{el}</li>
    )

    /*
        Thie method is responsible for adding ingredients to our website, this includes toggling the h2 and clearing the input
    */
    const addIngredient = (formData: FormData): void => {
        // clear the input, for convenience sake
        setInput("")
        // action calls this function with a FormData Object as a parameter, pull needed information via .get() and add it to the ingredient state
        // this ensures we get a string
        const newIngredient: string = formData.get("ingredient")?.toString() || ""
        setIngredient(prevArr => newIngredient != "" ? [...prevArr, newIngredient]: prevArr)

        // alternatively: using Object.fromEntries(formData) you can convert the FormData into an Object of "name: value" contents
        // const data  = Object.fromEntries(formData)
        // const newIngredient: string = data.ingredient.toString()
        // setIngredient(prevArr => [...prevArr, newIngredient])
    }

    /*
        Tracks input value
    */
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value)
    }

    /*
        Shows Recipe when Button is pressed
    */
    const toggleRecipeShown = () => {
        setRecipeShown(prevState => !prevState)
    }
    
    return (
        <main>
            {/* using action here so that the formData is directly transferred, thus we dont have to prevent default behavior and extract
                the data from an HTMLFormElement
            */}
            <form className="claude-form" action={addIngredient}>
                <input 
                type="text" 
                aria-label="Add ingredient" 
                placeholder="e.g Oregano"
                className="form-input"
                name="ingredient"
                value={input}
                onChange={handleInputChange}/>
                <button className="form-button"> + Add ingredient</button>
            </form>
            {/*Entire list transferred to a new Component for better readability, triggered by ingredient State of the parent*/}
            {ingredient.length > 0 ? <IngredientList ingredients={ingredient} ingredientList={ingredientsListItems} toggleRecipeShown={toggleRecipeShown}/> : null}
            {/* Entire Recipe section in new Component, it is triggered by the IngredientLists Button and the recipeShow State of the parent */}
            {recipeShown ? <ClaudeRecipe/>: null}
        </main>
    )
}
export default Form