// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import "./main.css";
import "./react/mana/ManaDebug.css"
import "./react/styles/sizings/paddings.css"
import "./react/styles/sizings/sizes.css"
import "./react/styles/sizings/spacing.css"
import "./react/styles/sizings/roundings.css"

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <App/>
  // </StrictMode>,
)
