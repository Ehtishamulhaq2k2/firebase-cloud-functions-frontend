import React, { useState } from 'react';
import { functions, httpsCallable } from './firebaseConfigs';

const ArithmeticOperator = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operation, setOperation] = useState('+');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculation = async () => {
    let functionName;
    switch (operation) {
      case '+':
        functionName = 'sumTwoNums';
        break;
      case '-':
        functionName = 'subtractTwoNums';
        break;
      case '*':
        functionName = 'multipyTwoNums';
        break;
      case '/':
        functionName = num2 !== 0 ? 'divideTwoNums' : null;
        break;
      default:
        setError('Invalid operation');
        return;
    }

    if (!functionName) {
      setError('Cannot divide by zero');
      return;
    }

    const arithmeticFunction = httpsCallable(functions, functionName);
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await arithmeticFunction({ a: num1, b: num2 });
      setResult(response?.data?.result);
    } catch (err) {
      setError(err.message);
      console.error('Error calling function:', err);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div style={styles.container}>
      <h1>Simple Arithmetic Operator</h1>
      <div style={styles.inputContainer}>
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(Number(e.target.value))}
          style={styles.input}
          placeholder="Enter first number"
          disabled={loading}
        />
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          style={styles.select}
          disabled={loading}
        >
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="/">/</option>
        </select>
        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(Number(e.target.value))}
          style={styles.input}
          placeholder="Enter second number"
          disabled={loading}
        />
      </div>
      <button onClick={handleCalculation} style={styles.button} disabled={loading}>
        {loading ? 'Calculating...' : 'Calculate'}
      </button>
      <div style={styles.result}>
        {loading ? 'Loading...' : result !== null ? `Result: ${result}` : error ? `Error: ${error}` : ''}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50px',
  },
  inputContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    width: '150px',
  },
  select: {
    padding: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  result: {
    marginTop: '20px',
    fontSize: '18px',
  },
};

export default ArithmeticOperator;
