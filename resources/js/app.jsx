import './bootstrap';
import '../css/app.css';

import React from 'react';
import { render } from 'react-dom';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';

import { BrowserRouter as Router } from 'react-router-dom';
const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    // resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    resolve: (name) => require(`./Pages/${name}.jsx`),
    
    setup({ el, App, props }) {
        return render(
      <Router>
        <App {...props} />
      </Router>  
        , el);
    },
});

InertiaProgress.init({ color: '#4B5563' });
