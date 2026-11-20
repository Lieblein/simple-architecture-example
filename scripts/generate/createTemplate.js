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

export default async(type, componentName, directory) => {
    const name = camelCase(componentName);
    const fileName = name[0].toUpperCase() + name.slice(1);

    const dirPath = path.resolve(__dirname, '..', '..', 'src', ...directory.split('/'), fileName);

    await fs.mkdir(dirPath, { recursive: true });

    const stylePathName = `${kebabCase(fileName)}.module.css`;

    if (type === 'view') {
        await fs.writeFile(`${dirPath}/index.tsx`, generateView(fileName, stylePathName));
    } else {
        await fs.writeFile(`${dirPath}/types.ts`, generateTypes());
        await fs.mkdir(`${dirPath}/logic`, { recursive: true });
        await fs.writeFile(`${dirPath}/logic/usePresenter.tsx`, generatePresenter());
        await fs.mkdir(`${dirPath}/logic/tasks`, { recursive: true });
        await fs.writeFile(`${dirPath}/index.tsx`, generateViewWithPresenter(fileName, stylePathName));
    }

    await fs.writeFile(`${dirPath}/${stylePathName}`, '');
}
