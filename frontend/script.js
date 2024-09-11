document.getElementById('compileBtn').addEventListener('click', async () => {
    const code = document.getElementById('codeInput').value;
    const response = await fetch('http://localhost:3000/compile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });
    const result = await response.json();
    document.getElementById('output').innerText = JSON.stringify(result, null, 2);
  });
  
  document.getElementById('testBtn').addEventListener('click', async () => {
    const code = document.getElementById('codeInput').value;
    const response = await fetch('http://localhost:3000/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });
    const result = await response.json();
    document.getElementById('output').innerText = JSON.stringify(result, null, 2);
  });
  