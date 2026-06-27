import { useState } from "react"
import axios from "axios"
import { Loader } from 'lucide-react';

function App() {
  const [textInput, setTextInput] = useState("")
  const [selectValue, setSelectValue] = useState("")
  const[result, setResult] = useState("")
  const[loading, setLoading] = useState(false)

  const handleTextTranslation = async () => {
    setLoading(true)
    try {
      const options = {
        method: 'POST',
        url: 'https://google-translator9.p.rapidapi.com/v2',
        headers: {
          'x-rapidapi-key': '1207e1d96dmshd9184cfdd64d528p11314fjsnc8985bcef5fd',
          'x-rapidapi-host': 'google-translator9.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          q: `${textInput}`,
          source: 'en',
          target: `${selectValue}`,
          format: 'text'
        }
      };
      const response = await axios.request(options);
      setLoading(false)
      console.log(response.data.data.translations?.[Number(0)].translatedText);
      setResult(response.data.data.translations?.[Number(0)].translatedText);
    }
    catch (error) {
      setLoading(false)
      console.log(error?.data)
    }
  }
  console.log(textInput)
  console.log(selectValue)
  return (
    <div className="h-screen w-screen  flex items-center justify-center"
     style={{
       backgroundImage:
        "url(https://res.cloudinary.com/dbmddgr9x/image/upload/v1782217348/c9ffc4e1-0674-4756-a9c6-3f1d3ef18b0a_aod1yi.png)",
        backgroundSize:"cover",
        backgroundPosition:"center"
     }}>
      <div className="bg-slate-300 flex items-center justify-center flex-col gap-y-10 h-[500px] w-[400px] rounded-2xl shadow-xl">
        <h1 className="text-4xl text-zinc-700 font-bold">Text Translator</h1>
        <div className="flex items-center justify-center flex-col gap-y-5">
          <textarea name="input-text" className="bg-white h-30 w-[300px] 
            border border-slate-700 outline-none rounded-lg text-lg px-5 py-2"
            onChange={(e) => setTextInput(e.target.value)} />
          <textarea name="output-text" className="bg-white h-30 w-[300px] 
            border border-slate-700 outline-none rounded-lg text-lg px-5 py-2" value={result} readOnly />
        </div>
        <div>
          <label htmlFor="options">Converted to: </label>
          <select name="value" className="bg-white px-2 py-1 rounded-lg 
            border border-zinc-700 outline-none cursor-pointer" onChange={(e) => setSelectValue(e.target.value)} >
            <option value="">Select Language</option>
            <option value="te">Telugu</option>
            <option value="ta">Tamil</option>
            <option value="hi">Hindi</option>
            <option value="kn">Kannada</option>
            <option value="ml">Malayalam</option>
            <option value="sa">Sanskrit</option>
            <option value="gu">Gujarati</option>
            <option value="mr">Marathi</option>
            <option value="bn">Bengali</option>
            <option value="de">German</option>
            <option value="fr">French</option>

          </select>
        </div>
        <button className="bg-slate-700 text-slate-100 mx-auto w-[300px] py-2 
        rounded-lg hover:bg-slate-600 cursor-pointer flex items-center justify-center gap-x-2" onClick={handleTextTranslation}>
          {
            loading ? (<Loader className="animate-spin"/>) : "Translate"
          }
        </button>
      </div>
    </div>
  )
}
export default App