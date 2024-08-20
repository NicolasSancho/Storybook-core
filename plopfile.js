module.exports = function (plop) {
    plop.setGenerator('component', {
        description: 'Generate a React component with Storybook and TypeScript',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Component name:',
            },
            {
                type: 'list',
                name: 'type',
                message: 'Component type:',
                choices: ['atoms', 'molecules', 'organisms'],
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'src/components/{{type}}/{{pascalCase name}}/{{pascalCase name}}.tsx',
                templateFile: 'plop-templates/component.tsx.hbs',
            },
            {
                type: 'add',
                path: 'src/components/{{type}}/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
                templateFile: 'plop-templates/component.stories.tsx.hbs',
            },
            {
                type: 'add',
                path: 'src/components/{{type}}/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
                templateFile: 'plop-templates/component.test.tsx.hbs',
            },
        ],
    });
};