import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

export default function FormProblemOneComponent() {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const first_multiple_input = input.trim().split('\n').map(line => line.split(' '))[0];
    const n = Number(first_multiple_input[0]);
    const k = Number(first_multiple_input[1]);
    const second_multiple_input = input.trim().split('\n').map(line => line.split(' '))[1];
    const r_q = Number(second_multiple_input[0]);
    const c_q = Number(second_multiple_input[1]);
    const pairs = input.trim().split('\n').map(line => line.split(' ')).map((e) => e.map(val => JSON.parse(val)));
    const game = {
      board_size: n,
      total_obstacles: k,
      queen_rows: r_q,
      queen_columns: c_q,
      obstacles: pairs,
    }
    setOutput("");
    try {
      const response = await axios.post(process.env.API_URL + '/api/problem-1', game);
      console.log('Response:', response.data);
      const res = response.data;
      if (res.data?.attacks)
        setOutput(`${res.data?.attacks}`);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Formulario 1</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          id="input-1"
          value={input}
          onChange={handleChange}
          rows={10}
          cols={30}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ingresa pares (separados por salto de línea)"
        />
        <button
          type="submit"
          className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
        >
          Enviar
        </button>
      </form>
      <pre id="output-1" className="mt-4 text-gray-700 p-5 border border-gray-300">{output}</pre>
    </div>
  );
};