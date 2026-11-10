import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import camelCase from 'lodash/camelCase.js';
import kebabCase from 'lodash/kebabCase.js';

import generateView from './templates/view.js';
import generateTypes from './templates/types.js';
import generateViewWithPresenter from './templates/viewWithPresenter.js';
import generatePresenter from './templates/presenter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async(type, componentName) => {
    const name = camelCase(componentName);
    const fileName = name[0].toUpperCase() + name.slice(1);

    const dirPath = path.resolve(__dirname, '..', '..', 'src', 'components', fileName);

    await fs.mkdir(dirPath, { recursive: true });

    const stylePathName = `${kebabCase(fileName)}.module.css`;

    if (type === 'view') {
        await fs.writeFile(`${dirPath}/index.tsx`, generateView(fileName, stylePathName));
    } else {
        await fs.writeFile(`${dirPath}/types.tsx`, generateTypes());
        await fs.writeFile(`${dirPath}/usePresenter.tsx`, generatePresenter());
        await fs.writeFile(`${dirPath}/index.tsx`, generateViewWithPresenter(fileName, stylePathName));
    }

    await fs.writeFile(`${dirPath}/${stylePathName}`, '');
}
