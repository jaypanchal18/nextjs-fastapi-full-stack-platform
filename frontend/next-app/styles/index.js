@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

:root {
  --primary-color: #0070f3;
  --secondary-color: #1a1a1a;
  --background-color: #ffffff;
  --text-color: #333333;
  --mobile-breakpoint: 768px;
}

body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  background-color: var(--background-color);
  color: var(--text-color);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.nav {
  display: flex;
  gap: 20px;
}

.nav a {
  text-decoration: none;
  color: var(--primary-color);
  transition: color 0.3s;
}

.nav a:hover {
  color: var(--secondary-color);
}

.main {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  background: #f9f9f9;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.footer {
  text-align: center;
  padding: 20px 0;
  border-top: 1px solid #eaeaea;
}

@media (min-width: var(--mobile-breakpoint)) {
  .main {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 30px;
  }

  .card {
    flex: 1 1 calc(33.333% - 20px);
  }
}

@media (max-width: var(--mobile-breakpoint)) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav {
    flex-direction: column;
    gap: 10px;
  }

  .card {
    flex: 1 1 100%;
  }
}