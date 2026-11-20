import createTemplate from './createTemplate.js';

let [,, type, componentName, directory = 'components'] = process.argv;

const validTypes = ['view', 'presenter'];
if (!type || !validTypes.includes(type)) {
    directory = componentName ?? 'components';
    componentName = type;
    type = 'presenter';
}


if (!componentName) {
    throw new Error('Укажите название компонента');
}

createTemplate(type, componentName, directory);
