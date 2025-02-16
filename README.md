# Storybook-core

This is a Storybook components library that is going to be consumed by other internal projects. It uses Tailwind CSS for styling.

## Installation

To install the dependencies, run:

```bash
npm install
```

## Running Storybook

To start the Storybook server, run:

```bash
npm run storybook
```

This will start the Storybook server and open it in your default browser.

## Building the Library

To build the component library, run:

```bash
npm run build
```

This will create a production build of the library in the `dist` folder.

## Creating Components

You can create new components using Plop. To generate a new component, run:

```bash
npm run generate
```

Follow the prompts to specify the component name and type (Atoms, Molecules, Organisms). This will create the component files, including the component itself, a Storybook story, and a mock file.

## Using the Components

To use the components in your project, import them as needed. For example:

```tsx
import { Button } from 'storybook-core';

const App = () => (
  <Button variant="primary">Click Me</Button>
);
```

## Tailwind CSS Configuration

The Tailwind CSS configuration is located in the `tailwind.config.js` file. It extends the default Tailwind CSS configuration with custom colors, font sizes, border radii, and other styles.

## Contributing

If you would like to contribute to this project, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
