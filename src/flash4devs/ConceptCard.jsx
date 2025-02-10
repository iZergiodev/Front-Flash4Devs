import Editor from "@monaco-editor/react";
import { useState } from "react";
import { useRef } from "react";

export const ConceptCard = () => {

    const [respIA, setResIA] = useState('')

    const getResponse = async() => {

        const resp = await fetch('https://back-flash4devs-production.up.railway.app/chat/', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
            user_message: editorRef.current.getValue().trim(),
            system_prompt: 'Estás corrigiendo un código de un alumno, responde en la primera palabra bien o mal, dependiendo si está tecnicamente correcto o no, y después un breve resumen explicando porque está mal'
        })});
        const { generated_text } = await resp.json();
        setResIA(generated_text)
    }

  const editorRef = useRef(null);

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }

  async function showValue() {
    

    await getResponse()


  }
  return (
    <>
      <div className="w-full h-[90vh] flex justify-center items-center flex-col gap-5">
        <Editor
          height={"50vh"}
          width={"30vw"}
          defaultLanguage="javascript"
          theme="vs-dark"
          onMount={handleEditorDidMount}
        />

        <button className="border p-2 rounded-lg" onClick={showValue}>Show value</button>
      </div>
      <div>{respIA}</div>
    </>
  );
};
