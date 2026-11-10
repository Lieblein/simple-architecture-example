import createTemplate from './createTemplate.js';

const [,, type, componentName] = process.argv;

const validTypes = ['view', 'presenter'];
if (!type || !validTypes.includes(type)) {
    throw new Error(`Укажите сущность ${validTypes.join(' или ')}`);
}


if (!componentName) {
    throw new Error('Укажите название компонента');
}

createTemplate(type, componentName);
