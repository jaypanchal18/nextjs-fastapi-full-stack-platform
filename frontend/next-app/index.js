npx create-next-app@latest frontend/next-app --typescript

cd frontend/next-app

npm install

// Create a basic project structure
mkdir -p src/components src/pages src/styles

// Create a sample component
echo "import React from 'react';

const SampleComponent: React.FC = () => {
    return <div>Hello, Next.js with TypeScript!</div>;
};

export default SampleComponent;" > src/components/SampleComponent.tsx

// Create a sample page
echo "import React from 'react';
import SampleComponent from '../components/SampleComponent';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Welcome to Next.js!</h1>
            <SampleComponent />
        </div>
    );
};

export default Home;" > src/pages/index.tsx

// Create a global CSS file
echo "body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}" > src/styles/globals.css

// Update _app.tsx to include global styles
echo "import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default MyApp;" > src/pages/_app.tsx

// Initialize Git
git init
git add .
git commit -m 'Initialize Next.js frontend with TypeScript support'