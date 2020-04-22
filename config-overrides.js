const { override, fixBabelImports, addLessLoader } = require('customize-cra');
const path = require('path');
const fs = require('fs');

const modifyVars = JSON.parse(
  fs.readFileSync(resolve('./src/ant-theme/ant-override.json'))
);

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  fixBabelImports('formik-antd', {
    libraryName: 'formik-antd',
    style: true,
    libraryDirectory: 'es'
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars
  })
);
