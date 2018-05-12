# Folder Structure

Follow the folder structure made by Create React App as much as possible. That
means keeping all your configuration files in the root folder and all the code
in `src`.

Inside `src/` you're going to have a structure similar to the following:

```
src
├── api
├── app
│   ├── App.js
│   ├── screens
│   │   ├── Login
│   │   └── Settings
│   │       └── screens
│   │           ├── Addresses
│   │           │   └── components
│   │           └── Users
│   │               └── components
│   └── shared
│       └── Header
├── styles
├── types
├── utils
├── index.js
└── setupTests.js
```

<dl>
  <dt>`api/`</dt>
  <dd>
  Contains all the modules that make API requests
  </dd>
  <dt>`app/`</dt>
  <dd>
  Contains the whole app
  </dd>
  <dt>`styles/`</dt>
  <dd>
  Contains JavaScript modules with styling information. This folder may not be needed for some projects.
  </dd>
  <dt>`types/`</dt>
  <dd>
  Contains the Flow definitions for types that are not specified by `flow-typed`.
  </dd>
  <dt>`utils/`</dt>
  <dd>
  Any utility module goes here.
  </dd>
  <dt>`index.js`</dt>
  <dd>
  The main JavaScript files that bootstraps the whole application
  </dd>
  <dt>`setupTests.js`</dt>
  <dd>
  A file that gets executed before the tests are launched.
  </dd>
</dl>

All the static files that are not imported via JavaScript—e.g. `index.html`,
favicons—are placed in the `public/` folder.
