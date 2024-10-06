import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

export default function FormProblemTwoComponent() {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = input.trim();
    const game = {
      string_value: value,
    }
    try {
      const response = await axios.post(process.env.API_URL + '/api/problem-2', game);
      console.log('Response:', response.data);
      const res = response.data;
      if (res.data?.result)
        setOutput(`${res.data?.result}`);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Form 2</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          id="input-2"
          value={input}
          onChange={handleChange}
          rows={10}
          cols={30}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Input string"
        />
        <button
          type="submit"
          className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
        >
          Enviar
        </button>
      </form>
      <pre id="output-2" className="mt-4 text-gray-700 p-5 border border-gray-300">{output}</pre>
    </div>
  );
};
