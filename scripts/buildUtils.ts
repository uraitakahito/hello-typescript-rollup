// https://www.codefeetime.com/post/rollup-config-for-react-component-library-with-typescript-scss/#2-rollup-code-splitting
import fs from 'fs';

const getFiles = (entry: string, extensions: string[] = [], excludeExtensions = []) => {
  let fileNames: string[] = [];
  const dirs = fs.readdirSync(entry);

  dirs.forEach((dir) => {
    const path = `${entry}/${dir}`;

    if (fs.lstatSync(path).isDirectory()) {
      fileNames = [
        ...fileNames,
        ...getFiles(path, extensions, excludeExtensions),
      ];

      return;
    }

    if (!excludeExtensions.some((exclude) => dir.endsWith(exclude))
      && extensions.some((ext) => dir.endsWith(ext))
    ) {
      fileNames.push(path);
    }
  });

  return fileNames;
};

export default getFiles;
